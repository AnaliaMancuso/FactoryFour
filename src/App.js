import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

function App() {
  const apiName = [
    "accounts",
    "assets",
    "customers",
    "datapoints",
    "devices",
    "documents",
    "forms",
    "invites",
    "media",
    "messages",
    "namespaces",
    "orders",
    "patients",
    "relationships",
    "rules",
    "templates",
    "users",
    "workflows",
  ];
  const arrUrls = [];
  function getUrls() {
    apiName.map((el) => {
      let oneUrl = {
        name: el,
        url: `https://api.factoryfour.com/${el}/health/status`,
      };
      return arrUrls.push(oneUrl);
    });
  }
  getUrls();

  const [data, setData] = useState();
  const [dataErr, setDataErr] = useState();

  function useGetData() {
    let allData = [];
    let allErrData = [];
    const getData = () => {
      arrUrls.map((el) =>
        axios
          .get(el.url)
          .then((res) => {
            let resData = {
              name: el.name,
              hostname: res.data.hostname,
              message: res.data.message,
              time: moment(res.data.time).format("LTS"),
            };

            allData.push(resData);
            setData(allData);
          })
          .catch((err) => {
            let errData = {
              name: el.name,
            };
            allErrData.push(errData);
            setDataErr(allErrData);
          })
      );
    };
    useEffect(() => {
      setInterval(getData, 15000);
    });
  }

  useGetData();

  console.log(data);
  return (
    <div className="App">
      <div className="container">
        {data
          ? data.map((el) => (
              <div className="card-container">
                <h2 className="title">{el.name}</h2>
                <h3 className="message">{el.message}</h3>
                <h3 className="hostname">{el.hostname}</h3>
                <h5 className="time">{el.time}</h5>
              </div>
            ))
          : null}
        {dataErr
          ? dataErr.map((el) => (
              <div className="card-container">
                <h2 className="title">{el.name}</h2>
                <h3 className="err-message">Error</h3>
                <h3 className="err">OUTAGE</h3>
                <h3 className="err">403</h3>
                <h3 className="err">Forbidden</h3>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
