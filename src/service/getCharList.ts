import { StateType } from '../shared/types';
import fetchCharactersList from './fetchCharactersList';

export default async function getCharList(
  searchValue: string,
  currPage: number,
  limit: number,
  setAppState: React.Dispatch<React.SetStateAction<StateType>>
) {
  localStorage.setItem('reactComponentSearchTerm', searchValue.trim());
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
  setAppState((prev) => {
    return { ...prev, isLoading: false, totalPages, charData };
  });
}
