import { useAppSelector } from '../../../store/hooks';
import { nanoid } from 'nanoid';
import FormListItem from './FormListItem';

export default function FormList() {
  const { formsData } = useAppSelector((state) => state.appReducer);
  const formsList = formsData.map((formData, i) => {
    const animated = i == formsData.length - 1 ? 'animated_card' : '';
    return (
      <FormListItem key={nanoid()} formData={formData} animated={animated} />
    );
  });

  const content =
    formsData.length > 0 ? (
      <ul className="flex flex-col gap-20">{formsList}</ul>
    ) : (
      <p className="text-lg text-accent">No forms completed yet...</p>
    );
  return (
    <section className="w-full px-10">
      <h3 className="mt-10 text-xl text-accent">
        Here are your completed forms:
      </h3>
      <div className="mt-10 flex w-full flex-col items-center">{content}</div>
    </section>
  );
}
