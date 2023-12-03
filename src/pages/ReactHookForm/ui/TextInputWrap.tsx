type PropsType = {
  children: JSX.Element;
  errorMsg: string;
  idFor: string;
  label: string;
};

export default function TextInputWrap({
  children,
  errorMsg,
  idFor,
  label,
}: PropsType) {
  return (
    <div className="items-centers relative flex p-5">
      <label htmlFor={idFor} className="w-[200px] font-bold">
        {label}
      </label>
      {children}
      <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
        {errorMsg}
      </p>
    </div>
  );
}
