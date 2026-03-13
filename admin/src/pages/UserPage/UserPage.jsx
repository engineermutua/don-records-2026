import React, { useContext, useEffect, useState } from "react";
import "./UserPage.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { ManagementContext } from "../../Context/ManagementContext";

const UserPage = () => {
  const { id } = useParams();

  const { backend_url } = useContext(ManagementContext);

  const [user, setUser] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [beats, setBeats] = useState([]);
  {/*
  const fecthProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/admin/product/${id}`,
      );
      if (response.data.success) {
        setProduct(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  */}

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(`${backend_url}/api/user/user/${id}`);
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`${backend_url}/api/user/orders`, {
          userId: id,
        });
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/user/merchandise`);
        if (response.data.success) {
          setProducts(response.data.merchandise);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
    const fetchBeats = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/user/beats`);
        if (response.data.success) {
          setBeats(response.data.beats);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
    fetchBeats();
    fetchProducts();
    fetchUser();
    fetchOrders();
  }, [id, user, backend_url]);
  return (
    <>
      <div className="user-page">
        <div className="user-container">
          {/**----------------top---------------------*/}
          <div className="user-top">
            <div className="user-avatar">
              <img id="avatar" src={user.avatar} alt="" />
            </div>
            <div className="user-details">
              <div className="user-det-left">
                <p> <b>Username</b> </p>
                <p><b>Full Names</b></p>
                <p><b>Contact</b></p>
                <p><b>Email Address</b></p>
                <p><b>User Role</b></p>
                
              </div>
              <div className="user-det-right">
              <p>
                 {user.username}
              </p>
              <p>
                {user.first_name} {user.last_name}
              </p>
              <p>{user.phone}</p>
              <p>{user.email}</p>
              <p>
                {user.role}
              </p>
              </div>
            </div>
          </div>

          {/*----------------------User Bottom-------------------*/}
          <div className="user-bottom">
            <div className="header">
              <h1>Orders</h1>
            </div>
            <div id="orders-container" className="orders-container">
              {orders.map((order) => (
                <div key={order._id} className="order-container">
                  <div className="order-items">
                    {products.map((product) =>
                      order.items.map((o) => {
                        if (o.id === product._id) {
                          return (
                            <>
                            <div key={o.id} className="merch-class">
                              <h3>Merchandise</h3>
                              <div className="product-img">
                                <img
                                  id="product-img"
                                  src={product.image[0]}
                                  alt=""
                                />
                                <img
                                  id="product-img"
                                  src={product.image[1]}
                                  alt=""
                                />
                              </div>
                              <div className="product-details">
                                <hr />
                                <label htmlFor="title">
                                  {" "}
                                  <b>Title</b>{" "}
                                </label>
                                <p>{product.title}</p>
                                <hr />
                                <label htmlFor="title">
                                  {" "}
                                  <b>Price</b>{" "}
                                </label>
                                <p>{product.price}</p>
                                <hr />
                                <label htmlFor="title">
                                  {" "}
                                  <b>Description</b>{" "}
                                </label>
                                <p>{product.description}</p>
                                <hr />
                              </div>
                              </div>
                            </>
                          );
                        }
                      }),
                    )}
                    {beats.map((b) => 
                      order.items.map((o) => {
                        if (o.id === b._id) {
                          return (
                            <>
                            <div key={o.id} className="beat-class">
                              <h3>Beats</h3>
                              <div className="beat-image">
                                <img id="product-img" src={b.thumbnail} alt="" />
                              </div>
                              <div className="beat-title">
                                <hr/>
                                <label htmlFor="price"> <b>Price</b></label>
                                <p>{b.price}</p>
                                <hr/>
                              </div>

                              <div className="beat description">
                                <hr/>
                                <label htmlFor="description"><b>Description</b></label>
                                <p>{b.description}</p>
                                <hr/>
                              </div>
                            </div>
                            </>
                          );
                        }
                      })
                    )}
                  </div>

                  <div className="order-method">
                    <p>{order.paymentMethod}</p>
                  </div>
                  <div className="order-status">
                    <p>{order.paymentStatus ? "Paid" : "Not paid"}</p>
                  </div>
                  <div className="order-date">
                    <p>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
