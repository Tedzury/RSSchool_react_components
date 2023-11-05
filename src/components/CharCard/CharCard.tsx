import {
  ActionFunctionArgs,
  ParamParseKey,
  Params,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import fetchCharacter from '../../service/fetchCharacter';
import { CharObj } from '../../shared/types';
import formatSingleCharData from '../../helpers/formatSingleCharData';
import CharCardLayout from './ui/CharCardLayout';

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
  const formattedChar = formatSingleCharData(char);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return <CharCardLayout isLoading={isLoading} char={formattedChar} />;
}
