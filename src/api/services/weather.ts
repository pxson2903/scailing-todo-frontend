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
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
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
