import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";

const ProfilePage = () => {
  const { backend_url } = useContext(ShopContext);

  const [user, setUser] = useState({});

  const [uId, setUid] = useState("");

  const [avatar, setAvatar] = useState(false);
  const [fname, setFname] = useState(user.first_name);
  const [lname, setLname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [username, setUSername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [bio, setBio] = useState(user.bio);
  const [latestProject, setLatestProject] = useState(user.latest_project);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      avatar
        ? formData.append("avatar", avatar)
        : formData.append("avatar", "");
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("username", username);
      formData.append("bio", bio);

      const response = await axios.post(
        `${backend_url}/api/user/update/${uId}`,
        formData,
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tk = await localStorage.getItem("token");
        if (!tk) {
          navigate("/login");
          toast.error("Login to access profile");
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
    fetchToken();
    const fetchUser = async () => {
      try {
        const userId = await localStorage.getItem("user");
        if (userId) {
          setUid(userId);
        } else {
          toast.error("Could not fetch your details.");
        }
        const response = await axios.post(
          `${backend_url}/api/user/user/${userId}`,
        );
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          toast.error("Login to access Profile");
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
    fetchUser();
  }, [user, backend_url]);
  return (
    <>
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-left-avatar">
            <label htmlFor="avatar">
              {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="avatar" />
              ) : (
                <img
                  id="image"
                  name="image"
                  src={user.avatar ? user.avatar : assets.avatar1}
                  alt="avatar"
                />
              )}
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                hidden
                required
              />
            </label>
          </div>
        </div>
        <div className="profile-right">
          <div className="profile-right-form">
            <form onSubmit={handleSubmit}>
              <div className="input-class">
                <input
                  type="text"
                  name=""
                  id=""
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder={user.first_name}
                  required
                />
                <input
                  type="text"
                  name=""
                  id=""
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  placeholder={user.last_name}
                  required
                />
              </div>
              <div className="input-class">
                <input
                  type="email"
                  name=""
                  id=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={user.email}
                  required
                />
              </div>
              <div className="input-class">
                <input
                  type="text"
                  name=""
                  id=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={user.phone}
                  required
                />
                <input
                  type="text"
                  name=""
                  id=""
                  value={username}
                  onChange={(e) => setUSername(e.target.value)}
                  placeholder={user.username}
                  required
                />
              </div>
              <div className="input-class">
                <input
                  type="text"
                  name=""
                  id=""
                  value={latestProject}
                  onChange={(e) => setLatestProject(e.target.value)}
                  placeholder={
                    user.latest_project !== ""
                      ? user.latest_project
                      : "Latest project"
                  }
                  required
                />
              </div>
              <div className="input-class">
                <textarea
                  rows={5}
                  name=""
                  id=""
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={user.bio}
                  required
                ></textarea>
              </div>
              <div className="input-btn">
                <button type="submit">Change</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
