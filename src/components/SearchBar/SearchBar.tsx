import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';
import { useContext, useState } from 'react';
import { AppState } from '../../pages/MainLayout';

export default function SearchBar() {
  const { appState, setAppState } = useContext(AppState);
  const { searchValue } = appState;
  const [inputValue, setInputValue] = useState(searchValue);
  return (
    <div className="mt-5">
      <form
        className="flex justify-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem('reactComponentSearchTerm', inputValue.trim());
          setAppState((prev) => {
            return { ...prev, currPage: 0, searchValue: inputValue };
          });
        }}
      >
        <TextInput value={inputValue} setInputValue={setInputValue} />
        <SubmitBtn />
      </form>
    </div>
  );
}
