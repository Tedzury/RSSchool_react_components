import { CharObj } from '../../shared/types';

type PropsType = {
  char: CharObj;
};

export default function CharListItem({ char }: PropsType) {
  const { name, id, description, thumbnail, comics } = char;
  return (
    <li className="my-3 rounded-md border-2 border-[grey] p-3 font-bold">
      <h3 className="text-xl">{name}</h3>
      <h2 className="mt-2 pl-3 text-lg">Details:</h2>
      <div className="mt-2 flex flex-wrap pl-6">
        <p className="w-full sm:w-1/2">Id: {id}</p>
        <p className="w-full sm:w-1/2">Description: {description}</p>
        <img src={thumbnail} alt="" />
        <p className="w-full sm:w-1/2">Comics: {comics.join(',')}</p>
      </div>
    </li>
  );
}
