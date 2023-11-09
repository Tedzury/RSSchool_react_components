import { StateType } from '../../../shared/types';

type PropsType = {
  value: string;
  placeholder: string;
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
};

function TextInput({ value, placeholder, setAppState }: PropsType) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="rounded-md border-[3px] border-purple_40 pl-3 outline-blue_100"
      value={value}
      onChange={(e) =>
        setAppState((prev) => {
          return { ...prev, searchValue: e.target.value };
        })
      }
    />
  );
}

export default TextInput;
