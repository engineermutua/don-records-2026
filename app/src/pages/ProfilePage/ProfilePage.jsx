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
  const [latestProject, setLatestProject] = useState("");
  const [instagram, setInstagram] = useState("");
  const [spotify, setSpotify] = useState("");
  const [itunes, setItunes] = useState("");
  const [youtube, setYoutube] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      avatar
        ? formData.append("avatar", avatar)
        : formData.append("avatar", "");
      formData.append("latest_project", latestProject);
      formData.append("instagram", instagram);
      formData.append("spotify", spotify);
      formData.append("itunes", itunes);
      formData.append("youtube", youtube);
      formData.append("whatsapp", whatsapp);
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
      }
    };
    fetchUser();
  }, [user, backend_url,uId]);
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
                <label htmlFor="lp">Latest project(Embedded Link)</label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={latestProject}
                  onChange={(e) => setLatestProject(e.target.value)}
                  placeholder={user.latest_project}
                  required
                />
                <label htmlFor="ig">Instagram</label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder={user.instagram}
                  required
                />
              </div>
              <div className="input-class">
                <label htmlFor="spotify">Spotify</label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={spotify}
                  onChange={(e) => setSpotify(e.target.value)}
                  placeholder={user.spotify}
                  required
                />
              </div>
              <div className="input-class">
                <label htmlFor="itunes">Itunes</label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={itunes}
                  onChange={(e) => setItunes(e.target.value)}
                  placeholder={user.itunes}
                  required
                />
                <label htmlFor="youtube">YouTube</label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  placeholder={user.youtube}
                  required
                />
              </div>
              <div className="input-class">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder={user.whatsapp}
                  required
                />
              </div>
              <div className="input-class">
                <label htmlFor="bio">BIO</label>
                <textarea name="" rows={5} id="" value={bio} onChange={(e)=>setBio(e.target.value)} placeholder={user.bio}></textarea>
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
