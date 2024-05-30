"use client";
import { ContactUs } from "@/components/ContactUs/ContactUs";
import { Faq } from "@/components/FAQ/Faq";
import { Features } from "@/components/Features/Features";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Faq />
      <ContactUs />
      <Footer />
    </>
  );
}
