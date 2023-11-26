import formatCharOutput from '../../helpers/formatCharOutput';
import CharCardLayout from './ui/CharCardLayout';

export default function CharCard({ charData }) {
  const formattedChar = formatCharOutput(charData);
  return <CharCardLayout char={formattedChar} />;
}
