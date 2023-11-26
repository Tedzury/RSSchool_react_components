import { useRouter } from 'next/router';

export default function CharCardLayout({ char }) {
  const router = useRouter();
  const { name, description, thumbnail, comics } = char;

  function closeOutlet(target: EventTarget) {
    if (
      (target as HTMLElement).nodeName === 'BUTTON' ||
      (target as HTMLElement).getAttribute('data-testid') === 'overlay'
    )
      router.back();
  }
  return (
    <div
      onClick={(e) => closeOutlet(e.target)}
      data-testid="overlay"
      className="absolute left-0 top-0 flex min-h-full w-full justify-end bg-[#5b5b9b3d]"
    >
      <div className="max-w-[500px] bg-main_bg p-3">
        <div className="relative mb-[50px] mt-[387px] rounded-md border-2 border-purple_80 p-3">
          <div className="mt-10 flex justify-center">
            <img
              className="max-w-[350px] rounded-md"
              src={thumbnail}
              alt={`Picture of ${name}`}
            />
          </div>
          <h2 className="mt-5 text-center text-xl font-bold">{name}</h2>
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
}
