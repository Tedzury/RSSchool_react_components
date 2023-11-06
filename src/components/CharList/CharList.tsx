import CharListItem from './ui/CharListItem';
import Loader from '../Loader/Loader';
import { Pagination } from '../indexComponents';
import { useContext } from 'react';
import { AppState } from '../../pages/MainLayout';

export default function CharList() {
  const { appState, setAppState } = useContext(AppState);
  const { charData, isLoading, currPage } = appState;
  const elements = charData.map((char) => {
    return <CharListItem key={char.name} char={char} currPage={currPage} />;
  });

  const charList =
    charData.length > 0 ? (
      <div>
        <ul className="flex flex-col gap-3">{elements}</ul>
        <Pagination appState={appState} setAppState={setAppState} />
      </div>
    ) : (
      <div className="text-center">Sorry, there is no characters yet!</div>
    );

  const content = isLoading ? <Loader /> : charList;

  return (
    <div className="mx-3 mt-5 flex flex-col gap-5 rounded-md border-4 border-accent_80 bg-main_bg p-3">
      <div className="w-full shrink transition-all duration-300">{content}</div>
    </div>
  );
}
