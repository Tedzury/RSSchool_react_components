const idRegEx = /id=(\d*)/i;

export default function getCharId(identidier: string | undefined) {
  if (identidier) {
    const actualId = (identidier.match(idRegEx) as RegExpMatchArray)[1];
    return Number(actualId);
  }
  return 1;
}
