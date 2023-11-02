import { CharObj } from '../../../shared/types';

type PropsType = {
  char: CharObj;
};

export default function CharListItem({ char }: PropsType) {
  const { name, id, thumbnail } = char;
  return (
    <li
      data-id={id}
      className="my-3 flex cursor-pointer items-center justify-center gap-20 rounded-md border-2 border-purple_80 bg-main_bg p-3 font-bold transition-all duration-300 hover:scale-[1.005] hover:bg-accent_40"
    >
      <div className="w-[200px]">
        <img className="rounded-md" src={thumbnail} alt={`${name} image`} />
      </div>
      <h3 className="w-full text-center text-xl">{name}</h3>
    </li>
  );
}
