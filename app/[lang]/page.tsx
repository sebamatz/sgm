import Header from "./components/Header";
import Hero from "./components/hero";
import Services from "./components/services";
import Clients from "./components/clients";
import About from "./components/about";
import Contact from "./components/contact";
import Footer from "./components/footer";
import { translations } from "../lib/translations";

// Next.js 15 requires params to be treated as a Promise
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // Await the promise to get the actual lang value
  const { lang } = await params;

  // Now we can safely lookup the translations
  const t = translations[lang as keyof typeof translations];

  // Safety check: if the language doesn't exist in translations,
  // you might want to handle it or return null
  if (!t) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} translations={t.header} />
      <main>
        <Hero translations={t.hero} />
        <Services lang={lang} translations={t.services} id="services" />
        <Clients translations={t.clients} />
        <About translations={t.about} id="about" />
        <Contact lang={lang} translations={t.contact} id="contact" />
      </main>
      <Footer translations={t.footer} />
    </div>
  );
}
