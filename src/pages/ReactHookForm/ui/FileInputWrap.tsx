type PropsType = {
  children: JSX.Element;
  errorMsg: string;
};

export default function FileInputWrap({ children, errorMsg }: PropsType) {
  return (
    <div className="items-centers relative flex p-5">
      <p className="w-[200px] font-bold">Choose image:</p>
      <div className="flex w-full justify-center">{children}</div>
      <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
        {errorMsg}
      </p>
    </div>
  );
}
