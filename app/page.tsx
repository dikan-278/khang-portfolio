import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WorkedWith from "@/components/WorkedWith";
import CaseStudies from "@/components/CaseStudies";
import Approach from "@/components/Approach";
import AiWorkflow from "@/components/AiWorkflow";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import StatCards from "@/components/StatCards";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <WorkedWith />
        <Skills />
        <CaseStudies />
        <Approach />
        <AiWorkflow />
        <Experience />
        <StatCards />
        <Contact />
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
