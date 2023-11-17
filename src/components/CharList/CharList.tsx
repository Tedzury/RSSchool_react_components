import CharListItem from './ui/CharListItem';
import Loader from '../Loader/Loader';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useGetCharactersListQuery } from '../../store/charListApi';
import { formatCharListData } from '../../helpers/formatCharListData';
import { setCharList, initListLoading } from '../../store/appStateSlice';
import { useEffect } from 'react';
import { Pagination } from '../indexComponents';

export default function CharList() {
  const dispatch = useAppDispatch();
  const { currPage, searchValue, limit, charData, isListLoading } =
    useAppSelector((state) => state.appReducer);
  const offset = limit * currPage;
  const { data, isLoading } = useGetCharactersListQuery({
    searchValue,
    limit,
    offset,
  });

  useEffect(() => {
    dispatch(initListLoading());
    if (!data) return;
    history.pushState({}, '', `?page=${(currPage + 1).toString()}`);
    const totalPages = Math.ceil(data.data.total / limit) - 1;
    const charData = formatCharListData(data?.data.results);
    dispatch(setCharList({ charData, totalPages }));
  }, [data, dispatch, limit, currPage]);

  if (isLoading) return <Loader />;
  if (isListLoading) return <Loader />;
  if (!data) return;

  const elements = charData.map((char) => {
    return <CharListItem key={char.name} char={char} currPage={currPage} />;
  });

  const charList =
    elements.length > 0 ? (
      <div>
        <ul className="flex flex-col gap-3">{elements}</ul>
        <Pagination />
      </div>
    ) : (
      <div className="text-center">Sorry, there is no characters yet!</div>
    );

  return (
    <div className="mx-3 mt-5 flex flex-col gap-5 rounded-md border-4 border-accent_80 bg-main_bg p-3">
      <div className="w-full shrink transition-all duration-300">
        {charList}
      </div>
    </div>
  );
}
