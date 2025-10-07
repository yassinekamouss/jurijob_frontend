import React from "react";
import Header from "@components/Header";
import Hero from "@components/Hero";
import HowItWorks from "@components/HowItWorks";
import WhyChooseUs from "@components/WhyChooseUs";
import Testimonials from "@components/Testimonials";
import Pricing from "@components/Pricing";
import About from "@components/About";
import CallToAction from "@components/CallToAction";
import Footer from "@components/Footer";

// Static Site Generation
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <About />
      <CallToAction />
      <Footer />
    </>
  );
}

// Force static generation
export const dynamic = 'force-static';