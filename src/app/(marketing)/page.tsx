import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Demo from "@/components/landing/Demo";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import CTA from "@/components/landing/CTA";
import { ReaderDemo } from "@/components/library/ReaderDemoTest";

export default function Home() {
  return (
    <div className="flex flex-col w-full flex-1">
      <Hero />
      <HowItWorks />
      <Demo />
      <ReaderDemo />
      <WhyChooseUs />
      <CTA />
    </div>
  );
}