import { useEffect, useState } from 'react'
import styles from './HomePage.module.scss'
import SearchBar from '../shared/components/search-bar/SearchBar'
import { getForecastWeatherData, prepareForecastResult } from '../shared/services/weather';
import { ForecastResult, WeatherForecast } from '../shared/models/forecast';
import type * as CSS from 'csstype';
import ForecastCard from '../shared/components/forecast-card/ForecastCard';
import Card from '../shared/components/card/Card';

const HomePage = () => {
  const [weather, setWeather] = useState<ForecastResult>();

  if(navigator.geolocation && !weather) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude.toString();
      const lon = position.coords.longitude.toString();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const forecast = await getForecastWeatherData(lat, lon, tomorrow);
      const weatherPerDay: WeatherForecast[] = prepareForecastResult(forecast);
      setWeather({ ...forecast, list: weatherPerDay });
    });
  }

  
  const [forecastElements, setForecastElements] = useState<JSX.Element[]>();
  const [statsElements, setWeatherStats] = useState<JSX.Element>();
  useEffect(() => {
    if(weather) {
      const currentWeather = weather.list[0];
      const newForecastElements = weather.list.map(w => {
        return <ForecastCard key={w.dt} weather={w}></ForecastCard>
      });
      setForecastElements(newForecastElements);
      const barstyle: CSS.Properties = {["--humidity" as any]: `${currentWeather.main.humidity}%`};
      const windAngle = `${currentWeather.wind.deg}deg`;
      const windstyle: CSS.Properties = {["--wind-angle" as any]: windAngle};
      const newStatsElements = (
        <>
          <div className={styles["row-stats"]}>
            <Card>
              <span>Wind status</span>
              <span>
                <span className={styles['bigheader-1']}>{currentWeather.wind.speed}</span>
                <span className={styles['bigheader-2']}>mph</span>
              </span>
              <div className={styles.wind}>
                <span style={windstyle} className={['material-icons', styles["round-icon"]].join(" ")}>navigation</span>
                <span>WSW ({windAngle})</span>
              </div>
            </Card>
            <Card>
              <span>Humidity</span>
              <span>
                <span className={styles['bigheader-1']}>{`${currentWeather.main.humidity}`}</span>
                <span className={styles['bigheader-2']}>%</span>
              </span>
              
              <div style={barstyle} className={styles.bar}></div>
            </Card>
          </div>
          <div className={styles["row-stats"]}>
            <Card>
              <span>Visibility</span>
              <span>
                <span className={styles['bigheader-1']}>{`${(currentWeather.visibility * 0.000621371).toFixed(1)} `}</span>
                <span className={styles['bigheader-2']}>miles</span>
              </span>
            </Card>
            <Card>
              <span>Air pressure</span>
              <span>
                <span className={styles['bigheader-1']}>{`${currentWeather.main.pressure} `}</span>
                <span className={styles['bigheader-2']}>mb</span>
              </span>
            </Card>
          </div>
        </>
      );
      setWeatherStats(newStatsElements);
    }
  }, [weather]);
  
  return (
    <div className={styles.container}>
      <SearchBar weather={(weather ? weather.list[0] : undefined)} location={weather?.city.name}></SearchBar>
      <div className={styles.content}>
        <div className={styles["forecast-grid"]}>
          {forecastElements}
        </div>
        <div className={styles["weather-stats"]}>
          <h5 className={styles.title}>Today’s Hightlights</h5>
          {statsElements}
        </div>
      </div>
    </div>
  );
}

export default HomePage



