import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLimit } from '../../store/appStateSlice';

export default function LimitSelector() {
  const dispatch = useAppDispatch();
  const { limit } = useAppSelector((state) => state.appReducer);
  return (
    <label className="flex gap-5 font-bold" htmlFor="limitSelector">
      Select char number/page:
      <select
        id="limitSelector"
        value={limit}
        className="rounded-md"
        onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </label>
  );
}
