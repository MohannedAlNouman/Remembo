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

  const responseGoogle = res => {
    const response = res ? res.profileObj : {};
    dispatch(userRecieved(response));
  };

  const errorHandler = response => {
    console.error(response);
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

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
