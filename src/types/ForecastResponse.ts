export type ForecastResponse = {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt: number; 
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
};
