import { Link } from 'react-router-dom';

export default function NavBlock() {
  return (
    <nav>
      <ul className="mt-10 flex gap-5">
        <li className="h-fit w-1/2">
          <Link
            className="
                inline-block 
                w-full 
                rounded-md 
                border-2 
                border-accent 
                py-1 
                text-center 
                text-lg 
                text-accent 
                transition-all 
                duration-200 
                hover:border-accent_yellow 
                hover:text-accent_yellow
              "
            to="/native_form"
          >
            Native form
          </Link>
        </li>
        <li className="w-1/2">
          <Link
            className="
                inline-block 
                w-full 
                rounded-md 
                border-2 
                border-accent 
                py-1 
                text-center 
                text-lg 
                text-accent 
                transition-all 
                duration-200 
                hover:border-accent_yellow 
                hover:text-accent_yellow"
            to="/react_hook_form"
          >
            React hook form
          </Link>
        </li>
      </ul>
    </nav>
  );
}
