import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';

type PropsType = {
  value: string;
  setSearch: (value: string) => void;
  getCharData: () => Promise<void>;
};

export default function SearchBar({
  value,
  setSearch,
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
          setSearch={setSearch}
        />
        <SubmitBtn />
      </form>
    </div>
  );
}
