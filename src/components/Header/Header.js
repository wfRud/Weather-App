import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";

const Header = ({ value, change, search }) => (
  <header className={styles.wrapper}>
    <img src={logo} alt="logo" className={styles.logo} />
    <div className={styles.searchForm}>
      <input
        type="text"
        id="citySearch"
        className={styles.searchInput}
        value={value}
        placeholder="Type your own place"
        onChange={change}
      />
      <button className={styles.button} onClick={search}>
        search
      </button>
    </div>
    <nav>
      <ul className={styles.sortOfWrapper}>
        <li className={styles.type}>
          <NavLink to="/" exact activeClassName={styles.active}>
            1 day
          </NavLink>
        </li>
        <li className={styles.type}>
          <NavLink to="/week" activeClassName={styles.active}>
            week
          </NavLink>
        </li>
        <li className={styles.type}>
          <NavLink to="/14days" activeClassName={styles.active}>
            14 days
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
export default Header;
