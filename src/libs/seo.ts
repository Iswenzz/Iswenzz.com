import type { Metadata, Viewport } from "next";

import config from "@/config";

export const getSEO = ({
	url,
	title,
	description,
	keywords,
	openGraph,
	extra
}: Config): Metadata => ({
	// 50 characters
	title: title || config.title,
	// 160 characters
	description: description || config.description,
	keywords: keywords || config.keywords,
	applicationName: title || config.title,
	metadataBase: new URL(
		process.env.NODE_ENV === "development" ? "http://localhost:3000/" : config.url
	),
	// app/opengraph-image.jpg 1200x630
	openGraph: {
		title: openGraph?.title || title || config.title,
		description: openGraph?.description || description || config.description,
		url: openGraph?.url || config.url,
		images: "/opengraph-image.jpg",
		locale: "en_US",
		type: "website"
	},
	// app/twitter-image.jpg 1200x630
	twitter: {
		title: openGraph?.title || title || config.title,
		description: openGraph?.description || description || config.description,
		card: "summary_large_image",
		images: "/twittergraph-image.jpg",
		creator: "@AlexisNardiello"
	},
	alternates: {
		canonical: url
	},
	...extra
});

export const getViewport = (): Viewport => ({
	themeColor: config.theme,
	width: "device-width",
	initialScale: 1,
	maximumScale: 2
});

type Config = {
	url: string;
	title: string;
	description?: string;
	keywords?: string[];
	openGraph?: Metadata["openGraph"];
	extra?: Partial<Metadata>;
};
