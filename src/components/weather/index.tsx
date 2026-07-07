import React from "react";
import Image from "next/image";

import weatherText from "./weather_text";
import weatherIcon from "./weather_icon";

interface CurrentForecast {
   temperature: number;
   symbol: number;
}

/**
 * Fetch the SMHI forecast on the server. SMHI's open-data API sends no CORS
 * headers, so this must not run in the browser. Cached for an hour since the
 * forecast doesn't change more often than that.
 *
 * Uses the snow1g v1 point-forecast API (the old pmp3g v2 API was retired).
 * The current temperature is `air_temperature` and the weather symbol is
 * `symbol_code` (same 1–27 code table the old `Wsymb2` used).
 */
async function getCurrentForecast(lat: string, lon: string): Promise<CurrentForecast | null> {
   try {
      const response = await fetch(
         `https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1/geotype/point/lon/${lon}/lat/${lat}/data.json`,
         { next: { revalidate: 3600 } }
      );

      if (!response.ok) return null;

      const data = await response.json();
      const current = data?.timeSeries?.[0]?.data;

      if (
         current == null ||
         typeof current.air_temperature !== "number" ||
         typeof current.symbol_code !== "number"
      ) {
         return null;
      }

      return { temperature: current.air_temperature, symbol: current.symbol_code };
   } catch {
      // SMHI unavailable — fail quietly rather than break the dashboard.
      return null;
   }
}

const Weather = async ({ lat, lon }: { lat: string; lon: string }) => {
   const forecast = await getCurrentForecast(lat, lon);

   if (!forecast) {
      return null;
   }

   return (
      <div className="grid grid-cols-2 gap-2 items-center w-72">
         <div>
            <Image src={weatherIcon(forecast.symbol)} alt="väder" width={50} height={50} className="w-24" />
         </div>
         <div className="text-center pt-4 font-sans">
            <p className="text-2xl font-bold leading-none text-white">{Math.round(forecast.temperature)} &#xb0;C</p>
            <p className="text-sm text-white">{weatherText(forecast.symbol)}</p>
         </div>
      </div>
   );
};

export default Weather;
