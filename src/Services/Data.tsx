import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ITrain, ITranLocation, IStation, IDelayCode,
} from '../Types';

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rata.digitraffic.fi/api/v1/' }),
  endpoints: (builder) => ({
    getLiveTrains: builder.query<ITrain[], undefined>({
      query: () => 'live-trains',
    }),
    getTrainLocation: builder.query<ITranLocation[], string>({
      query: (id) => `train-locations/latest/${id}`,
    }),
    getStations: builder.query<IStation[], undefined>({
      query: () => 'metadata/stations',
    }),
    getDetailedCauseCategoryCodes: builder.query<IDelayCode[], undefined>({
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
