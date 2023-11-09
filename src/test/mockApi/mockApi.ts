import { http, HttpResponse } from 'msw';
import {
  responseCharList,
  responseNoChars,
  responseCharListExtended,
} from './responseData';

export const handlers = [
  http.get('https://gateway.marvel.com/v1/public/characters', ({ request }) => {
    const url = new URL(request.url);
    const searchName = url.searchParams.get('name');
    const limit = url.searchParams.get('limit');
    if (Number(limit) == 10) return HttpResponse.json(responseCharListExtended);
    if (!searchName) {
      return HttpResponse.json(responseCharList);
    }
    return HttpResponse.json(responseNoChars);
  }),
];
