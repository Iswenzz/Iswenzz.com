import { FadeIn, SlideIn } from "@/components";

import aion from "../_data/aion.json";
import cod4 from "../_data/cod4.json";
import projects from "../_data/projects.json";

import Project from "./Project";

const items = [...aion, ...cod4, ...projects];

const Projects = () => (
	<FadeIn id="projects" className="relative py-24 px-8">
		<div className="absolute size-1/2 top-20 right-0 blur-[100px] bg-[conic-gradient(from_2.5rad,#ff0042,#0000ff)]" />
		<h2 className="relative pb-16 text-6xl text-gray-300 font-bold tracking-widest">
			<SlideIn>Projects</SlideIn>
		</h2>
		<div className="columns-1 sm:columns-2 xl:columns-3 2xl:columns-4 gap-8">
			{items.map(project => (
				<Project key={project.name} project={project} />
			))}
		</div>
	</FadeIn>
);

export default Projects;
