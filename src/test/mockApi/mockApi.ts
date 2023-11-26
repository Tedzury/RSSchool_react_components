import { http, HttpResponse } from 'msw';
import {
  responseCharList,
  responseNoChars,
  responseCharListExtended,
  responseSingleChar,
  responseSecondSingleChar,
} from './responseData';

export const handlers = [
  http.get('https://gateway.marvel.com/v1/public/characters/1011334', () => {
    return HttpResponse.json(responseSingleChar);
  }),
  http.get('https://gateway.marvel.com/v1/public/characters/1017100', () => {
    return HttpResponse.json(responseSecondSingleChar);
  }),
  http.get(
    'https://gateway.marvel.com/v1/public/characters?&limit',
    ({ request }) => {
      const url = new URL(request.url);
      const searchName = url.searchParams.get('name');
      const limit = url.searchParams.get('limit');
      if (Number(limit) == 10)
        return HttpResponse.json(responseCharListExtended);
      if (!searchName) {
        return HttpResponse.json(responseCharList);
      }
      return HttpResponse.json(responseNoChars);
    }
  ),
];
