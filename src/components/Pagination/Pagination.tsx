import { StateType } from '../../shared/types';
import getPaginationMove from '../../helpers/getPaginationMove';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  appState: StateType;
  setAppState: React.Dispatch<React.SetStateAction<StateType>>;
};

export default function Pagination({ appState, setAppState }: PropsType) {
  const { currPage, totalPages } = appState;
  const backDisabled = currPage <= 0;
  const forwardDisabled = currPage >= totalPages;
  const navigation = useNavigate();

  function clickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const attr = (e.target as HTMLElement).getAttribute('data-user-action');
    if (attr) {
      const nextPage = getPaginationMove(attr, currPage, totalPages);
      setAppState((prev) => {
        return { ...prev, currPage: nextPage };
      });
      navigation('/');
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
