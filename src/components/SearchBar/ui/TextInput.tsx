type PropsType = {
  value: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

function TextInput({ value, setInputValue }: PropsType) {
  return (
    <input
      type="text"
      placeholder="Type a name!"
      className="rounded-md border-[3px] border-purple_40 pl-3 outline-blue_100"
      value={value}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}

export default TextInput;
