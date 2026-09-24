import { FadeIn, SlideIn } from "@/components";

const CAREER_START = 2015;

const About = () => (
	<FadeIn id="about" className="py-24 px-8 max-w-7xl">
		<h2 className="pb-4 text-5xl md:text-6xl text-gray-300 font-bold tracking-widest">
			<SlideIn>Hello there!</SlideIn>
		</h2>
		<h3 className="pt-4 text-2xl md:text-3xl text-gray-500 tracking-wider">
			<SlideIn>
				I’ve experience working on a diverse set of programming topics for the past{" "}
				{new Date().getFullYear() - CAREER_START} years such as software development, web
				development, database design, graphics programming, game development, UI/UX design,
				and reverse engineering.
			</SlideIn>
		</h3>
	</FadeIn>
);

export default About;
