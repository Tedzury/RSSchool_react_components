import NavBlock from './ui/NavBlock';
import MainLayout from '../../layouts/MainLayout';
import Header from './ui/Header';
import FormList from './ui/FormList';

export default function MainPage() {
  return (
    <MainLayout>
      <Header />
      <NavBlock />
      <FormList />
    </MainLayout>
  );
}
