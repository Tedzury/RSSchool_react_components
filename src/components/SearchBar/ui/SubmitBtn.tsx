export default function SubmitBtn() {
  return (
    <button
      className="
          rounded-md 
          border-[3px] 
          border-purple_40
          bg-main_bg 
          px-2 
          py-1 
          font-bold 
          transition-all 
          duration-300
          hover:bg-accent_40
        "
      type="submit"
    >
      Search
    </button>
  );
}
