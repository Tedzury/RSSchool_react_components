import { CharObj } from '../shared/types';
import { baseUrl, apiKey } from '../shared/constants/constants';

export default async function fetchCharacter(id: string): Promise<CharObj> {
  const url = `${baseUrl}/${id}?apikey=${apiKey}`;
  const res = await fetch(url);
  if (res.ok && res.status === 200) {
    const result = await res.json();

    const { name, id, description, thumbnail, comics } = result.data.results[0];
    return {
      name,
      id,
      description,
      thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
      comics: comics.items?.map((comic: { name: string }) => {
        return comic.name;
      }),
    };
  }
  return {
    name: 'error',
    id: 'error',
    description: 'error',
    thumbnail: 'error',
    comics: [],
  };
}
