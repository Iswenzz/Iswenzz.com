import type { MetadataRoute } from "next";

import config from "@/config";

const sitemap = (): MetadataRoute.Sitemap => [
	{
		url: config.url,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: 1
	}
];

export default sitemap;
