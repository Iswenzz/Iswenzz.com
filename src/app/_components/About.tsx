"use client";

import { motion } from "framer-motion";

import { SlideIn } from "@/components/Animations";

const About = () => (
	<motion.section
		id="about"
		className="py-24 px-8 max-w-7xl"
		initial={{ opacity: 0 }}
		whileInView={{ opacity: 1 }}
		transition={{ duration: 0.5, delay: 0.3 }}
	>
		<h2 className="pb-4 text-5xl md:text-6xl text-gray-300 font-bold tracking-widest">
			<SlideIn>Hello there!</SlideIn>
		</h2>
		<h3 className="pt-4 text-2xl md:text-3xl text-gray-500 tracking-wider">
			<SlideIn>
				I&apos;ve experience working on a diverse set of programming topics for the past 9
				years such as software development, web development, database design, graphics
				programming, game development, UI/UX design, and reverse engineering.
			</SlideIn>
		</h3>
	</motion.section>
);

export default About;