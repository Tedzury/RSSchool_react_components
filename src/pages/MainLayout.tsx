import { useState, useEffect, createContext } from 'react';
import {
  CharList,
  ErrorThrower,
  Header,
  LimitSelector,
  SearchBar,
} from '../components/indexComponents';
import getCharList from '../service/getCharList';
import { defaultState } from '../shared/constants/constants';
import { Outlet } from 'react-router-dom';
import { StateType } from '../shared/types';

type AppStateType = {
  appState: StateType;
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
};

export const AppState = createContext({} as AppStateType);

export default function MainLayout() {
  const [appState, setAppState] = useState(defaultState);

  if (appState.isError === true) {
    throw new Error("OMG, you've pressed a button!");
  }

  const { currPage, limit } = appState;

  useEffect(() => {
    getCharList(
      localStorage.getItem('reactComponentSearchTerm') || '',
      currPage,
      limit,
      setAppState
    );
    history.pushState({}, '', `page=${(currPage + 1).toString()}`);
  }, [currPage, limit]);

  return (
    <AppState.Provider
      value={{
        appState,
        setAppState,
      }}
    >
      <div className="relative mx-auto flex min-h-fit max-w-[1025px]">
        <div className="w-1/2 grow">
          <Header />
          <div className="mx-3 mt-6 rounded-md border-4 border-accent_80 bg-main_bg p-2">
            <SearchBar />
            <div className="mb-5 flex flex-col items-center gap-5">
              <ErrorThrower setAppState={setAppState} />
              <LimitSelector limit={limit} setAppState={setAppState} />
            </div>
          </div>
          <CharList />
        </div>
        <Outlet />
      </div>
    </AppState.Provider>
  );
}
