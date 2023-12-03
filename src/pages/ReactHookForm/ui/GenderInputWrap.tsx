type PropsType = {
  children: JSX.Element[];
  errorMsg: string;
};

export default function GenderInputWrap({ children, errorMsg }: PropsType) {
  return (
    <div className="items-centers relative flex p-5">
      <p className="w-[200px] font-bold">Gender:</p>
      <div className="flex flex-grow py-1">
        <label
          htmlFor="genderMale"
          className="flex w-1/2 items-center justify-center gap-5"
        >
          Male:
          {children[0]}
        </label>
        <label
          htmlFor="genderFemale"
          className="flex w-1/2 items-center justify-center gap-5"
        >
          Female:
          {children[1]}
        </label>
      </div>
      <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
        {errorMsg}
      </p>
    </div>
  );
}
