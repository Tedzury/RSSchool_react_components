import MainLayout from '../src/layouts/MainLayout';
import { formatCharListData } from '../src/helpers/formatCharListData';
import { md5 } from 'js-md5';
import { CharCard } from '../src/components/indexComponents';
import { formatCharData } from '../src/helpers/formatCharData';
import getCharId from '../src/helpers/getCharId';

export default function DetailsPage({ data, totalResults, error }) {
  return (
    <MainLayout
      charListData={data.charListData}
      totalResults={totalResults}
      error={error}
    >
      <CharCard charData={data.charData} />
    </MainLayout>
  );
}

export const getServerSideProps = async (context) => {
  const { name, limit, page, slug } = context.query;
  try {
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const apiKey = 'd8fe8823c3b455a867e537974e39cd7e';
    const privateKey = '6e0b591b94e47c782593796d8ba3bf65b24afc84';
    const myLimit = limit ?? '5';
    const myPage = page ?? '1';
    const offset = Number(myLimit) * Number(myPage - 1);
    const charListTs = Number(new Date());
    const charListHash = md5.create();
    charListHash.update(charListTs + privateKey + apiKey);
    let charListUrl = `${baseUrl}?&limit=${myLimit}&offset=${offset}&apikey=${apiKey}&ts=${charListTs}&hash=${charListHash}`;
    if (name) {
      charListUrl = charListUrl + `&name=${name}`;
    }
    const charListResponse = await fetch(charListUrl);
    const charListResult = await charListResponse.json();
    if (charListResult.code !== 200) throw new Error(charListResult.status);
    const totalResults = charListResult.data.total;
    const charListData = formatCharListData(charListResult.data.results);

    const charTs = Number(new Date());
    const charHash = md5.create();
    charHash.update(charTs + privateKey + apiKey);
    const actualId = getCharId(slug);
    const charUrl = `${baseUrl}/${actualId}?apikey=${apiKey}&ts=${charTs}&hash=${charHash}`;
    const charResponse = await fetch(charUrl);
    const charResult = await charResponse.json();
    if (charResult.code !== 200) throw new Error(charResult.status);
    const charData = formatCharData(charResult?.data?.results[0]);

    return {
      props: { data: { charListData, charData }, totalResults, error: false },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: { charListData: [], charData: {} },
        totalResults: 0,
        error: true,
      },
    };
  }
};
