import { useAppSelector } from '../../../store/hooks';
import { nanoid } from 'nanoid';

export default function FormList() {
  const { formsData } = useAppSelector((state) => state.appReducer);
  const formsList = formsData.map(
    ({ name, age, gender, email, password, country, image }, i) => {
      const animated = i == formsData.length - 1 ? 'animated_card' : '';
      return (
        <li
          className={`w-full rounded-lg border-2 border-accent_yellow py-6 text-lg text-accent ${animated}`}
          key={nanoid()}
        >
          <p className="ml-[6rem]">Name: {name}</p>
          <p className="ml-[6rem]">Age: {age}</p>
          <p className="ml-[6rem]">Gender: {gender}</p>
          <p className="ml-[6rem]">Email: {email}</p>
          <p className="ml-[6rem]">Password: {password}</p>
          <p className="ml-[6rem]">Country: {country}</p>
          <p className="mt-5 w-full text-center text-xl">Provided image:</p>
          <img
            className="mx-auto mt-5 w-1/2 rounded-md"
            src={image}
            alt={`${name}`}
          />
        </li>
      );
    }
  );

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
