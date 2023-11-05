import { StateType } from '../../shared/types';

type PropsType = {
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
};

export default function ErrorThrower({ setAppState }: PropsType) {
  return (
    <div className="mt-5 flex justify-center">
      <button
        type="button"
        className="w-[300px] rounded-md bg-blue_20 px-2 py-1 font-bold transition-all duration-300 hover:bg-purple_20"
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
