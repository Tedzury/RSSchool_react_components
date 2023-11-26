import { Dispatch, SetStateAction } from 'react';

type PropsType = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

function TextInput({ searchValue, setSearchValue }: PropsType) {
  return (
    <input
      name="search"
      type="text"
      placeholder="Type a name!"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="rounded-md border-[3px] border-purple_40 pl-3 outline-blue_100"
    />
  );
}

export default TextInput;
