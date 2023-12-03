import { useAppSelector } from '../../store/hooks';

export default function CountryList() {
  const { countryList } = useAppSelector((state) => state.appReducer);
  const list = countryList.map((country) => (
    <option key={country} value={country}></option>
  ));

  return <datalist id="countryList">{list}</datalist>;
}
