import MainLayout from '../src/layouts/MainLayout';
import { formatCharListData } from '../src/helpers/formatCharListData';
import constructCharListUrl from '../src/helpers/constructCharListUrl';

export default function Index({ data, totalResults, error }) {
  return (
    <MainLayout
      charListData={data.charListData}
      totalResults={totalResults}
      error={error}
    >
      {null}
    </MainLayout>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { name, limit, page } = context.query;
    const url = constructCharListUrl(name, limit, page);
    const CharListResponse = await fetch(url);
    const result = await CharListResponse.json();
    if (result.code !== 200) throw new Error(result.status);
    const totalResults = result.data.total;
    const charListData = formatCharListData(result.data.results);
    return {
      props: { data: { charListData }, totalResults, error: false },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: { charListData: [] },
        totalResults: 0,
        error: true,
      },
    };
  }
};
