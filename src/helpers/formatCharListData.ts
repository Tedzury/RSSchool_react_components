import { CharObj, responseObj } from '../shared/types';

export function formatCharListData(
  initData: responseObj[]
): Partial<CharObj>[] {
  return initData.map((char: responseObj) => {
    const { name, id, thumbnail } = char;
    return {
      name,
      id,
      thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
    };
  });
}
