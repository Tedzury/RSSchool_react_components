import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharListResp, CharObj, ChatListRespFormatted } from '../types';
import { formatCharListData } from '../../helpers/formatCharListData';
import { formatCharData } from '../../helpers/formatCharData';
import { HYDRATE } from 'next-redux-wrapper';
import { md5 } from 'js-md5';

const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const apiKey = 'd8fe8823c3b455a867e537974e39cd7e';
const privateKey = '6e0b591b94e47c782593796d8ba3bf65b24afc84';

type charListArgs = {
  searchValue: string;
  limit: string;
  offset: string;
};

export const marvelApi = createApi({
  reducerPath: 'charListApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getCharactersList: build.query<ChatListRespFormatted, charListArgs>({
      query: ({ searchValue, limit, offset }) => {
        const ts = Number(new Date());
        const hash = md5.create();
        hash.update(ts + privateKey + apiKey);
        return searchValue
          ? `?name=${searchValue}&limit=${limit}&offset=${offset}&apikey=${apiKey}&ts=${ts}&hash=${hash}`
          : `?&limit=${limit}&offset=${offset}&apikey=${apiKey}&ts=${ts}&hash=${hash}`;
      },
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

export const {
  useGetCharactersListQuery,
  useGetSingleCharQuery,
  util: { getRunningQueriesThunk },
} = marvelApi;

export const { getCharactersList, getSingleChar } = marvelApi.endpoints;
