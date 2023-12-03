import eyeIcon from '../../assets/icon/eye.svg';

export default function PassTogglerBtn({
  toggleType,
}: {
  toggleType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <button
      type="button"
      className="ml-4 h-6 w-6 pt-2"
      onClick={() => {
        toggleType((prev) => {
          return prev === 'password' ? 'text' : 'password';
        });
      }}
    >
      <img className="w-full" src={eyeIcon}></img>
    </button>
  );
}
