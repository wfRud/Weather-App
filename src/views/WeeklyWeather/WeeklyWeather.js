import React, { useState, useEffect } from "react";
import styles from "./WeeklyWeather.module.scss";
import * as helpers from "../../helpers/getData";
import Results from "../Results/Results";

const WeeklyWeather = props => {
  let { isSearch, name } = props.results;
  const [days, setDays] = useState([]);

  const APIkey = "a2d82e0dcbf7281bcde66db1ba3ea371";
  const API = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${APIkey}&units=metric`;

  const fetchData = async () => {
    if (isSearch) {
      await fetch(API)
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            throw Error("Something went wrong");
          }
        })
        .then(response => response.json())
        .then(data => {
          const dividedDays = helpers.getDays(data.list, 8);
          const summaryDayDetails = {
            temp: helpers.getEachDayDetails(dividedDays, "main", "temp"),
            pressure: helpers.getEachDayDetails(
              dividedDays,
              "main",
              "pressure"
            ),
            clouds: helpers.getEachDayDetails(dividedDays, "clouds", "all"),
            description: helpers.getEachDayDetails(
              dividedDays,
              "weather",
              "description"
            ),
            iCons: helpers.getEachDayDetails(dividedDays, "weather", "icon")
          };
          const averageDayDetails = {
            temp: helpers.getAverages(summaryDayDetails.temp),
            pressure: helpers.getAverages(summaryDayDetails.pressure),
            clouds: helpers.getAverages(summaryDayDetails.clouds),
            description: helpers.getMostUsedDesc(summaryDayDetails.description),
            icon: helpers.getMostUsedDesc(summaryDayDetails.iCons)
          };

          const x = helpers.getEachDay(averageDayDetails);
          setDays(x);
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
        <p className={styles.title}>This is Weekly Weather for {name}</p>
      )}
      <div className={styles.wrapper}>
        {days.map((item, index) => (
          <Results results={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default WeeklyWeather;
