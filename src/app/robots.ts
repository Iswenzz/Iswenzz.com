import type { MetadataRoute } from "next";

import config from "@/config";

const robots = (): MetadataRoute.Robots => ({
	rules: { userAgent: "*", allow: "/" },
	sitemap: `${config.url}/sitemap.xml`,
	host: config.url
});

export default robots;
