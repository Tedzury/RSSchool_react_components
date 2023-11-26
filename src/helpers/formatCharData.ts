import { CharObj, responseObj } from '../shared/types';

export function formatCharData(char: responseObj): CharObj {
  const { name, description, thumbnail, comics, id } = char;
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
