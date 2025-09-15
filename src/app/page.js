import { generatePageMetadata, pageMetadata } from "../lib/metadata"
import NavbarTop from "./_components/NavbarTop"
import HeroSection from "./_components/HeroSection"
import AboutUs from "./_components/About-Us"
import ServiceCarousel from "./_components/ServiceCarousel"
import Stats from "./_components/Stats"
import TeamSection from "./_components/TeamSection"
import ContactSection from "./_components/ContactUS"
import FooterSection from "./_components/Footer"

export const metadata = generatePageMetadata(pageMetadata.home)

export default function HomePage() {
  return (
    <>
      <NavbarTop />
      <HeroSection />
      <Stats />
      <AboutUs />
      <ServiceCarousel />
      <TeamSection />
      <ContactSection />
      <FooterSection />
    </>
  )
}
