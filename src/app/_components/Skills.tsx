import { FadeIn, SlideIn } from "@/components";

import skills from "../_data/skills.json";

const Skills = () => (
	<FadeIn id="skills" className="py-48 px-8">
		<h2 className="pb-16 text-5xl md:text-6xl text-gray-300 font-bold md:tracking-widest">
			<SlideIn>Technological Skills</SlideIn>
		</h2>
		<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			{skills.map(category => (
				<li key={category.name}>
					<h3 className="text-4xl text-gray-400 font-bold py-4">
						<SlideIn>{category.name}</SlideIn>
					</h3>
					<ul>
						{category.points.map(point => (
							<li key={point}>
								<SlideIn className="text-xl text-gray-500 tracking-widest">
									{point}
								</SlideIn>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	</FadeIn>
);

export default Skills;
