export default function getTextColor(errorNumb: string) {
  switch (errorNumb) {
    case '3':
      return 'text-[red]';
    case '2':
      return 'text-[orange]';
    default:
      return 'text-accent_yellow';
  }
}
