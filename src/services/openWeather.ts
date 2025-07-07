import type { City } from "../types/City";
import type { ForecastResponse } from "../types/ForecastResponse";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchForecast(city: City): Promise<ForecastResponse> {
  const url = `${BASE_URL}?q=${city.name}&appid=${API_KEY}&units=metric&lang=cs`;
  console.log("Fetching forecast from:", url); 
  console.log("Volaná URL:", url);


  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API error:", response.status, errorText);
    throw new Error("Nepodařilo se načíst předpověď počasí. Zkontrolujte název města nebo API klíč.");
  }

  return response.json();
}