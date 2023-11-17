import { createContext } from 'react';
import {
  CharList,
  ErrorThrower,
  Header,
  // LimitSelector,
  // SearchBar,
} from '../components/indexComponents';
import { Outlet, useNavigation } from 'react-router-dom';
import { AppStateType } from '../shared/types';
import CharCardLoader from '../components/CharCardLoader/CharCardLoader';
import { store } from '../store/store';
import { Provider } from 'react-redux';

export const AppState = createContext({} as AppStateType);

export default function MainLayout() {
  const outletWrapper =
    useNavigation().state === 'loading' ? <CharCardLoader /> : <Outlet />;
  return (
    <Provider store={store}>
      <div className="relative mx-auto flex min-h-fit max-w-[1025px]">
        <div className="w-1/2 grow">
          <Header />
          <div className="mx-3 mt-6 rounded-md border-4 border-accent_80 bg-main_bg p-2">
            {/* <SearchBar /> */}
            <div className="mb-5 flex flex-col items-center gap-5">
              <ErrorThrower />
              {/* <LimitSelector limit={limit} setAppState={setAppState} /> */}
            </div>
          </div>
          <CharList />
        </div>
        {outletWrapper}
      </div>
    </Provider>
  );
}
