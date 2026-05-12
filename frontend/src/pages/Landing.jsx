import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import AudioDemo from "@/components/sections/AudioDemo";
import Solutions from "@/components/sections/Solutions";
import HowItWorks from "@/components/sections/HowItWorks";
import ROICalculator from "@/components/sections/ROICalculator";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import { DemoModalProvider } from "@/components/LeadFormModal";

export default function Landing() {
  return (
    <DemoModalProvider>
      <main data-testid="landing-page" className="relative">
        <Nav />
        <Hero />
        <AudioDemo />
        <Solutions />
        <HowItWorks />
        <ROICalculator />
        <FAQ />
        <Footer />
      </main>
    </DemoModalProvider>
  );
}
