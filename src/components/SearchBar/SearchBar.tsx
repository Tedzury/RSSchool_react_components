import { useState } from 'react';
import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(
    (router.query.name as string) ?? ''
  );
  return (
    <div className="mt-5">
      <form
        className="flex justify-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`?name=${searchValue}&page=1`);
        }}
      >
        <TextInput searchValue={searchValue} setSearchValue={setSearchValue} />
        <SubmitBtn />
      </form>
    </div>
  );
}
