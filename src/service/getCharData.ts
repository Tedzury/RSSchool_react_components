import { StateType } from '../shared/types';
import fetchCharacters from './fetchCharacters';

export default async function getCharData(
  searchValue: string,
  setAppState: React.Dispatch<React.SetStateAction<StateType>>
) {
  setAppState((prev) => {
    return { ...prev, isLoading: true };
  });
  const charData = await fetchCharacters(searchValue.trim());
  localStorage.setItem('reactComponentSearchTerm', searchValue.trim());
  setAppState((prev) => {
    return { ...prev, isLoading: false, charData };
  });
}
