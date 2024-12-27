import type { FC, PropsWithChildren } from "react";

import config from "@/config";
import { getSEO, getViewport } from "@/libs/seo";

import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { roboto } from "./fonts";

import "./globals.css";

export const viewport = getViewport();

export const metadata = getSEO({
	url: "/",
	title: "Iswenzz"
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
	<html lang="en" data-theme={config.theme}>
		<body className={roboto.className}>
			<Navbar />
			{children}
			<Footer />
		</body>
	</html>
);

export default RootLayout;
