import axios from 'axios'
import dayjs from 'dayjs';

const handleSTKPush = async (req, res) => {
  const { phone, amount } = req.body;
  
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
  const callbackURL = "https://don-records-2026.onrender.com/api/user/callback-mpesa";
    

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

    res.status(201).json({
        success:true,
        data:response.data,
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
  console.log("Callback data",callbackData);
  
  if(callbackData.Body.stkCallback.ResultCode === 0){
    console.log("Success");
    console.log(callbackData.Body.stkCallback.CallbackMetadata.Item);  
    
    console.log("===========================================");
    

    const metadata=callbackData.Body.stkCallback.CallbackMetadata.Item;

    const getMetaItem=(name)=>{
      const item=metadata.find(i=>i.Name===name);
      return item ? item.Value : null;
    }

    const  amount=getMetaItem('Amount');
    const mpesaReceipt = getMetaItem('MpesaReceiptNumber');
    const phoneNumber = getMetaItem('PhoneNumber');
    const transactionDate = getMetaItem('TransactionDate');

    console.log({ amount, mpesaReceipt, phoneNumber });

  }else{
    console.log("Failed");
    console.log(callbackData.Body.stkCallback.ResultCode);
    console.log(callbackData.Body.stkCallback.ResultDesc);
    console.log(callbackData.Body.stkCallback.CheckoutRequestID);
  }
  return res.json({ 
    success:true,
  });
}

export {handleSTKPush,callbackMpesa};