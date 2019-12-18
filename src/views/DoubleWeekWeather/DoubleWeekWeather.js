import React, { useState, useEffect } from "react";
import styles from "./DoubleWeekWeather.module.scss";
import Results from "../Results/Results";

const DoubleWeekWeather = props => {
  let { isSearch, name } = props.results;
  // console.log(isSearch, name);
  const [days, setDays] = useState([]);

  const APIkey = "b861d7342b2749e08bbd5ac756cd622e";
  const API = `https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&days=14&key=${APIkey}`;

  const fetchData = async () => {
    if (isSearch) {
      await fetch(API)
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            throw Error("Something Went Wrong");
          }
        })
        .then(response => response.json())
        .then(data => {
          let arr = [];
          data.data.map(item => {
            const obj = {
              temp: item.high_temp,
              pressure: Number(item.pres.toFixed()),
              clouds: item.clouds,
              description: item.weather.description,
              icon: item.weather.icon,
              dateTime: item.datetime,
              db: true
            };
            return arr.push(obj);
          });
          setDays(arr);
        })
        .catch(err => console.log(err));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isSearch && (
        <p className={styles.title}>This is 14 days Weather for {name}</p>
      )}
      <div className={styles.wrapper}>
        {days.map((item, index) => (
          <Results results={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default DoubleWeekWeather;
