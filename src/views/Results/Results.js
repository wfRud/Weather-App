import React from "react";
import styles from "./Result.module.scss";

const Results = props => {
  let {
    name,
    temp,
    pressure,
    clouds,
    description,
    icon,
    dateTime,
    db
  } = props.results;
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const iconBitURL = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

  return (
    <>
      <div className={styles.wrapper}>
        {dateTime ? <p>{dateTime}</p> : null}
        <img src={db ? iconBitURL : iconURL} alt="icon" />
        <h1>{name}</h1>
        <h3>Temp: {temp.toFixed()} &#0176;C</h3>
        <h3>Pressure: {pressure} hPA</h3>
        <h3>Clouds: {clouds}% </h3>
        <h3>{description}</h3>
      </div>
    </>
  );
};

export default Results;
