import { FadeIn, Glow, SlideIn } from "@/components";

import levels from "../_data/levels.json";

import Level from "./Level";

// Rows alternate wide/narrow and narrow/wide on a 5-column grid.
const rows = Array.from({ length: Math.ceil(levels.length / 2) }, (_, i) => ({
	left: levels[i * 2],
	right: levels[i * 2 + 1],
	wideLeft: i % 2 === 0
}));

const span = (wide: boolean) => (wide ? "md:col-span-3" : "md:col-span-2");
const sizes = (wide: boolean) =>
	wide ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 40vw, 100vw";

const Levels = () => (
	<FadeIn id="levels" className="relative py-24 px-8">
		<Glow className="left-0" />
		<h2 className="relative pb-16 text-5xl md:text-6xl text-gray-300 font-bold tracking-widest">
			<SlideIn>Level Design</SlideIn>
		</h2>
		{rows.map(({ left, right, wideLeft }) => (
			<div key={left.name} className="grid md:grid-cols-5 md:gap-8">
				<div className={`grid ${span(wideLeft)}`}>
					<Level level={left} sizes={sizes(wideLeft)} />
				</div>
				{right && (
					<div className={`grid ${span(!wideLeft)}`}>
						<Level level={right} sizes={sizes(!wideLeft)} />
					</div>
				)}
			</div>
		))}
	</FadeIn>
);

export default Levels;
