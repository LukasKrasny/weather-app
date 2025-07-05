import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import type { City } from './types/City';
// import WeatherCard from './components/WeatherCard'; // Připraveno pro budoucí použití

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Načtení seznamu měst z lokálního souboru
  useEffect(() => {
    fetch('/data/cities.json')  // Cesta k souboru s městy 
      .then((res) => res.json())
      .then((data: City[]) => {
        setCities(data);
      })
      .catch((error) => {
        console.error('Chyba při načítání měst:', error);
      });
  }, []);

  // Funkce pro nastavení vybraného města
  return (
    <>
      <header>
        <h1>Předpověď počasí</h1>
      </header>

      <main>
        {/* Našeptávač pro výběr města */}
        <CitySearch cities={cities} setSelectedCity={setSelectedCity} />
        {/* Výpis vybraného města */}
        {selectedCity && (
          <section aria-label="Vybrané město">
            <p>Vybrané město: {selectedCity.name} ({selectedCity.country})</p>
            {/* <WeatherCard city={selectedCity} /> */}
          </section>
        )}

      </main>

      <footer>
        <p>&copy; 2025 Lukáš Krásný</p>
      </footer>
    </>
  );
}

export default App
