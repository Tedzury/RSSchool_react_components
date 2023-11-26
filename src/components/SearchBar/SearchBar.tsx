import { useEffect, useState } from 'react';
import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(
    (router.query.name as string) ?? ''
  );
  const limit = router.query.limit ? router.query.limit : 5;
  useEffect(() => {
    setSearchValue((router.query.name as string) ?? '');
  }, [router, setSearchValue]);
  return (
    <div className="mt-5">
      <form
        className="flex justify-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem('reactComponentSearchTerm', searchValue);
          router.push(`?&page=1&limit=${limit}&name=${searchValue}`);
        }}
      >
        <TextInput searchValue={searchValue} setSearchValue={setSearchValue} />
        <SubmitBtn />
      </form>
    </div>
  );
}
