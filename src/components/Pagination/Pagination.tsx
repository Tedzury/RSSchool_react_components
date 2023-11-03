import { StateType } from '../../shared/types';
import getPaginationMove from '../../helpers/getPaginationMove';

type PropsType = {
  appState: StateType;
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
};

export default function Pagination({ appState, setAppState }: PropsType) {
  const { currPage, totalPages } = appState;
  const backDisabled = currPage <= 0;
  const forwardDisabled = currPage >= totalPages;

  function clickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const attr = (e.target as HTMLElement).getAttribute('data-user-action');
    if (attr) {
      const nextPage = getPaginationMove(attr, currPage, totalPages);
      setAppState((prev) => {
        return { ...prev, currPage: nextPage };
      });
    }
  }
  return (
    <div className="flex justify-between" onClick={(e) => clickHandler(e)}>
      <button
        disabled={backDisabled}
        data-user-action="first"
        className="bg-accent_100 p-2 disabled:bg-[grey]"
      >
        First
      </button>
      <button
        disabled={backDisabled}
        data-user-action="prev"
        className="bg-accent_100 p-2 disabled:bg-[grey]"
      >
        Prev
      </button>
      <p>{currPage + 1}</p>
      <button
        disabled={forwardDisabled}
        data-user-action="next"
        className="bg-accent_100 p-2 disabled:bg-[grey]"
      >
        Next
      </button>
      <button
        disabled={forwardDisabled}
        data-user-action="last"
        className="bg-accent_100 p-2 disabled:bg-[grey]"
      >
        Last
      </button>
    </div>
  );
}
