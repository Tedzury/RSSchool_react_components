import Link from 'next/link';
export default function () {
  return (
    <div className="flex min-h-full w-full items-center justify-center bg-[#5b5b9b3d]">
      <div className="flex h-fit w-[500px] items-center justify-center rounded-xl border-2 border-[grey] bg-main_bg p-3 py-10 text-center text-lg">
        <div>
          Woooops !
          <br />
          <br />
          404 page!
          <br />
          <br />
          No such char!
          <br />
          <br />
          <Link
            className="text-xl font-bold text-purple_100 transition-all duration-300 hover:text-blue_100"
            href="/"
          >
            Go to home page
          </Link>
        </div>
      </div>
    </div>
  );
}
