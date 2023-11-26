import { md5 } from 'js-md5';
import MainLayout from '../src/pages/MainLayout';
import { formatCharListData } from '../src/helpers/formatCharListData';

export default function Index({ data, totalResults }) {
  return (
    <MainLayout charListData={data.charListData} totalResults={totalResults}>
      {null}
    </MainLayout>
  );
}

export const getServerSideProps = async (context) => {
  const { name, limit, page } = context.query;
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
  const apiKey = 'd8fe8823c3b455a867e537974e39cd7e';
  const privateKey = '6e0b591b94e47c782593796d8ba3bf65b24afc84';
  const myLimit = limit ?? '5';
  const myPage = page ?? '1';
  const offset = Number(myLimit) * Number(myPage - 1);
  const ts = Number(new Date());
  const hash = md5.create();
  hash.update(ts + privateKey + apiKey);
  let url = `${baseUrl}?&limit=${myLimit}&offset=${offset}&apikey=${apiKey}&ts=${ts}&hash=${hash}`;
  if (name) {
    url = url + `&name=${name}`;
  }
  const CharListResponse = await fetch(url);
  const result = await CharListResponse.json();
  const totalResults = result.data.total;
  const charListData = formatCharListData(result.data.results);

  return {
    props: { data: { charListData }, totalResults },
  };
};
