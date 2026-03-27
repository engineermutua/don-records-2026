import paypal from "paypal-rest-sdk";
import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';


  paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET_KEY,
  });

const paypalPayment=async(req,res)=>{
    try {
        const {items,total,userId,address,reference}=req.body;
        console.log(items);
        console.log(total);
        console.log(address);

        const user=await userModel.findById(userId);
        if(!user){
            console.log("Could not find user");            
        }
        console.log("==============User===============");
        
        console.log(user);
        
        const new_order=await new orderModel({
            userId,
            user,
            items,
            amount:(total*129),
            address,
            reference,
            paymentStatus:false,
            paymentMethod:"Paypal"            
        });

        const order=await new_order.save();

        console.log("=============Order Queued For Processing==============");
        console.log(order);

        await userModel.findByIdAndUpdate(userId,{cart:{}});
        
        
        
        const amount={
            "currency":"USD",
            "total":total
        }
        console.log(amount);
        
        // Creating a payment data object
        const paymentData={
            "intent":"sale",
            "payer":{
                "payment_method":"paypal"
            },
            "redirect_urls":{
                "return_url":"http://localhost:3000/api/user/paypalSuccess",
                "cancel_url":"http://localhost:3000/api/user/paypalCancel"
            },
            "transactions":[{
                "item_list":{
                    "items":items
                },
                "amount":amount,
                "description":"payment using paypal"
            }]
        }
        console.log(paymentData);
        
        
        // creating payment 
        paypal.payment.create(paymentData, function (err, payment) {
            if (err) {
              throw err;
            } else {
                return res.json({
                    success:true,
                    payment,
                    message:order
                }) 
            }
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
    }
}

const handlePayment=async(req,res)=>{
    const payerId=req.query.PayerID;
    const paymentId = req.query.paymentId;
    
    const executePayment = {
      payer_id: payerId,
    };
    paypal.payment.execute(paymentId, executePayment, (error, payment) => {
      if (error) {
        console.error('Error executing PayPal payment:', error);
        res.send('Failed');
      } else {
        res.redirect(`${process.env.FRONTEND_URL}/order`) 
      }
    });
}

const cancelPayment=(req,res)=>{
    res.redirect(`${process.env.FRONTEND_URL}/cart`) 
}


export { paypalPayment,handlePayment,cancelPayment };