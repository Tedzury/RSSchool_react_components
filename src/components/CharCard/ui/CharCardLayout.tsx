import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { useContext } from 'react';
import { AppState } from '../../../pages/MainLayout';

type PropsType = {
  isLoading: boolean;
  char: {
    name: string;
    thumbnail: string;
    description: string;
    comics: JSX.Element | JSX.Element[];
  };
};

export default function CharCardLayout({ isLoading, char }: PropsType) {
  const navigate = useNavigate();
  const { name, description, thumbnail, comics } = char;
  const currPage = useContext(AppState).appState.currPage;

  function closeOutlet(target: EventTarget) {
    if (
      (target as HTMLElement).nodeName === 'BUTTON' ||
      (target as HTMLElement).classList.contains('overlay')
    )
      navigate(`/?page=${currPage + 1}`);
  }
  const content = isLoading ? (
    <div className="flex h-full items-center justify-center">
      <Loader />
    </div>
  ) : (
    <div
      onClick={(e) => closeOutlet(e.target)}
      className="overlay absolute left-0 top-0 flex min-h-full w-full justify-end bg-[#5b5b9b3d]"
    >
      <div className="max-w-[500px] bg-main_bg p-3">
        <div className="relative mb-[50px] mt-[387px] rounded-md border-2 border-purple_80 p-3">
          <div className="mt-10 flex justify-center">
            <img className="max-w-[350px] rounded-md" src={thumbnail} alt="" />
          </div>
          <p className="mt-5 text-center text-xl font-bold">{name}</p>
          <p className="mt-5">{description}</p>
          <p className="mt-5 font-bold">Comics related to character:</p>
          <ul className="mt-5">{comics}</ul>
          <button
            onClick={(e) => closeOutlet(e.target)}
            className="absolute right-5 top-5 flex h-5 w-5 items-center justify-center rounded-full p-2 font-bold transition-all duration-300 hover:scale-[1.15] hover:bg-accent_40"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
  return content;
}
