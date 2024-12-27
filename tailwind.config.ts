import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const tailwindConfig: Config = {
	plugins: [daisyui],
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx,css}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx,css}"
	],
	daisyui: {
		themes: ["dark", "light"]
	}
};

export default tailwindConfig;
