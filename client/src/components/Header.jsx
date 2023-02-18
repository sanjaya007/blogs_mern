import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfileApi, logOutApi } from "../apis/UserApi";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const { profile, setProfile } = useContext(UserContext);

  useEffect(() => {
    const getProfileData = async () => {
      const response = await getUserProfileApi();
      const data = response.data;
      setProfile(data);
    };
    getProfileData();
  }, []);

  const logOut = async (e) => {
    e.preventDefault();
    const response = await logOutApi();
    const data = await response.data;
    if (data.success) {
      setProfile(null);
    }
  };

  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {profile ? (
          <>
            <Link to="/create-post">Create Blog</Link>
            <Link to="#" onClick={logOut}>
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
