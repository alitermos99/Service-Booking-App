'use client'

import Main from "./components/layouts/Main";
import LandingHeader from "./components/landing/LandingHeader";
import LandingFeatureCards from "./components/landing/LandingFeatureCards";
import LandingHeading from "./components/landing/LandingHeading";
import LandingProcessSteps from "./components/landing/LandingProcessSteps";
import LandingCTASection from "./components/landing/LandingCTASection";
import LandingHero from "./components/landing/LandingHero";
import Section from './components/layouts/Section';
import LandingFooter from "./components/landing/LandingFooter";
import { useUser } from "./features/auth/hooks/useUser";
import LoadingOverlay from "./components/ui/LoadingOverlay";

export default function Home() {
	const { data: userObject, isPending } = useUser();
	const user = userObject?.user;

	if(isPending) {
		return <LoadingOverlay />
	}

	return (
		<>
			<LandingHeader user={user} />

			<Main className="overflow-hidden pt-16">
				<LandingHero user={user} />
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
				<LandingCTASection user={user} />
			</Section>

			<LandingFooter />
		</>
	);
}
