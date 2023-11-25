import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const router = useRouter();
  return (
    <div className="mt-5">
      <form
        className="flex justify-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const formProps = Object.fromEntries(formData);
          router.replace(`?name=${formProps.search}&page=1`);
        }}
      >
        <TextInput />
        <SubmitBtn />
      </form>
    </div>
  );
}
