import { useEffect, useState } from "react";
import type { City } from "../../types/City";
import type { ForecastResponse } from "../../types/ForecastResponse";
import { fetchForecast } from "../../services/openWeather";
import { formatDateTime } from "../../utils/format";
import "./WeatherCard.scss";

type Props = {
  city: City;
};

export default function WeatherCard({ city }: Props) {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchForecast(city)
      .then((data) => setForecast(data))
      .catch((err) => {
        console.error("Chyba při načítání předpovědi:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) return <p>Načítám předpověď...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!forecast) return null;

  const current = forecast.list[0];
  const dailyForecasts = forecast.list.reduce<Map<string, typeof forecast.list[0]>>((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("cs-CZ");
    if (!acc.has(date)) {
      acc.set(date, item);
    }
    return acc;
  }, new Map<string, typeof forecast.list[0]>());


  return (
    <article
      aria-label={`Předpověď počasí pro ${forecast.city.name}`}>
      <header className="weather-card">
        <p>Vybrané město:</p>
        <h2>{forecast.city.name}, {forecast.city.country}</h2>
      </header>

      <section className="weather-card">
        <p>
          <strong>{current.main.temp} °C</strong>
        </p>
        <p>Vlhkost: {current.main.humidity} %</p>
        <p>Vítr: {current.wind.speed} m/s</p>
        <p>
          Čas měření:{" "}
          <time dateTime={new Date(current.dt * 1000).toISOString()}>
            {formatDateTime(current.dt)}
          </time>
        </p>

        <figure className="icon-wrapper">
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={current.weather[0].description}
          />
        </figure>
      </section>
      <section>
        <h3>Předpověď na dalších 5 dní:</h3>
        <ul className="forecast-list">
          {Array.from(dailyForecasts.values()).map((entry) => (
            <li key={entry.dt} className="forecast-item">
              <strong>{new Date(entry.dt * 1000).toLocaleDateString("cs-CZ", {
                weekday: "long", day: "numeric", month: "numeric"
              })}</strong>
              <div>{entry.main.temp.toFixed(1)} °C</div>
              <div className="icon-wrapper">
                <img
                  src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`}
                  alt={entry.weather[0].description}
                />
              </div>

            </li>
          ))}
        </ul>
      </section>

    </article>
  );
}

