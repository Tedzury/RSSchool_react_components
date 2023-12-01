export default function getTextColor(errorNumb: string) {
  switch (errorNumb) {
    case '3':
      return 'text-[red]';
    case '2':
      return 'text-[orange]';
    case '1':
      return 'text-[yellow]';
    default:
      return 'text-[black]';
  }
}
