import Header from "./components/header";
import Hero from "./components/hero";
import WorkedWith from "./components/worked-with";
import Services from "./components/services";
import AIAgents from "./components/ai-agents";
import Clients from "./components/clients";
import About from "./components/about";
import Contact from "./components/contact";
import Footer from "./components/footer";
import StructuredData from "./components/structured-data";
import { translations } from "../lib/translations";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const t = translations[lang as keyof typeof translations];

  if (!t) return null;

  return (
    <>
      <StructuredData lang={lang} />
      <div className="min-h-screen flex flex-col">
        <Header lang={lang} translations={t.header} />
        <main>
          <Hero translations={t.hero} />
          <WorkedWith translations={t.workedWith} />
          <Services lang={lang} translations={t.services} id="services" />
          <AIAgents translations={t.aiAgents} id="ai-agents" />
          <Clients translations={t.projects} />
          <About translations={t.about} id="about" />
          <Contact lang={lang} translations={t.contact} id="contact" />
        </main>
        <Footer lang={lang} translations={t.footer} headerTranslations={t.header} />
      </div>
    </>
  );
}
