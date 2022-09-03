import React from 'react'
import { WeatherForecast } from '../../models/forecast'
import { getWeatherIcon } from '../../services/weather';
import styles from './ForecastCard.module.scss'

interface Props {
    weather: WeatherForecast;
}

const ForecastCard: React.FunctionComponent<Props> = ({ weather }) => {
  return (
    <div className={styles["forecast-card"]}>
        <span>{weather.dt_txt as string}</span>
        <img className={styles["weather-icon"]} src={getWeatherIcon(weather.weather[0].icon)} alt=""/>
        <div className={styles.temp}>
            <span className={styles["max-temp"]}>{`${Math.round(weather.main.temp_max - 273)}°C`}</span>
            <span className={styles["min-temp"]}>{`${Math.round(weather.main.temp_min - 273)}°C`}</span>
        </div>
    </div>
  )
}

export default ForecastCard