import React, {  useContext, useEffect, useState } from "react";
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
              <p>
                <b>Username:</b> {user.username}
              </p>
              <p>
                {user.first_name} {user.last_name}
              </p>
              <p>{user.phone}</p>
              <p>{user.email}</p>
              <p>
                <b>Role:</b> {user.role}
              </p>
            </div>
          </div>

          {/*----------------------User Bottom-------------------*/}
          <div className="user-bottom">
            <hr></hr>
            <div className="header">
              <h1>Orders</h1>
            </div>
            <hr />
            <div className="orders-container">
              {orders.map((order) => (
                <div key={order._id} className="order-container">
                  <div className="order-items">
                    {products.map((product) =>
                      order.items.map((o) => {
                        if (o.id === product._id) {
                          return (
                            <>
                              <p>{product.title}</p>
                              <p>{product.price}</p>
                            </>
                          );
                        }      
                    }),
                    ) &&
                      beats.map((beat) =>
                        order.items.map((o) => {
                          if (o.id === beat._id) {
                            return (
                              <>
                                <p>{beat.title}</p>
                                <p>{beat.price}</p>
                              </>
                            );
                          }
                        }),
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
