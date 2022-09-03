import React from 'react'
import { WeatherForecast } from '../../models/forecast';
import { getAsset, getWeatherIcon } from '../../services/weather';
import styles from './SearchBar.module.scss'

interface Props {
  weather?: WeatherForecast;
  location?: string;
}

const SearchBar: React.FunctionComponent<Props> = ({ weather, location }) => {
  const icon = getWeatherIcon(weather?.weather[0].icon);
  const clouds = getAsset('cloudBackground');
  return (
    <div className={styles.sidebar}>
      <div style={{height:"50px"}}></div>
      <div className={styles["icons-wrapper"]}>
        <img className={styles.icon} src={icon} alt="" />
        <img className={styles.clouds} src={clouds} alt="" />
      </div>
      <div className={styles["info-wrapper"]}>
        <span className={styles.temp}>
          {`${Math.round((weather?.main.temp??0) - 273)}`}<span>°C</span>
        </span>
        <span className={styles.state}>{weather?.weather[0].main}</span>
        <div className="column g-2rem">
          <span className={styles.date}>{weather?.dt_txt}</span>
          <span className={styles.date}>{location}</span>
        </div>
      </div>
    </div>
  )
}

export default SearchBar