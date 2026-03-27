import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import merchandiseModel from "../models/merchandiseModel.js";
import beatModel from "../models/beatModel.js";
import blogModel from "../models/blogModel.js";
import subscriberModel from "../models/subscriberModel.js";
import orderModel from "../models/orderModel.js";
import nodemailer from 'nodemailer'
import axios from "axios";
import dayjs from "dayjs";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "90d" });
};

const registerUser = async (req, res) => {
  try {
    const { fname, lname, username, email, phone, role, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      res.json({
        success: false,
        message: "User Already Exists",
      });
    }

    if (!req.files) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const image = req.files.avatar && req.files.avatar[0];

    const result = await cloudinary.uploader.upload(image.path, {
      folder: "uploads/the_don/avatars",
      resource_type: "image",
    });

    const imageUrl = result.secure_url;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new userModel({
      avatar: imageUrl,
      first_name: fname,
      last_name: lname,
      username,
      email,
      phone,
      role,
      password: hash,
    });
    await user.save();

    const token = await createToken(user._id);

    res.json({
      success: true,
      message: "User created Successfully",
      user,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (!exists) {
      res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, exists.password);

    if (!isMatch) {
      res.json({
        success: false,
        message: "Check your password and try again.",
      });
    }
    exists.isActive = true;
    await exists.save();
    //Or await userModel.findByIdAndUpdate(exists._id,{isActive:true})
    const token = await createToken(exists._id);
    const user = await userModel.findById(exists._id, {});
    res.json({
      success: true,
      message: "Login Successfull",
      token,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { latest_project, instagram, spotify, itunes, youtube, bio, whatsapp } = req.body;

    const { userId } = req.params;

    const user = await userModel.findById({ _id:userId });

    if (!req.files) {
      res.json({
        success: false,
        message: "No files uploaded"
      })
    }

    const avatar = req.files.avatar && req.files.avatar[0];

    let result = await cloudinary.uploader.upload(avatar.path, { folder: "uploads/the_don/avatars/updated_avatars", resource_type: "image" });

    const image_url = await result.secure_url;


    const updated_user = await userModel.findByIdAndUpdate(userId, {
      avatar: image_url?image_url:user.avatar,
      latest_project:latest_project,
      instagram:instagram,
      spotify:spotify,
      itunes:itunes,
      youtube:youtube,
      whatsapp:whatsapp,
      bio: bio,
    })

    if (!updated_user) {
      res.json({
        success: false,
        message: "Could not update user",
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchMerchandise = async (req, res) => {
  try {
    const merchandise = await merchandiseModel.find({});
    res.json({
      success: true,
      message: "Merchandise Fetched Successfully.",
      merchandise,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const merchandise = async (req, res) => {
  try {
    const { merchandiseId } = req.params;

    const merchandise = await merchandiseModel.findById({ _id: merchandiseId });

    if (!merchandise) {
      res.json({
        success: false,
        message: "Could not fetch merchandise"
      })
    }

    res.json({
      success: true,
      message: "Merchandise fetched successfully",
      merchandise
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchBeats = async (req, res) => {
  try {
    const beats = await beatModel.find({});
    res.json({
      success: true,
      message: "Beats Fetched Successfully.",
      beats,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


const beat = async (req, res) => {
  try {
    const { beatId } = req.params;

    const beat = await beatModel.findById({ _id: beatId });

    if (!beat) {
      res.json({
        success: false,
        message: "Could not fetch beat"
      })
    }

    res.json({
      success: true,
      message: "Beat fetched Successfully",
      beat
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    res.json({
      success: true,
      message: "Blogs Fetched Successfully.",
      blogs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


const blog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await blogModel.findById({ _id: blogId });

    if (!blog) {
      res.json({
        success: false,
        message: "Could not fetch blog"
      })
    }

    res.json({
      success: true,
      message: "Blog fetched successfully",
      blog
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchArtists = async (req, res) => {
  try {
    const artists = await userModel.find({ role: "artist" });

    res.json({
      success: true,
      message: "Artists fetched successfully",
      artists,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const artist = async (req, res) => {
  try {
    const { artistId } = req.params;

    const artist = await userModel.findOne({ username: artistId });

    if (!artist) {
      res.json({
        success: false,
        message: "Could not fetch Artist"
      })
    }

    res.json({
      success: true,
      message: "Artist fetched successfully",
      artist
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchProducers = async (req, res) => {
  try {
    const producers = await userModel.find({ role: "producer" });

    res.json({
      success: true,
      message: "Producers fetched successfully",
      producers,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const producer = async (req, res) => {
  try {
    const { producerId } = req.params;

    const producer = await userModel.findOne({ username: producerId });

    if (!producer) {
      res.json({
        success: false,
        message: "Could not fetch producer"
      })
    }

    res.json({
      success: true,
      message: "Producer fetched successfully",
      producer
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


const user = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById({ _id: userId });

    if (!user) {
      res.json({
        success: false,
        message: "Could not fetch user"
      })
    }

    res.json({
      success: true,
      message: "User fetched successfully",
      user
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await subscriberModel.findOne({ email });
    if (exists) {
      res.json({
        success: false,
        message: "You are already a subscriber.",
      });
    }
    const new_subscriber = await subscriberModel({
      email,
    });
    const subscriber = await new_subscriber.save();

    res.json({
      success: true,
      message: "Thank you for subscribing.",
      subscriber,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const searchBeat = async (req, res) => {
  try {
    //http://localhost:3000/api/user/search?query=er
    const { query } = req.query;
    const searchTerm = new RegExp(query, 'i');
    const beat = await beatModel.find({ tags: searchTerm });

    if (!beat || beat.length <= 0) {
      res.json({
        success: false,
        message: "Could not find beat",
      })
    }

    res.json({
      success: true,
      message: "Beat Found",
      beat
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId,productId } = req.body;


    const user = await userModel.findById({ _id: userId });

    if (!user) {
      res.json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = await user.cart;

    const product =
      (await merchandiseModel.findById({ _id: productId })) ||
      (await beatModel.findById({ _id: productId }));
    console.log(product);

    if (!product) {
      res.json({
        success: false,
        message: "product not found.",
      });
    }

    if (cartData[productId]) {
      cartData[productId] += 1;
    } else {
      cartData[productId] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cart: cartData });

    res.json({
      success: true,
      message: "Product added to cart.",
      cartData,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const user = await userModel.findById({ _id: userId });
    if (!user) {
      res.json({
        success: false,
        message: "Login and try again",
      });
    }
    let cartData = await user.cart;

    cartData[productId] = quantity;

    await userModel.findByIdAndUpdate(userId, { cart: cartData });
    res.json({
      success: true,
      message: "Cart Updated",
      cartData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById({ _id:userId });
    if (!user) {
      res.json({
        success: false,
        message: "You have been logged out.",
      });
    }
    const cartData = await user.cart;

    res.json({
      success: true,
      message: "Cart fetched successfully",
      cartData,
    });

    re;
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById({ _id: userId });
    if (!user) {
      res.json({ success: false, message: "Login Again" });
    }

    let cartData = user.cart;

    cartData = {};

    await userModel.findByIdAndUpdate(userId, { cart: cartData });

    res.json({ success: true, message: "Cart Cleared", cartData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, reference,paymentStatus,paymentMethod } = req.body;

    const user=await userModel.findById({_id:userId});

    const new_order = await new orderModel({
      userId,
      user,
      items,
      amount,
      address,
      reference,
      paymentStatus:false,
      paymentMethod:"cash on Delivery"
    });

    const order = await new_order.save();

    
    await userModel.findByIdAndUpdate(userId,{cart:{}});

    res.json({
      success: true,
      message: "Order placed",
      order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const myOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });

    if (!orders) {
      res.json({ success: false, message: "Could not fetch orders." });
    }

    res.json({
      success: true,
      message: "Orders Fetched Successfully.",
      orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const contact = async (req, res) => {
  try {
    const { email, name, message } = req.body;


    //Create a transporter object using Gmail's SMTP
    const transporter = nodemailer.createTransport({
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
      },
    });

    //Set up email options (who sends what to whom)
    let mailOptions = {
      from: email,
      to: process.env.GMAIL_EMAIL,
      subject: `Email Received from ${name}`,
      html:
        `<b>${message}</b>
        <div style="width:100%;background-color:grey;padding:10px">
          <h3>This is a test email for your website.</h3>
          <p>From ${email} </p>
        </div>
      `
    };

    //Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.json({
          success: false,
          message: error.message
        })
      } else {
        console.log('Email sent:', info.response);
        res.json({
          success: true,
          message: "Email sent",
          info
        });
      }
    });





  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const deleteOrder=async(req,res)=>{
  try {
    const {orderId}=req.params;
    const order=await orderModel.findByIdAndDelete(orderId);
    if(!order){
      res.json({
        success:false,
        message:"Could not delete Order."
      })
    }
    res.json({
      success:true,
      message:"Order deleted Successfully.",
      order
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchProducts=async(req,res)=>{
  try {
    const [merchandise,beats]=await Promise.all([
      merchandiseModel.find({}),
      beatModel.find({})
    ]);

    const products={
      merchandise,
      beats
    }
    res.json({
      success:true,
      message:"Products Fetched Successfully",
      products
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}



export {
  registerUser,
  loginUser,
  fetchMerchandise,
  fetchBeats,
  fetchBlogs,
  fetchArtists,
  fetchProducers,
  fetchUsers,
  subscribe,
  addToCart,
  updateCart,
  getCart,
  clearCart,
  placeOrder,
  myOrders,
  searchBeat,
  updateProfile,
  merchandise,
  beat,
  blog,
  artist,
  producer,
  user,
  contact,
  deleteOrder,
  fetchProducts
};
