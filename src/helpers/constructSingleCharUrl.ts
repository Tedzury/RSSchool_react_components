import { md5 } from 'js-md5';
import { baseUrl, apiKey, privateKey } from '../shared/constants/constants';
import getCharId from './getCharId';

type queryParam = string | undefined;

export default function constructSingleCharUrl(slug: queryParam) {
  const ts = Number(new Date());
  const hash = md5.create();
  hash.update(ts + privateKey + apiKey);
  const actualId = getCharId(slug);
  const url = `${baseUrl}/${actualId}?apikey=${apiKey}&ts=${ts}&hash=${hash}`;

  return url;
}
