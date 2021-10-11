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

  const responseGoogle = resp => {
    const response = resp ? resp.profileObj : {};
    // let dataJSON = {
    //   objective: "finish requests basics",
    //   secondary: "do dishes"
    // };
    // const dataString = JSON.stringify(dataJSON);
    // fetch("/api", {
    //   method: "POST",
    //   body: dataString,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   }
    // })
    //   .then(res => res.json())
    //   .then(data => setData(data.message))
    //   .catch(error => {
    //     console.error("Error:", error);
    //   });
    dispatch(userRecieved(response));
  };

  const errorHandler = response => {
    console.error(response);
  };

  const submitData = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const json = {};
    Array.from(formData.entries()).forEach(([key, value]) => {
      json[key] = value;
    });

    fetch("/api", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div>Profile loading status: {loadingStatus}</div>
      <h3>{`Hello ${name}`}</h3>
      <form action="/" method="post" onSubmit={e => submitData(e)}>
        <input type="text" name="data1"></input>
        <input type="datetime-local" name="data2"></input>
        <input type="submit"></input>
      </form>
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
