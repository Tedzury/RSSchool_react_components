type PropsType = {
  setError: () => void;
};

export default function ErrorThrower({ setError }: PropsType) {
  return (
    <div className="mt-5 flex justify-center">
      <button
        type="button"
        className="w-[300px] rounded-md bg-[yellow] px-2 py-1 font-bold"
        onClick={setError}
      >
        Throw an error!
      </button>
    </div>
  );
}
