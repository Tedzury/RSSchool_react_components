import { StateType } from '../shared/types';
import fetchCharactersList from './fetchCharactersList';

export default async function updateCharList(
  searchValue: string,
  currPage: number,
  limit: number,
  setAppState: React.Dispatch<React.SetStateAction<StateType>>
) {
  setAppState((prev) => {
    return { ...prev, isLoading: true };
  });
  const offset = limit * currPage;
  const [totalCount, charData] = await fetchCharactersList(
    searchValue.trim(),
    offset,
    limit
  );
  const totalPages = Math.ceil(totalCount / limit) - 1;
  history.pushState({}, '', `?page=${(currPage + 1).toString()}`);
  setAppState((prev) => {
    return { ...prev, isLoading: false, totalPages, charData };
  });
}
