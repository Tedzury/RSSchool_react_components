import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';
import updateCharList from '../../service/updateCharList';
import { useContext } from 'react';
import { AppState } from '../../pages/MainLayout';

export default function SearchBar() {
  const { appState, setAppState } = useContext(AppState);
  const { searchValue, limit, currPage } = appState;
  return (
    <div className="mt-5">
      <form
        className="flex justify-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          setAppState((prev) => {
            return { ...prev, currPage: 0 };
          });
          updateCharList(searchValue, currPage, limit, setAppState);
        }}
      >
        <TextInput
          placeholder="Type a name!"
          value={searchValue}
          setAppState={setAppState}
        />
        <SubmitBtn />
      </form>
    </div>
  );
}
