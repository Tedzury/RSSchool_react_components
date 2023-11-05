export default function getPaginationMove(
  attr: string,
  currPage: number,
  totalPages: number
) {
  switch (attr) {
    case 'prev':
      return currPage - 1;
    case 'next':
      return currPage + 1;
    case 'last':
      return totalPages;
    default:
      return 0;
  }
}
