import { CharObj } from '../../../shared/types';
import { NavLink } from 'react-router-dom';

type PropsType = {
  char: CharObj;
  currPage: number;
};

export default function CharListItem({ char, currPage }: PropsType) {
  const { name, id, thumbnail } = char;

  return (
    <li data-id={id}>
      <NavLink to={`/page=${currPage + 1}&id=${id}`}>
        <div className="flex cursor-pointer items-center justify-center gap-5 rounded-md border-2 border-purple_80 bg-main_bg p-3 font-bold transition-all duration-300 hover:scale-[1.005] hover:bg-accent_40">
          <div className="w-[200px] min-w-[90px]">
            <img
              className="w-full rounded-md"
              src={thumbnail}
              alt={`${name} image`}
            />
          </div>
          <h3 className="text-md w-full text-center lg:text-lg">{name}</h3>
        </div>
      </NavLink>
    </li>
  );
}
