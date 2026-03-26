import paypal from "paypal-rest-sdk";


  paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET_KEY,
  });

const paypalPayment=async(req,res)=>{
    try {
        const {items,total}=req.body;
        console.log(items);
        console.log(total);
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
                return res.json({payment}) 
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

const handlePayment=(req,res)=>{
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
        
        res.send('Payment Success'); 
      }
    });
}

const cancelPayment=(req,res)=>{
    res.send('Failed');
}


export { paypalPayment,handlePayment,cancelPayment };