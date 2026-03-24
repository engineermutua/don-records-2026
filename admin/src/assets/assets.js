import sideIcon from './menu.png'
import avatar from './man.png'
import logo from './logo.png'
import close from './cross.png'
import home from './home.png'
import merch from './merchandise.png'
import beatIcon from './drum.png'
import userIcon from './multiple-users-silhouette.png'
import orderIcon from './shopping-list.png'
import revenueIcon from './increase.png'
import logout from './power-button.png'
import approval from './loading.png'
import recent from './history.png'
import whatsappIcon from "./whatsapp.png";
import facebookIcon from "./facebook.png";
import instagramIcon from "./instagram.png";
import emailIcon from "./gmail.png";
import blog from './blog.png'
import product1 from './apparel61.jpeg'
import product2 from './thumbnail7.jpeg'
import deleteI from './delete.png'
import edit from './pen.png'
import addProduct from './add-product.png'
import approve from './check-mark.png'
import approved from './check-mark1.png'
import search from './magnifying-glass.png'
import fileI from './music-file.png'
import featured from './premium-account.png'
import feature from './premium-account1.png'

export const assets={
    sideIcon,
    avatar,
    logo, 
    close,
    home, 
    merch,
    beatIcon,
    userIcon,
    orderIcon,
    revenueIcon,
    logout,
    approval,
    recent,
    whatsappIcon,
    facebookIcon,
    instagramIcon,
    emailIcon,
    blog,
    deleteI,
    edit,
    addProduct,
    approve,
    approved,
    search,
    fileI,
    feature,
    featured
}

export const products=[
    {
        id:"p001",
        image:[product1],
        title:"Test product 1",
        description:"This is a test product",
        price:2500,
        quantity:100
    },
    {
        id:"p002",
        image:[product2],
        title:"Test product 2",
        description:"This is a test product",
        price:4000,
        quantity:80
    },
    {
        id:"p003",
        image:[product1],
        title:"Test product 3",
        description:"This is a test product",
        price:2500,
        quantity:500
    },
]

const date=new Date()

export const users=[
    {
        _id:"u001",
        name:"John Doe",
        email:"john@gmail.com",
        phone:"0786543217",
        role:"user",
        status:"active",
        date:date
    },
    {
        _id:"u002",
        name:"Jane Doe",
        email:"jane@gmail.com",
        phone:"01123456589",
        role:"artist",
        status:"active",
        date:date
    },
    {
        _id:"u003",
        name:"Joe Son",
        email:"joe@gmail.com",
        phone:"0123456789",
        role:"producer",
        status:"active",
        date:date
    }
]


export const orders=[
    {
        _id:"u001",
        name:"John Doe",
        reference:"UTY65tww9",
        address:"Embakasi,Nairobi",
        phone:"0786543217",
        payment:"paid",
        status:"Order placed",
        date:date
    },
    {
        _id:"u002",
        name:"John Doe",
        reference:"UTY65Rww9",
        address:"Embakasi,Nairobi",
        phone:"0786543217",
        payment:"pending",
        status:"Packaged for delivery",
        date:date
    },
    {
        _id:"u003",
        name:"John Doe",
        reference:"UTZ65Rww9",
        address:"Embakasi,Nairobi",
        phone:"0786543217",
        payment:"pending",
        status:"delivered",
        date:date
    },
    
]

export const sales=[
    {
        month:"January",
        sale:2500
    },
    {
        month:"February",
        sale:500
    },
    {
        month:"March",
        sale:3000
    },
    {
        month:"April",
        sale:1000
    },
    {
        month:"May",
        sale:1500
    },
    {
        month:"June",
        sale:2840
    }
]