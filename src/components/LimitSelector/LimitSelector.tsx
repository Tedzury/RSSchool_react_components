import { StateType } from '../../shared/types';

type PropsType = {
  limit: number;
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
};

export default function LimitSelector({ limit, setAppState }: PropsType) {
  return (
    <label className="flex gap-5 font-bold" htmlFor="limitSelector">
      Select char number/page:
      <select
        id="limitSelector"
        value={limit}
        className="rounded-md"
        onChange={(e) =>
          setAppState((prev) => {
            return { ...prev, limit: Number(e.target.value), currPage: 0 };
          })
        } // ... and update the state variable on any change!
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </label>
  );
}
