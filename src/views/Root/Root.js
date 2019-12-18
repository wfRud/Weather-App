import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import WeeklyWeather from "../WeeklyWeather/WeeklyWeather";
import DoubleWeekWeather from "../DoubleWeekWeather/DoubleWeekWeather";
import Results from "../Results/Results";

const APIkey = "a2d82e0dcbf7281bcde66db1ba3ea371";

class Root extends Component {
  state = {
    isSearch: false,
    value: ""
    // name: "",
    // temp: "",
    // pressure: "",
    // clouds: "",
    // description: "",
    // icon: ""
  };

  handleChangeInput = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSearchButton = () => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIkey}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          throw Error("Something went wrong");
        }
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          isSearch: true,
          name: this.state.value,
          value: "",
          temp: data.main.temp,
          pressure: data.main.pressure,
          clouds: data.clouds.all,
          description: data.weather[0].description,
          icon: data.weather[0].icon
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    let isSearch = this.state.isSearch;

    return (
      <>
        <Router>
          <Header
            value={this.state.value}
            change={this.handleChangeInput}
            search={this.handleSearchButton}
          />
          {isSearch && (
            <Route
              exact
              path="/"
              component={() => <Results results={this.state} />}
            />
          )}

          <Route
            path="/week"
            component={() => <WeeklyWeather results={this.state} />}
          />
          <Route
            path="/14days"
            component={() => <DoubleWeekWeather results={this.state} />}
          />
        </Router>
      </>
    );
  }
}

export default Root;
