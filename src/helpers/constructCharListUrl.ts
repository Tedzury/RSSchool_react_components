import { md5 } from 'js-md5';
import { baseUrl, apiKey, privateKey } from '../shared/constants/constants';

type queryParam = string | undefined;

export default function constructCharListUrl(
  name: queryParam,
  limit: queryParam,
  page: queryParam
) {
  const myLimit = limit ?? '5';
  const myPage = page ?? '1';
  const offset = Number(myLimit) * (Number(myPage) - 1);
  const ts = Number(new Date());
  const hash = md5.create();
  hash.update(ts + privateKey + apiKey);
  let url = `${baseUrl}?&limit=${myLimit}&offset=${offset}&apikey=${apiKey}&ts=${ts}&hash=${hash}`;
  if (name) {
    url += `&name=${name}`;
  }
  return url;
}
