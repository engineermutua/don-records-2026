import axios from 'axios'
import dayjs from 'dayjs';
import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';

const handleSTKPush = async (req, res) => {
  const { phone, amount,userId,items,address } = req.body;
  
  const user=await userModel.findById(userId)
  if(!user){
    console.log("Not Found");
    
  }
  console.log(user);
  
  
  //get timestamp
  const year = dayjs().format("YYYY");
  const month = dayjs().format("MM");
  const date = dayjs().format("DD");
  const hour = dayjs().format("HH");
  const minute = dayjs().format("mm");
  const seconds = dayjs().format("ss");

  const timestamp = year + month + date + hour + minute + seconds;

  const shortCode = process.env.BUSINESS_SHORTCODE.toString();
  const passKey = process.env.PASSKEY;

  //Get the base64 of the combination
  const dataToEncode = shortCode + passKey + timestamp;
  const password = Buffer.from(dataToEncode).toString("base64");

  //Render callback URL
  const callbackURL ="https://don-records-2026.onrender.com/api/user/callback-mpesa";
    

  const payload = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: shortCode,
    PhoneNumber: phone,
    CallBackURL: callbackURL,
    AccountReference: "The Don",
    TransactionDesc: "Payment",
  };
  
  try {
    const response=await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',payload,{headers:{Authorization:`Bearer ${req.token}`}})

    const new_order=await new orderModel({
      userId,
      user,
      items,
      amount,
      address,
      reference:response.data.CheckoutRequestID,
      paymentStatus:false,
      paymentMethod:"Mpesa"
    });

    

    const order=await new_order.save();
    console.log(order);
    
    
    res.status(201).json({
        success:true,
        data:response.data,
        message:order
    })
    
    
  } catch (error) {
    res.json({
        success:false,
        message:error.message
    })
  }
};


const callbackMpesa=async(req, res) => {
  const callbackData = req.body;

  const order=await orderModel.findOne({reference:callbackData.Body.stkCallback.CheckoutRequestID})
    if(!order){
      console.log("Order Not Found");
    }
  const orderId=order._id;

  
  console.log("Callback data",callbackData);
  
  if(callbackData.Body.stkCallback.ResultCode === 0){
    console.log("Success");
    console.log(callbackData.Body.stkCallback.CallbackMetadata.Item);  
    
    console.log("===========================================");

    console.log("Order");
    
    const order=await orderModel.findOne({reference:callbackData.Body.stkCallback.CheckoutRequestID})
    if(!order){
      console.log("Order Not Found");
      
    }
    console.log(order);
    const orderId=order._id;
    console.log(orderId);
    
    const metadata=callbackData.Body.stkCallback.CallbackMetadata.Item;

    const getMetaItem=(name)=>{
      const item=metadata.find(i=>i.Name===name);
      return item ? item.Value : null;
    }

    const  amount=getMetaItem('Amount');
    const mpesaReceipt = getMetaItem('MpesaReceiptNumber');
    const phoneNumber = getMetaItem('PhoneNumber');
    const transactionDate = getMetaItem('TransactionDate');

    const new_order=await orderModel.findByIdAndUpdate(orderId,{
      userId:order.userId,
      user:order.user,
      items:order.items,
      reference:mpesaReceipt,
      amount:order.amount,
      address:order.address,
      paymentStatus:true,
      paymentMethod:"Mpesa",
      status:"Order Received"
    },{new:true});

    await userModel.findByIdAndUpdate(userId,{cart:{}});

    console.log("=========New Order==========");
    console.log(new_order);
    
    console.log({ amount, mpesaReceipt, phoneNumber });

  }else{
    const delete_order=await orderModel.findByIdAndDelete(orderId);
    console.log("==============Failed Transaction=============");
    console.log(delete_order);
  }

  res.json({ 
    success:true,
  });
}

export {handleSTKPush,callbackMpesa};