import { useEffect, useState } from "react";
import type { City } from "../types/City";
import type { ForecastResponse } from "../types/ForecastResponse";
import { fetchForecast } from "../services/openWeather";
import { formatDateTime } from "../utils/format";

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
      .catch(() => setError("Nepodařilo se načíst předpověď."))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) return <p>Načítám předpověď...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!forecast) return null;

  const current = forecast.list[0];

  return (
    <article
      aria-label={`Předpověď počasí pro ${forecast.city.name}`}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        marginTop: "16px",
        maxWidth: "320px",
      }}
    >
      <header>
        <h2>
          {forecast.city.name}, {forecast.city.country}
        </h2>
      </header>

      <section>
        <p>
          <strong>{current.main.temp} °C</strong> – {current.weather[0].description}
        </p>

        <p>Vlhkost: {current.main.humidity} %</p>

        {/* Sémantický tag time */}
        <p>
          Čas měření:{" "}
          <time dateTime={new Date(current.dt * 1000).toISOString()}>
            {formatDateTime(current.dt)}
          </time>
        </p>

        <figure>
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={current.weather[0].description}
            style={{ display: "block" }}
          />
          <figcaption>Ikona počasí</figcaption>
        </figure>
      </section>
    </article>
  );
}
