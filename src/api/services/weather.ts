import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface WeatherResponse {
  temperature: number;
  description: string;
  city: string;
  country: string;
  humidity: number;
  windSpeed: number;
}

export interface GetWeatherRequest {
  lat: number;
  lon: number;
  apiType: 'openweathermap' | 'weatherstack';
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:4000',
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, GetWeatherRequest>({
      query: ({ lat, lon, apiType }) => ({
        url: `/weather`,
        params: { lat, lon, apiType },
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetWeatherQuery } = weatherApi;
