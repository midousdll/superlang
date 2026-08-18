import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/Demo";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <Hero />
      <HowItWorks />
      <Demo />
      <WhyChooseUs />
      <CTA />
    </div>
  );
}