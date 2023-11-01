import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import CharList from '../CharList/CharList';
import ErrorThrower from '../ErrorThrower/ErrorThrower';
import Loader from '../Loader/Loader';
import getCharData from '../../service/getCharData';
import { defaultState } from '../../service/defaultState';

export default function MainLayout() {
  const [appState, setAppState] = useState(defaultState);

  if (appState.isError === true) {
    throw new Error("OMG, you've pressed a button!");
  }

  const { isLoading, charData } = appState;

  useEffect(() => {
    getCharData(
      localStorage.getItem('reactComponentSearchTerm') || '',
      setAppState
    );
  }, []);

  const mainContent = isLoading ? (
    <Loader />
  ) : (
    <CharList characters={charData} />
  );

  return (
    <div className="mx-auto max-w-[700px]">
      <Header />
      <div className="mx-3 mt-6 rounded-md border-4 border-accent_80 bg-main_bg p-2">
        <SearchBar appState={appState} setAppState={setAppState} />
        <ErrorThrower setAppState={setAppState} />
      </div>
      {mainContent}
    </div>
  );
}
