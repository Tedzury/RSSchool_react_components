import Loader from '../Loader/Loader';

export default function CharCardLoader() {
  return (
    <div
      data-testid="LoaderOverlay"
      className="absolute left-0 top-0 flex min-h-full w-full justify-end bg-[#5b5b9b3d]"
    >
      <div className="flex w-[500px] items-center justify-center bg-main_bg p-3">
        <Loader />
      </div>
    </div>
  );
}
