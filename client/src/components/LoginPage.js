import {useState, useEffect} from "react";
import {GoogleLogin, GoogleLogout} from "react-google-login";
import {useSelector, useDispatch} from "react-redux";

import {
  userLoading,
  userRecieved,
  selectLoadingStatus,
  selectUser
} from "../Reducers/user.js";

const LoginPage = props => {
  const loadingStatus = useSelector(state => {
    return selectLoadingStatus(state);
  });

  const user = useSelector(state => {
    return selectUser(state);
  });

  const name = user.name ? user.name : "";

  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(userLoading());
  };

  const [data, setData] = useState(null);

  // // useEffect(() => {
  // //   fetch("/test", {
  // //     method: "GET"
  // //   })
  // //     .then(res => res.json())
  // //     .then(data => console.log("Success:", data))
  // //     .catch(error => {
  // //       console.error("Error:", error);
  // //     });
  // // }, []);
  //
  // useEffect(() => {
  //
  // }, []);

  const responseGoogle = resp => {
    const response = resp ? resp.profileObj : {};
    fetch("/api", {
      method: "POST",
      body: {chicken: "yummy"},
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setData(data.message));
    dispatch(userRecieved(response));
  };

  const errorHandler = response => {
    console.error(response);
  };

  return (
    <div>
      <div>Profile loading status: {loadingStatus}</div>
      <h3>{`Hello ${name}`}</h3>
      <div>{data}</div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onRequest={loginHandler}
        onSuccess={responseGoogle}
        onFailure={errorHandler}
        isSignedIn={true}
        theme={"dark"}
        cookiePolicy={"single_host_origin"}
      />
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onLogoutSuccess={responseGoogle}
        onFailure={errorHandler}
        theme={"dark"}
      />
    </div>
  );
};

export default LoginPage;
