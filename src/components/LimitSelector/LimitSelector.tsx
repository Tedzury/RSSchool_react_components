import { useRouter } from 'next/router';

export default function LimitSelector() {
  const router = useRouter();
  return (
    <label className="flex gap-5 font-bold" htmlFor="limitSelector">
      Select char number/page:
      <select
        id="limitSelector"
        className="rounded-md"
        value={router.query.limit ?? 5}
        onChange={(e) => router.replace(`?&page=1&limit=${e.target.value}`)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </label>
  );
}
