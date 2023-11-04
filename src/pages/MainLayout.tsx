import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import CharList from '../components/CharList/CharList';
import ErrorThrower from '../components/ErrorThrower/ErrorThrower';
import getCharList from '../service/getCharList';
import { defaultState } from '../shared/constants/constants';
import Pagination from '../components/Pagination/Pagination';

export default function MainLayout() {
  const [appState, setAppState] = useState(defaultState);

  if (appState.isError === true) {
    throw new Error("OMG, you've pressed a button!");
  }

  const { isLoading, charData, currPage, limit } = appState;

  useEffect(() => {
    getCharList(
      localStorage.getItem('reactComponentSearchTerm') || '',
      currPage,
      limit,
      setAppState
    );
    localStorage.setItem('reactComponentCurrentPage', currPage.toString());
    history.pushState({}, '', `page=${(currPage + 1).toString()}`);
  }, [currPage, limit]);

  return (
    <div className="mx-auto max-w-[1025px]">
      <Header />
      <div className="mx-3 mt-6 rounded-md border-4 border-accent_80 bg-main_bg p-2">
        <SearchBar appState={appState} setAppState={setAppState} />
        <ErrorThrower setAppState={setAppState} />
      </div>
      <CharList
        currPage={currPage}
        characters={charData}
        isLoading={isLoading}
      />
      <Pagination appState={appState} setAppState={setAppState} />
    </div>
  );
}
