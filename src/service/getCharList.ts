import { StateType } from '../shared/types';
import fetchCharactersList from './fetchCharactersList';
import { limit } from '../shared/constants/constants';

export default async function getCharList(
  searchValue: string,
  currPage: number,
  setAppState: React.Dispatch<React.SetStateAction<StateType>>
) {
  setAppState((prev) => {
    return { ...prev, isLoading: true };
  });
  const offset = limit * currPage;
  const [totalCount, charData] = await fetchCharactersList(
    searchValue.trim(),
    offset.toString()
  );
  const totalPages = Math.ceil(totalCount / limit);
  localStorage.setItem('reactComponentSearchTerm', searchValue.trim());
  setAppState((prev) => {
    return { ...prev, isLoading: false, totalPages, charData };
  });
}
