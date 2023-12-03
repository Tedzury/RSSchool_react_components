type PropsType = {
  children: JSX.Element;
  errorMsg: string;
};

export default function TermsAndCondWrap({ children, errorMsg }: PropsType) {
  return (
    <div className="relative p-5">
      <label htmlFor="acceptInput" className="w-[full] font-bold">
        Accept T&C:
        {children}
      </label>
      <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
        {errorMsg}
      </p>
    </div>
  );
}
