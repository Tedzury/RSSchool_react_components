export default function MainLayout({ children }: { children: JSX.Element[] }) {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-[1024px] border-l-2 border-r-2 border-accent">
      <article className="px-10 py-10">{children}</article>
    </main>
  );
}
