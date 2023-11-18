import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharListResp, CharObj, ChatListRespFormatted } from '../types';
import { formatCharListData } from '../../helpers/formatCharListData';
import { formatCharData } from '../../helpers/formatCharData';

const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const apiKey = 'd8fe8823c3b455a867e537974e39cd7e';

type charListArgs = {
  searchValue: string;
  limit: number;
  offset: number;
};

export const marvelApi = createApi({
  reducerPath: 'charListApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getCharactersList: build.query<ChatListRespFormatted, charListArgs>({
      query: ({ searchValue, limit, offset }) =>
        searchValue
          ? `?name=${searchValue}&limit=${limit}&offset=${offset}&apikey=${apiKey}`
          : `?&limit=${limit}&offset=${offset}&apikey=${apiKey}`,
      transformResponse: (response: CharListResp) => {
        const totalResults = response.data.total;
        const charData = formatCharListData(response.data.results);
        return { charData, totalResults };
      },
    }),
    getSingleChar: build.query<CharObj, number>({
      query: (id) => `${id}?apikey=${apiKey}`,
      transformResponse: (response: CharListResp) =>
        formatCharData(response.data.results[0]),
    }),
  }),
});

export const { useGetCharactersListQuery, useGetSingleCharQuery } = marvelApi;
