import axios from "axios";
import { useState, useEffect } from "react";

import moment from "moment";

export default function useGetData() {
  //data success
  const [data, setData] = useState();
  //data error
  const [dataErr, setDataErr] = useState();
  //generate urls to call from given array
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

  let allData = [];
  let allErrData = [];
  //api calls
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
          if (allData.length > 14) {
            setData(allData);
          }
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
    const interval = setInterval(() => {
      getData();
    }, 15000);
    return () => clearInterval(interval);
  }, [data, dataErr]); //eslint-disable-line react-hooks/exhaustive-deps
  return {
    data,
    dataErr,
  };
}

