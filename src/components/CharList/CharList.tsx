import CharListItem from './ui/CharListItem';
import { CharObj } from '../../shared/types';
import Loader from '../Loader/Loader';

type PropsType = {
  characters: CharObj[];
  isLoading: boolean;
  currPage: number;
};

export default function CharList({
  characters,
  isLoading,
  currPage,
}: PropsType) {
  const elements = characters.map((char) => {
    return <CharListItem key={char.name} char={char} currPage={currPage} />;
  });

  const charList =
    characters.length > 0 ? (
      <ul className="flex flex-col gap-3">{elements}</ul>
    ) : (
      <div className="text-center">Sorry, there is no characters yet!</div>
    );

  const content = isLoading ? <Loader /> : charList;

  return (
    <div className="mx-3 mt-5 flex gap-5 rounded-md border-4 border-accent_80 bg-main_bg p-3">
      <div className="w-full shrink transition-all duration-300">{content}</div>
    </div>
  );
}
