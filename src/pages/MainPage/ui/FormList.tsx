import { useAppSelector } from '../../../store/hooks';

export default function FormList() {
  const { formsData } = useAppSelector((state) => state.appReducer);
  const content =
    formsData.length > 0 ? (
      <div>Here is form data</div>
    ) : (
      <div className="text-lg text-accent">No forms filled yet...</div>
    );
  return (
    <section className="px-10">
      <h3 className="mt-10 text-xl text-accent">Here is your filled forms:</h3>
      <div className="mt-10 flex flex-col items-center">{content}</div>
      <button onClick={() => console.log(formsData)}>Show data</button>
    </section>
  );
}
