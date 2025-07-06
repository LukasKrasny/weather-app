import type { City } from "../types/City";
import type { ForecastResponse } from "../types/ForecastResponse";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchForecast(city: City): Promise<ForecastResponse> {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${API_KEY}&units=metric&lang=cz`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Nepodařilo se načíst data z API");

  return await res.json();
}
