# Předpověď počasí – React + TypeScript + Vite

Jednoduchá webová aplikace pro vyhledávání měst, zobrazení aktuální předpovědi počasí a následujících 5 dní pomocí OpenWeatherMap API.

## Popis aplikace

Aplikace umožňuje:
- zadat město do vyhledávacího pole s našeptávačem
- vybrat město ze seznamu odpovídajících výsledků
- načíst aktuální předpověď počasí z REST API OpenWeatherMap (5denní / 3h předpověď)
- zobrazit teplotu, popis počasí, vlhkost a ikonu

Klade důraz na:
- použití HTML5 sémantiky (`<main>`, `<article>`, `<time>`)
- formátování data/času podle jazyka prohlížeče
- čistý funkcionální přístup bez UI knihoven
- přehlednou strukturu bez složité konfigurace
- CSS styly pomocí SASS

## Spuštění aplikace

### 1. Klonování a instalace 
```bash
git clone https://github.com/LukasKrasny/weather-app.git
cd weather-app
npm install
```
### 2. Přidání API klíče

Zaregistruj se na https://openweathermap.org/, získej bezplatný API klíč a vytvoř v kořenové složce soubor .env:
```bash
VITE_API_KEY=tvuj_api_klic
VITE_API_BASE_URL=https://api.openweathermap.org/data/2.5/forecast
```

### 3. Spuštění vývojového serveru
```bash
npm run dev
```

## Podporované prohlížeče

Aplikace byla vyvíjena a testována v prohlížeči Brave (Chromium-based).
Díky použití moderních webových standardů by měla být plně funkční také v dalších běžně používaných prohlížečích:

- ✅ Brave (testováno)
- ✅ Mozilla Firefox (testováno)
- ⚠️ Google Chrome (očekávaná plná  kompatibilita)
- ⚠️ Microsoft Edge (očekávaná kompatibilita)
- ⚠️ Safari (desktop) (očekávaná kompatibilita)

## Struktura projektu
```bash
src/
├── components/
│   ├── CitySearch/
│   │   ├── CitySearch.tsx
│   │   └── CitySearch.scss
│   └── WeatherCard/
│       ├── WeatherCard.tsx
│       └── WeatherCard.scss
├── styles/
│   ├── variables.scss
│   ├── main.scss
├── services/           # Volání REST API (fetchForecast)
├── types/              # TypeScript typy (City, ForecastResponse)
├── utils/              # Pomocné funkce (např. formatDateTime)
├── App.tsx             # Hlavní komponenta
public/
└── data/cities.json    # Lokální seznam měst z OpenWeatherMap
```

## Moduly a logické celky

- CitySearch.tsx – našeptávač pro výběr města
- WeatherCard.tsx – zobrazení aktuální předpovědi počasí
- openWeather.ts – REST API wrapper (fetch)
- format.ts – pomocné funkce pro formátování času
- City.ts, ForecastResponse.ts – typy odpovídající datovým strukturám OpenWeatherMap

## Použité technologie

- React + TypeScript
- Vite – moderní buildovací nástroj
- HTML5 + SASS (pro stylování)
- REST API – OpenWeatherMap
- Intl.DateTimeFormat – pro lokalizované formátování času






