import getPaginationMove from '../../helpers/getPaginationMove';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setPage } from '../../store/appStateSlice';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { currPage, totalPages } = useAppSelector((state) => state.appReducer);
  const backDisabled = currPage <= 0;
  const forwardDisabled = currPage >= totalPages;

  function clickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const attr = (e.target as HTMLElement).getAttribute('data-user-action');
    if (attr) {
      const nextPage = getPaginationMove(attr, currPage, totalPages);
      dispatch(setPage(nextPage));
    }
  }
  return (
    <div className="mt-5 text-2xl" onClick={(e) => clickHandler(e)}>
      <div className="mx-auto flex w-[350px] items-center justify-center gap-5 rounded-full bg-purple_40 p-2">
        <button
          disabled={backDisabled}
          data-user-action="first"
          className="w-[45px] rounded-full bg-accent_100 p-2 transition-all duration-300 hover:bg-accent_40 disabled:bg-[grey]"
        >
          &lt;&lt;
        </button>
        <button
          disabled={backDisabled}
          data-user-action="prev"
          className="w-[45px] rounded-full bg-accent_100 p-2 transition-all duration-300 hover:bg-accent_40 disabled:bg-[grey]"
        >
          &lt;
        </button>
        <p className="text-3xl font-bold">{currPage + 1}</p>
        <button
          disabled={forwardDisabled}
          data-user-action="next"
          className="w-[45px] rounded-full bg-accent_100 p-2 transition-all duration-300 hover:bg-accent_40 disabled:bg-[grey]"
        >
          &gt;
        </button>
        <button
          disabled={forwardDisabled}
          data-user-action="last"
          className="w-[45px] rounded-full bg-accent_100 p-2 transition-all duration-300 hover:bg-accent_40 disabled:bg-[grey]"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}
