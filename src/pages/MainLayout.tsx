import { useState, useEffect, createContext } from 'react';
import {
  CharList,
  ErrorThrower,
  Header,
  LimitSelector,
  SearchBar,
} from '../components/indexComponents';
import updateCharList from '../service/updateCharList';
import { defaultState } from '../shared/constants/constants';
import { Outlet, useNavigation } from 'react-router-dom';
import { StateType } from '../shared/types';
import CharCardLoader from '../components/CharCardLoader/CharCardLoader';

type AppStateType = {
  appState: StateType;
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
};

export const AppState = createContext({} as AppStateType);

export default function MainLayout() {
  const [appState, setAppState] = useState(defaultState);

  const { searchValue, currPage, limit } = appState;

  useEffect(() => {
    updateCharList(searchValue, currPage, limit, setAppState);
  }, [searchValue, currPage, limit]);

  const outletWrapper =
    useNavigation().state === 'loading' ? <CharCardLoader /> : <Outlet />;

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
              <ErrorThrower />
              <LimitSelector limit={limit} setAppState={setAppState} />
            </div>
          </div>
          <CharList />
        </div>
        {outletWrapper}
      </div>
    </AppState.Provider>
  );
}
