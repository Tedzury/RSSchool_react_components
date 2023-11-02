import CharListItem from './ui/CharListItem';
import { CharObj } from '../../shared/types';

type PropsType = {
  characters: CharObj[];
};

export default function CharList({ characters }: PropsType) {
  const elements = characters.map((char) => {
    return <CharListItem key={char.name} char={char} />;
  });

  const content =
    characters.length > 0 ? (
      <ul>{elements}</ul>
    ) : (
      <div className="text-center">Sorry, there is no characters yet!</div>
    );

  return (
    <div className="mx-3 mt-5 rounded-md border-4 border-accent_80 bg-main_bg p-3">
      {content}
    </div>
  );
}
