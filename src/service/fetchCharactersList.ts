import { responseObj } from '../shared/types';
import { baseUrl, apiKey, limit } from '../shared/constants/constants';

export default async function fetchCharactersList(
  searchQuery: string,
  offset: string
) {
  const url = searchQuery
    ? `${baseUrl}?name=${searchQuery}&limit=${limit}&offset=${offset}&apikey=${apiKey}`
    : `${baseUrl}?&limit=${limit}&offset=${offset}&apikey=${apiKey}`;
  const res = await fetch(url);
  if (res.ok && res.status === 200) {
    const result = await res.json();
    return [
      result.data.total,
      result.data.results.map((char: responseObj) => {
        const { name, id, description, thumbnail, comics } = char;
        return {
          name,
          id,
          description,
          thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
          comics: comics.items?.map((comic) => {
            return comic.name;
          }),
        };
      }),
    ];
  }
  return [];
}
