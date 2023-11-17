import { useParams } from 'react-router-dom';
import formatSingleCharData from '../../helpers/formatSingleCharData';
import CharCardLayout from './ui/CharCardLayout';
import getCharId from '../../helpers/getCharId';
import { useGetSingleCharQuery } from '../../store/charListApi';
import CharCardLoader from '../CharCardLoader/CharCardLoader';

export default function CharCard() {
  const { id } = useParams();
  const actualId = getCharId(id);
  const { data, isLoading } = useGetSingleCharQuery(actualId);

  if (isLoading) return <CharCardLoader />;
  if (!data) return;
  const { name, description, thumbnail, comics } = data?.data.results[0];
  const char = {
    name,
    id: id as string,
    description,
    thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
    comics: comics.items?.map((comic: { name: string }) => {
      return comic.name;
    }),
  };
  const formattedChar = formatSingleCharData(char);

  return <CharCardLayout char={formattedChar} />;
}
