import CharListItem from './ui/CharListItem';
import { Pagination } from '../indexComponents';
import { useRouter } from 'next/router';

export default function CharList({ charListData, totalResults }) {
  const router = useRouter();
  let queryStr = '?';
  for (const [key, value] of Object.entries(router.query)) {
    queryStr += `&${key}=${value}`;
  }
  const elements = charListData.map((char) => {
    return <CharListItem key={char.name} char={char} queryStr={queryStr} />;
  });

  const charList =
    elements?.length > 0 ? (
      <div>
        <ul className="flex flex-col gap-3">{elements}</ul>
        <Pagination totalResults={totalResults} queryStr={queryStr} />
      </div>
    ) : (
      <div className="text-center">Sorry, there is no characters yet!</div>
    );

  return (
    <div className="mx-3 mt-5 flex flex-col gap-5 rounded-md border-4 border-accent_80 bg-main_bg p-3">
      <div className="w-full shrink transition-all duration-300">
        {charList}
      </div>
    </div>
  );
}
