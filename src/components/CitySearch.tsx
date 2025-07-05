import { useState, useMemo } from "react";
import type { City } from "../types/City";

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
        <div style={{ position: "relative", width: "100%", maxWidth: 300 }}>
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setDropdownVisible(true)} // Zobrazí našeptávač
                onBlur={() => setTimeout(() => setDropdownVisible(false), 100)} // Skryje našeptávač po ztrátě fokusu
                placeholder="Zadejte město"
                style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                }}
            />

            {/* Našeptávač s dostupnými městy */}
            {isDropdownVisible && filteredCities.length > 0 && (
                <ul
                    style={{
                        position: "absolute",
                        zIndex: 1000,
                        width: "100%",
                        maxHeight: 200,
                        overflowY: "auto",
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {filteredCities.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => handleCitySelect(city)}
                            style={{
                                padding: "8px",
                                cursor: "pointer",
                                listStyleType: "none",
                                borderBottom: "1px solid #eee",
                            }}
                            onMouseDown={(e) => e.preventDefault()} // Zabrání ztrátě fokusu při kliknutí
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f0f0f0"; // Zvýraznění při najetí myší
                            }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#fff"; }} // Obnovení barvy při opuštění myši
                        >
                            {city.name}, {city.country} 
                        </li>
                    ))}
                </ul>
                )}
            </div>
    );
}