import { NavLink } from 'react-router-dom';

export default function RouteFallback() {
  return (
    <div className="absolute left-0 top-0 flex min-h-full w-full justify-end bg-[#5b5b9b3d]">
      <div className="mx-3 flex w-[500px] items-center justify-center rounded-xl border-2 border-[grey] bg-main_bg p-3 text-center text-lg">
        <div>
          Woooops !
          <br />
          <br />
          No such char!
          <br />
          <br />
          <NavLink
            className="text-xl font-bold text-purple_100 transition-all duration-300 hover:text-blue_100"
            to="/"
          >
            Go to home page
          </NavLink>
        </div>
      </div>
    </div>
  );
}
