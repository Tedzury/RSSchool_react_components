import { useParams } from 'react-router-dom';
import formatCharOutput from '../../helpers/formatCharOutput';
import CharCardLayout from './ui/CharCardLayout';
import getCharId from '../../helpers/getCharId';
import { useGetSingleCharQuery } from '../../shared/service/charListApi';
import CharCardLoader from '../CharCardLoader/CharCardLoader';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setDetailsLoading } from '../../store/appStateSlice';

export default function CharCard() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const actualId = getCharId(id);
  const { data, isLoading } = useGetSingleCharQuery(actualId);

  useEffect(() => {
    dispatch(setDetailsLoading(isLoading));
  }, [isLoading, dispatch]);

  if (isLoading) return <CharCardLoader />;
  if (!data) return;
  const formattedChar = formatCharOutput(data);

  return <CharCardLayout char={formattedChar} />;
}
