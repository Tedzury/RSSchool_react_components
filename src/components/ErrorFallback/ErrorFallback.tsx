export default function ErrorFallback() {
  return (
    <div className="bg-main-bg flex h-[100dvh] w-full items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="mx-3 max-w-[500px] rounded-xl border-2 border-[grey] bg-main_bg p-3 text-center text-lg">
        Woooops !
        <br />
        <br />
        Something bad have happened :(
        <br />
        <br />
        <a
          className="text-xl font-bold text-purple_100 transition-all duration-300 hover:text-blue_100"
          href="/"
        >
          Go to home page
        </a>
      </div>
    </div>
  );
}
