import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext); // npw using context from
  // const [redirectLogout, setRedirectLogout] = useState(false);
  // const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("https://blog-api-dotx.onrender.com/profile", {}).then((response) => {
      response.json().then((userInfo) => {
        // setUsername(userInfo.username);
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("https://blog-api-dotx.onrender.com/logout", {
      method: "POST",
    });
    // setUsername(null); // after logput clicking we just need to do this for refreshing the headers ..
    // setRedirectLogout(true);
    setUserInfo(null);
  }

  const username = userInfo?.username; // we are making it question mark because we don't know it works or not beacase userInfo don't have values some time..

  // if (redirectLogout) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
      <header>
        <Link to="/" className="logo">
          MOTO Blog
        </Link>
        <nav>
          <Link to="/" style={{ fontWeight: "bold" }}>
            Home
          </Link>
          {username && (
            <>
              <span>Hello, {username}</span>
              <Link to="/create">Create New Post</Link>
              <Link
                onClick={logout}
                style={{ fontWeight: "bold", color: "Red" }}
              >
                Logout
              </Link>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
