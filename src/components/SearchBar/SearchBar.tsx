import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';
import { StateType } from '../../shared/types';
import getCharList from '../../service/getCharList';

type PropsType = {
  appState: StateType;
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
};

export default function SearchBar({ appState, setAppState }: PropsType) {
  const { searchValue } = appState;
  return (
    <div className="mt-5">
      <form
        className="flex justify-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          getCharList(searchValue, 0, setAppState);
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
