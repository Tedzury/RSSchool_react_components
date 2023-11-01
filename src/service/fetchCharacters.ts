import { CharObj } from '../types';

const baseUrl = 'https://swapi.dev/api/people/';

export default async function fetchCharacters(searchQuery: string) {
  const url = searchQuery ? `${baseUrl}?search=${searchQuery}` : baseUrl;
  const res = await fetch(url);
  if (res.ok && res.status === 200) {
    const data = await res.json();
    return data.results.map((char: CharObj) => {
      return {
        name: char.name,
        birth_year: char.birth_year,
        height: char.height,
        mass: char.mass,
        eye_color: char.eye_color,
        skin_color: char.skin_color,
        hair_color: char.hair_color,
      };
    });
  }
  return [];
}
