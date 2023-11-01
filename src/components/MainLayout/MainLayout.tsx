import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import getCharacters from '../../service/getCharacters';
import CharList from '../CharList/CharList';
import ErrorThrower from '../ErrorThrower/ErrorThrower';
import Loader from '../Loader/Loader';
import { CharObj } from '../../types';

export default function MainLayout() {
  const [appState, setAppState] = useState({
    searchValue: localStorage.getItem('reactComponentSearchTerm') || '',
    isError: false,
    charData: [] as CharObj[],
    isLoading: false,
  });

  async function getCharData() {
    setAppState((prev) => {
      return { ...prev, isLoading: true };
    });
    const charData = await getCharacters(appState.searchValue.trim());
    localStorage.setItem(
      'reactComponentSearchTerm',
      appState.searchValue.trim()
    );
    setAppState((prev) => {
      return { ...prev, isLoading: false, charData };
    });
  }

  if (appState.isError === true) {
    throw new Error("OMG, you've pressed a button!");
  }

  useEffect(() => {
    getCharData();
  }, []);

  const mainContent = appState.isLoading ? (
    <Loader />
  ) : (
    <CharList characters={appState.charData} />
  );

  return (
    <div className="mx-auto max-w-[700px]">
      <Header />
      <div className="mx-3 mt-6 rounded-md border-4 border-[white] bg-[#e8e6e6] p-2">
        <SearchBar
          value={appState.searchValue}
          setAppState={setAppState}
          getCharData={getCharData}
        />
        <ErrorThrower setAppState={setAppState} />
      </div>
      {mainContent}
    </div>
  );
}
