import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';
import { StateType } from '../../types';

type PropsType = {
  value: string;
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
  getCharData: () => Promise<void>;
};

export default function SearchBar({
  value,
  setAppState,
  getCharData,
}: PropsType) {
  return (
    <div className="mt-5">
      <form
        className="flex justify-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          getCharData();
        }}
      >
        <TextInput
          placeholder="Type a name!"
          value={value}
          setAppState={setAppState}
        />
        <SubmitBtn />
      </form>
    </div>
  );
}
