import {useState} from "react";
import {GoogleLogin, GoogleLogout} from "react-google-login";
import {useSelector, useDispatch} from "react-redux";
import {Line} from "react-chartjs-2";
import Chart from "chart.js/auto";
//datasetIdKey='id' changes prop from key to id

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

  const responseGoogle = resp => {
    const response = resp ? resp.profileObj : {};
    dispatch(userRecieved(response));
  };

  const errorHandler = response => {
    console.error(response);
  };

  const submitData = e => {
    e.preventDefault();
    e = e.target;
    setDataset(old => {
      return [...old, {x: time, y: input}];
    });
    setInput("");
    setTime("");
    let payload = {data: e.data1.value, time: e.data2.value};
    console.log("payload is v");
    console.log(payload);
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    };
    fetch("/api", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("response is v");
        console.log(data);
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  };

  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const [dataset, setDataset] = useState([]);

  const handleDataChange = e => {
    setInput(e.target.value);
  };

  const handleTimeChange = e => {
    console.log(e.target);
    setTime(e.target.value);
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "linear",
          time: {
            unit: "month"
          }
        }
      ]
    }
  };

  const data = {
    labels: [new Date(2020, 5, 1), new Date(2020, 8, 2)],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: dataset
      }
    ]
  };

  return (
    <div>
      <div>Profile loading status: {loadingStatus}</div>
      {user.name ? (
        <div>
          <h3>{`Hello ${user.name}`}</h3>
          <form action="/" method="post" onSubmit={e => submitData(e)}>
            <input
              type="text"
              name="data1"
              value={input}
              onChange={handleDataChange}
            ></input>
            <input
              type="date" //"datetime-local"
              name="data2"
              value={time}
              onChange={handleTimeChange}
            ></input>
            <input type="submit"></input>
          </form>
        </div>
      ) : (
        <h3>Hello</h3>
      )}
      {dataset.map((e, i) => {
        return (
          <div key={i}>
            Value: {e.y} at time: {e.x}
          </div>
        );
      })}
      <Line data={data} options={options} />

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
