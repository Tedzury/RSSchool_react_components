import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { responseObj } from '../shared/types';

const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const apiKey = 'd8fe8823c3b455a867e537974e39cd7e';

type charListArgs = {
  searchValue: string;
  limit: number;
  offset: number;
};

export type CharListResponse = {
  data: {
    total: number;
    results: responseObj[];
  };
};

export const marvelApi = createApi({
  reducerPath: 'charListApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getCharactersList: build.query<CharListResponse, charListArgs>({
      query: ({ searchValue, limit, offset }) =>
        searchValue
          ? `?name=${searchValue}&limit=${limit}&offset=${offset}&apikey=${apiKey}`
          : `?&limit=${limit}&offset=${offset}&apikey=${apiKey}`,
    }),
  }),
});

export const { useGetCharactersListQuery } = marvelApi;
