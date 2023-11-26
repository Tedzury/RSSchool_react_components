import MainLayout from '../src/layouts/MainLayout';
import { formatCharListData } from '../src/helpers/formatCharListData';
import { CharCard } from '../src/components/indexComponents';
import { formatCharData } from '../src/helpers/formatCharData';
import constructCharListUrl from '../src/helpers/constructCharListUrl';
import constructSingleCharUrl from '../src/helpers/constructSingleCharUrl';

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
    const charListUrl = constructCharListUrl(name, limit, page);
    const charListResponse = await fetch(charListUrl);
    const charListResult = await charListResponse.json();
    if (charListResult.code !== 200) throw new Error(charListResult.status);
    const totalResults = charListResult.data.total;
    const charListData = formatCharListData(charListResult.data.results);

    const singleCharUrl = constructSingleCharUrl(slug);
    const charResponse = await fetch(singleCharUrl);
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
