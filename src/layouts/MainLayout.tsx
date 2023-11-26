import {
  CharList,
  ErrorThrower,
  Header,
  LimitSelector,
  SearchBar,
  ErrorFallback,
} from '../components/indexComponents';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MainLayout({
  charListData,
  totalResults,
  children,
  error,
}) {
  const router = useRouter();
  useEffect(() => {
    if (Object.entries(router.query).length < 3) {
      const search = localStorage.getItem('reactComponentSearchTerm') || '';
      router.push(`?&page=1&limit=5&name=${search}`);
    }
  }, [router]);
  if (error) return <ErrorFallback />;
  return (
    <div className="relative mx-auto flex min-h-fit max-w-[1025px]">
      <div className="w-1/2 grow">
        <Header />
        <div className="mx-3 mt-6 rounded-md border-4 border-accent_80 bg-main_bg p-2">
          <SearchBar />
          <div className="mb-5 flex flex-col items-center gap-5">
            <ErrorThrower />
            <LimitSelector />
          </div>
        </div>
        <CharList charListData={charListData} totalResults={totalResults} />
      </div>
      {children}
    </div>
  );
}
