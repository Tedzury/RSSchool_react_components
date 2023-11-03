import CharListItem from './ui/CharListItem';
import { CharObj } from '../../shared/types';
import Loader from '../Loader/Loader';

type PropsType = {
  characters: CharObj[];
  isLoading: boolean;
};

export default function CharList({ characters, isLoading }: PropsType) {
  const elements = characters.map((char) => {
    return <CharListItem key={char.name} char={char} />;
  });

  const charList =
    characters.length > 0 ? (
      <ul>{elements}</ul>
    ) : (
      <div className="text-center">Sorry, there is no characters yet!</div>
    );

  const content = isLoading ? <Loader /> : charList;

  return (
    <div className="mx-3 mt-5 rounded-md border-4 border-accent_80 bg-main_bg p-3">
      {content}
    </div>
  );
}
