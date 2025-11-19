import axios from 'axios';

const API = import.meta.env.VITE_W_API
const getLocation = (city)=>{
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API}`;
    return axios.get(url)
    .then(r=>r.data[0])
    .then(data=>{
        return {
            latitude: data.lat,
            longitude: data.lon
        }
    })
    .catch(e=>console.log("error" + e.message))
}

const getCityWeather = (city)=>{
    return getLocation(city)
    .then(loc=>{
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.latitude}&lon=${loc.longitude}&appid=${API}&units=metric`;
    return axios.get(url)
    .then(r=>r.data)
    .then(data=>{
        return {
            city,
            weather:`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            wind: data.wind.speed + " m/s" ,
            temp: data.main.temp + " °c",
        }
    })
    .catch(e=>console.log("Weather error" + e.message))
    })
}

export {getCityWeather}