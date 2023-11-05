import {
  ActionFunctionArgs,
  ParamParseKey,
  Params,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import fetchCharacter from '../../service/fetchCharacter';
import { CharObj } from '../../shared/types';
import Loader from '../Loader/Loader';

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
  const { name, description, thumbnail, comics } = char;
  const formatDesc =
    description.length > 0
      ? description
      : 'Sorry, there is no description for that character :(';
  const navigate = useNavigate();
  const navigation = useNavigation();
  const currPage = localStorage.getItem('reactComponentCurrentPage') || 1;
  const formatComics =
    comics.length > 0 ? (
      comics
        .filter((_, i) => i < 5)
        .map((comic) => {
          return <li key={comic}>{comic}</li>;
        })
    ) : (
      <li>Sorry, no related comics provided :(</li>
    );
  function closeOutlet(target: EventTarget) {
    if (
      (target as HTMLElement).nodeName === 'BUTTON' ||
      (target as HTMLElement).classList.contains('overlay')
    )
      navigate(`/?page=${Number(currPage) + 1}`);
  }

  return navigation.state === 'loading' ? (
    <div className="flex h-full items-center justify-center">
      <Loader />
    </div>
  ) : (
    <div
      onClick={(e) => closeOutlet(e.target)}
      className="overlay absolute left-0 top-0 flex min-h-full w-full justify-end bg-[#5b5b9b3d]"
    >
      <div className="max-w-[500px] bg-main_bg p-3">
        <div className="relative mb-[50px] mt-[323px] rounded-md border-2 border-purple_80 p-3">
          <div className="mt-10 flex justify-center">
            <img className="max-w-[350px] rounded-md" src={thumbnail} alt="" />
          </div>
          <p className="mt-5 text-center text-xl font-bold">{name}</p>
          <p className="mt-5">{formatDesc}</p>
          <p className="mt-5 font-bold">Comics related to character:</p>
          <ul className="mt-5">{formatComics}</ul>
          <button
            onClick={(e) => closeOutlet(e.target)}
            className="absolute right-5 top-5 flex h-5 w-5 items-center justify-center rounded-full p-2 font-bold transition-all duration-300 hover:scale-[1.15] hover:bg-accent_40"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
