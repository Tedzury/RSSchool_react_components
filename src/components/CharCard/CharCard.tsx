import {
  ActionFunctionArgs,
  ParamParseKey,
  Params,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import fetchCharacter from '../../service/fetchCharacter';
import { CharObj } from '../../shared/types';

const Paths = {
  todoDetail: '/:id',
} as const;

interface TodoLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.todoDetail>>;
}

const idRegEx = /id=(\d*)/i;

export async function loader({ params }: TodoLoaderArgs) {
  const test = params.id;

  const actualId = ((test as string).match(idRegEx) as RegExpMatchArray)[1];
  const char = await fetchCharacter(actualId);
  return char;
}

export default function CharCard() {
  const char = useLoaderData() as CharObj;
  const { name, id, description, thumbnail, comics } = char;
  const navigation = useNavigate();
  const currPage = localStorage.getItem('reactComponentCurrentPage') || 1;
  return (
    <div>
      <div>
        <img src={thumbnail} alt="" />
      </div>
      <p>{name}</p>
      <p>{id}</p>
      <p>{description}</p>
      <p>{comics.join(', ')}</p>
      <button
        onClick={() => navigation(`/?page=${Number(currPage) + 1}`)}
        className="border-2 border-purple_100 p-2"
      >
        Close me
      </button>
    </div>
  );
}
