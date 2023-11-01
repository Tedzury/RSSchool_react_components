import { responseObj } from '../shared/types';
import { baseUrl, apiKey, limit } from '../shared/constants/constants';

export default async function fetchCharacters(searchQuery: string) {
  const url = searchQuery ? `${baseUrl}?name=${searchQuery}&limit=${limit}&offset=0&apikey=${apiKey}` : `${baseUrl}?&limit=20&offset=0&apikey=${apiKey}`;
  const res = await fetch(url);
  if (res.ok && res.status === 200) {
    const data = await res.json();
    console.log(data);
    return data.data.results.map((char: responseObj) => {
      return {
        name: char.name,
        id: char.id,
        description: char.description,
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        comics: char.comics.items?.map(comic => {return comic.name}),
      };
    });
  }
  return [];
}
