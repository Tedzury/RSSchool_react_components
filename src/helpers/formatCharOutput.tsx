import { CharObj } from '../shared/types';

export default function formatCharOutput(char: CharObj) {
  const { name, description, thumbnail, comics } = char;
  const formatDesc =
    description.length > 0
      ? description
      : 'Sorry, there is no description for that character :(';
  const formatComics =
    comics.length > 0 ? (
      comics
        .filter((_, i) => i < 5)
        .map((comic) => {
          return <li key={comic}>{comic}</li>;
        })
    ) : (
      <li>Sorry, no related comics provided :(</li>
    );
  return {
    name,
    thumbnail,
    description: formatDesc,
    comics: formatComics,
  };
}
