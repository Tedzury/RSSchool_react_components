import {
  CharList,
  ErrorThrower,
  Header,
  LimitSelector,
  SearchBar,
} from '../components/indexComponents';

export default function MainLayout({ charListData, totalResults, children }) {
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
