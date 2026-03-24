import axios from 'axios'


const generateToken = async (req, res, next) => {
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const authLink =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64",
  );
  try {
    const response = await axios(authLink, {
      headers: { Authorization: `Basic ${auth}` },
    });
    req.token = response.data.access_token;
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default generateToken;