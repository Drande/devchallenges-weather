import shower from '../assets/Shower.png';
import clear from '../assets/Clear.png';
import hail from '../assets/Hail.png';
import snow from '../assets/Snow.png';
import sleet from '../assets/Sleet.png';
import heavyRain from '../assets/HeavyRain.png';
import heavyCloud from '../assets/HeavyCloud.png';
import lightRain from '../assets/LightRain.png';
import lightCloud from '../assets/LightCloud.png';
import thunderstorm from '../assets/Thunderstorm.png';
import cloudBackground from '../assets/Cloud-background.png';
import { ForecastResult, ApiWeatherIcons, WeatherForecast } from '../models/forecast';

let weatherCache: Record<string, ForecastResult> = {};

const apiKey = "fa365181e9835ceb0bb48449e0018a5d";

export const getForecastWeatherData = async (lat:string, lon:string, date: Date) => {
    const dt = Math.floor(date.getTime() / 1000);
    const uri: string = `https://api.openweathermap.org/data/2.5/forecast?`;
    const queryParams = `lat=${lat}&lon=${lon}&dt=${dt}&appid=${apiKey}`;
    const fullUri = uri + queryParams;
    if(weatherCache[fullUri]) {
        return weatherCache[fullUri];
    }
    
    const result: ForecastResult = await fetch(fullUri).then(response => response.json());
    weatherCache[fullUri] = result;
    return result;
}

export const prepareForecastResult = (forecast: ForecastResult): WeatherForecast[] => {
    const dtDay = 86400;
    let basedt = forecast.list[0].dt;
    const dailyWeather = forecast.list.filter((weather) => {
      return ((weather.dt - basedt) % dtDay) === 0;
    });
    const fixedDateWeather: WeatherForecast[] = dailyWeather.map(w => {
        

        return {
            ...w,
            dt_txt: parseWeatherDate(w.dt)
        };
    });
    return fixedDateWeather;
}

function parseWeatherDate(dt: number) {
    const date = new Date(dt * 1000);
    const week = date.toLocaleString(undefined, { weekday: "short" });
    const weekDay = week.charAt(0).toUpperCase() + week.slice(1).toLowerCase();
    const day = date.toLocaleString(undefined, { day: "numeric" });
    const month = date.toLocaleString(undefined, { month: "short" });
    const monthName = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    return `${weekDay}, ${day} ${monthName}`;
}

export const getWeatherIconUrl = (icon: ApiWeatherIcons): string => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

type WeatherState = keyof typeof WeatherIcon;

const WeatherIcon = {
    shower: shower,
    clear: clear,
    hail: hail,
    snow: snow,
    sleet: sleet,
    heavyRain: heavyRain,
    heavyCloud: heavyCloud,
    lightRain: lightRain,
    lightCloud: lightCloud,
    thunderstorm: thunderstorm,
};

const IconMap: Record<string, WeatherState> = {
    "01": "clear",
    "02": "lightCloud",
    "03": "heavyCloud",
    "04": "heavyCloud",
    "09": "heavyRain",
    "10": "shower",
    "11": "thunderstorm",
    "13": "snow",
    "50": "lightCloud"
}

export const getWeatherIcon = (state?: string) => {
    if(!state) { return undefined; }
    const weatherState: WeatherState = IconMap[state.replace("d","").replace("n","")];
    return WeatherIcon[weatherState];
}

export const getAsset = (assetName: WeatherAsset) => {
    return weatherAssets[assetName];
}

type WeatherAsset = keyof typeof weatherAssets;

const weatherAssets = {
    cloudBackground: cloudBackground,
}