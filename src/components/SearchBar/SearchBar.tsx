import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';
import { StateType } from '../../shared/types';
import getCharList from '../../service/getCharList';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  appState: StateType;
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
};

export default function SearchBar({ appState, setAppState }: PropsType) {
  const { searchValue, limit, currPage } = appState;
  const navigation = useNavigate();
  return (
    <div className="mt-5">
      <form
        className="flex justify-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          setAppState((prev) => {
            return { ...prev, currPage: 0 };
          });
          getCharList(searchValue, currPage, limit, setAppState);
          navigation('/?page=1');
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
