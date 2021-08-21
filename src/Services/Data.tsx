import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Train, TranLocation, Station, DelayCode } from '../Types';

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rata.digitraffic.fi/api/v1/' }),
  endpoints: (builder) => ({
    getLiveTrains: builder.query<Train[], undefined>({
      query: () => 'live-trains',
    }),
    getTrainLocation: builder.query<TranLocation[], string>({
      query: (id) => 'train-locations/latest/' + id,
    }),
    getStations: builder.query<Station[], undefined>({
      query: () => 'metadata/stations',
    }),
    getDetailedCauseCategoryCodes: builder.query<DelayCode[], undefined>({
      query: () => 'metadata/detailed-cause-category-codes',
    }),
  }),
});

export const {
  useGetLiveTrainsQuery,
  useGetTrainLocationQuery,
  useGetStationsQuery,
  useGetDetailedCauseCategoryCodesQuery,
} = dataApi;
