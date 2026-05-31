import Main from "./components/layouts/Main";
import LandingHeader from "./components/landing/LandingHeader";
import LandingFeatureCards from "./components/landing/LandingFeatureCards";
import LandingHeading from "./components/landing/LandingHeading";
import LandingProcessSteps from "./components/landing/LandingProcessSteps";
import CTASection from "./components/landing/CTASection";
import LandingHero from "./components/landing/LandingHero";
import Section from './components/layouts/Section';
import LandingFooter from "./components/landing/LandingFooter";

export default function Home() {
	return (
		<>
			<LandingHeader />

			<Main className="overflow-hidden pt-16">
				<LandingHero />
			</Main>

			<Section id="features">
				<LandingHeading 
					title="features"
					description="Everything you need to run bookings"
				/>

				<LandingFeatureCards />
			</Section>

			<Section id="how" maxWidth="max-w-full" style={{ background: 'rgba(17,17,24,0.3)' }}>
				<LandingHeading 
					title="How it works"
					description="Three steps to running your bookings"
				/>

				<LandingProcessSteps />
			</Section>

			<Section maxWidth="max-w-3xl">
				<CTASection />
			</Section>

			<LandingFooter />
		</>
	);
}
