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
import getCharId from '../../helpers/getCharId';

const Paths = {
  todoDetail: '/:id',
} as const;

interface TodoLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.todoDetail>>;
}

export async function loader({ params }: TodoLoaderArgs) {
  const id = getCharId(params.id);
  return await fetchCharacter(id);
}

export default function CharCard() {
  const char = useLoaderData() as CharObj;
  const formattedChar = formatSingleCharData(char);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return <CharCardLayout isLoading={isLoading} char={formattedChar} />;
}
