"use client"
import React, {useEffect, useState} from "react";
import Image from "next/image";

import weatherText from "./weather_text";
import weatherIcon from "./weather_icon";

interface WeatherData { 
   name?: string;
   levelType?: string;
   level?: number;
   unit?: string;
   values?: number[];
}
interface WeatherParameters {
   temp: WeatherData;
   wsymb: WeatherData;
}

const Weather = ({lat, lon}: {lat: string, lon: string}) => {
   const [currentForecast, setCurrentForecast] = useState<WeatherParameters>({temp: {}, wsymb: {}});
   const [isLoaded, setIsLoaded] = useState(false)

   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const setCurrentForecastObj = (data: any) => {
      const currentData = data.timeSeries[0];
      const currentForecast: WeatherParameters = {
         temp: {},
         wsymb: {},
      }

      currentData.parameters.forEach((parameter: WeatherData) => {
         if (Object.values(parameter).includes("t")) {
            currentForecast.temp = parameter
         } else if (Object.values(parameter).includes("Wsymb2")) {
            currentForecast.wsymb = parameter
         }
      });

      setCurrentForecast(currentForecast)

   }

   useEffect(() => {
      fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`)
      .then(response => response.json())
      .then(data => {
         setCurrentForecastObj(data)
         setIsLoaded(true)
      })
   }, [lat, lon])

   return (
      isLoaded ?

      <div className="grid grid-cols-2 gap-2 items-center w-72">
         <div>
            <Image src={weatherIcon(currentForecast.wsymb.values![0])} alt="väder" width={50} height={50} className="w-24"/>
         </div>
         <div className="text-center pt-4 font-sans">
            <p className="text-2xl font-bold leading-none text-white">{Math.round(currentForecast.temp.values![0])} &#xb0;C</p>
            <p className="text-sm text-white">{weatherText(currentForecast.wsymb.values![0])}</p>
         </div>
      </div>
      : <p className="text-white text-sm">Laddar väderdata ...</p> 
      
   )
}

export default Weather