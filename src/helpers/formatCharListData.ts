import { CharObj, responseObj } from '../shared/types';

export function formatCharListData(initData: responseObj[]): CharObj[] {
  return initData.map((char: responseObj) => {
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
  });
}
