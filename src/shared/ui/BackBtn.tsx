import { Link } from 'react-router-dom';
import backIcon from '../../assets/icon/Back_icon.svg';

export default function BackBtn() {
  return (
    <Link
      className="flex w-fit gap-3 rounded-full border-2 border-accent p-2 text-xl text-accent transition-all duration-200 hover:border-accent_yellow hover:text-accent_yellow"
      to="/"
    >
      <img src={backIcon} alt="" />
      <span>Back</span>
    </Link>
  );
}
