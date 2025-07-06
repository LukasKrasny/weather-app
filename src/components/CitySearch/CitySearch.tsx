import { useState, useMemo } from "react";
import type { City } from "../../types/City";
import "./CitySearch.scss"; 

type CitySearchProps = {
    cities: City[]; // Seznam dostupných měst
    setSelectedCity: (city: City) => void; // Funkce pro nastavení vybraného města
};

export default function CitySearch({ cities, setSelectedCity }: CitySearchProps) {
    const [query, setQuery] = useState(""); // Aktuální text v inputu
    const [isDropdownVisible, setDropdownVisible] = useState(false); // Viditelnost 

    // Filtrování měst podle dotazu (ingnoruje velikost písmen)
    const filteredCities = useMemo(() => {
        const q = query.toLowerCase().trim();
        return q === ""
            ? []
            : cities.filter((city) => city.name.toLowerCase().includes(q))
            .slice(0, 10); // Vrátí maximálně 10 výsledků    
    }, [query, cities]);

    // Reakce na výběr města z našeptávače
    const handleCitySelect = (city: City) => {
        setQuery(`${city.name}, ${city.country}`); // Zobrazí vybrané město v inputu
        setDropdownVisible(false); // Skryje našeptávač
        setSelectedCity(city); // Nastaví vybrané město
    };

    return (
        <div className="city-search">
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setDropdownVisible(true)} // Zobrazí našeptávač
                onBlur={() => setTimeout(() => setDropdownVisible(false), 100)} // Skryje našeptávač po ztrátě fokusu
                placeholder="Zadejte město"
            />

            {/* Našeptávač s dostupnými městy */}
            {isDropdownVisible && filteredCities.length > 0 && (
                <ul>
                    {filteredCities.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => handleCitySelect(city)}
                            onMouseDown={(e) => e.preventDefault()} // Zabrání ztrátě fokusu při kliknutí
                            className="suggestions"
                        >
                            {city.name}, {city.country} 
                        </li>
                    ))}
                </ul>
                )}
            </div>
    );
}