import { FormDataType } from '../../../shared/types';

type PropsType = {
  formData: FormDataType;
  animated: string;
};

export default function FormListItem({ formData, animated }: PropsType) {
  const { name, age, gender, email, password, country, image } = formData;
  return (
    <li
      className={`w-full rounded-lg border-2 border-accent_yellow py-6 text-lg text-accent ${animated}`}
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
