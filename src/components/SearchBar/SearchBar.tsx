import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSearchValue } from '../../store/appStateSlice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.appReducer);
  const [inputValue, setInputValue] = useState(searchValue);
  return (
    <div className="mt-5">
      <form
        className="flex justify-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem('reactComponentSearchTerm', inputValue.trim());
          dispatch(setSearchValue(inputValue));
        }}
      >
        <TextInput value={inputValue} setInputValue={setInputValue} />
        <SubmitBtn />
      </form>
    </div>
  );
}
