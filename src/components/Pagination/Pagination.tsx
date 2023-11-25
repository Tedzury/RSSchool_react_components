import getPaginationMove from '../../helpers/getPaginationMove';
import { useRouter } from 'next/router';

export default function Pagination({ totalResults, queryStr }) {
  const router = useRouter();
  const limit = (router.query.limit as string) ?? 5;
  const totalPages = Math.ceil(totalResults / Number(limit));
  const currPage = (router.query.page as string) ?? 1;
  const backDisabled = Number(currPage) <= 1;
  const forwardDisabled = Number(currPage) >= totalPages;
  function clickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const attr = (e.target as HTMLElement).getAttribute('data-user-action');
    if (attr) {
      const nextPage = getPaginationMove(attr, Number(currPage), totalPages);
      const newQuery = router.query.page
        ? queryStr.replace(/page=\d{1,3}/, `page=${nextPage}`)
        : (queryStr += `&page=${nextPage}`);
      router.push(newQuery);
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
        <p className="text-3xl font-bold">{currPage}</p>
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
