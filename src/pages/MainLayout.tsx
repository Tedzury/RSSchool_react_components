import { useState, useEffect } from 'react';
import {
  CharList,
  ErrorThrower,
  Header,
  LimitSelector,
  Pagination,
  SearchBar,
} from '../components/indexComponents';
import getCharList from '../service/getCharList';
import { defaultState } from '../shared/constants/constants';
import { Outlet } from 'react-router-dom';

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
    <div className="relative mx-auto flex min-h-fit max-w-[1025px]">
      <div className="w-1/2 grow">
        <Header />
        <div className="mx-3 mt-6 rounded-md border-4 border-accent_80 bg-main_bg p-2">
          <SearchBar appState={appState} setAppState={setAppState} />
          <div className="mb-5 flex flex-col items-center gap-5">
            <ErrorThrower setAppState={setAppState} />
            <LimitSelector limit={limit} setAppState={setAppState} />
          </div>
        </div>
        <CharList
          currPage={currPage}
          characters={charData}
          isLoading={isLoading}
        />
        <Pagination appState={appState} setAppState={setAppState} />
      </div>
      <Outlet />
    </div>
  );
}
