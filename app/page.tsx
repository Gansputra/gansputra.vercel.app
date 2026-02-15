export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold">Gexvex</h1>
        <p className="mt-4 text-lg">
          Creative Editor & Tech Builder
        </p>
      </section>

      {/* AMV SECTION */}
      <section className="py-20 px-10">
        <h2 className="text-3xl font-semibold mb-6">AMV Showcase</h2>
        <p>Coming soon...</p>
      </section>

      {/* PROJECT SECTION */}
      <section className="py-20 px-10">
        <h2 className="text-3xl font-semibold mb-6">Tech Projects</h2>
        <p>Coming soon...</p>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-10">
        <h2 className="text-3xl font-semibold mb-6">Contact</h2>
        <p>Discord / Email / Social Media</p>
      </section>

    </main>
  );
}
