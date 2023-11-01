import { StateType } from '../../types';

type PropsType = {
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
};

export default function ErrorThrower({ setAppState }: PropsType) {
  return (
    <div className="mt-5 flex justify-center">
      <button
        type="button"
        className="w-[300px] rounded-md bg-[yellow] px-2 py-1 font-bold"
        onClick={() =>
          setAppState((prev) => {
            return { ...prev, isError: true };
          })
        }
      >
        Throw an error!
      </button>
    </div>
  );
}
