"use client";

import { FC, PropsWithChildren } from "react";
import { MotionConfig } from "framer-motion";

const MotionProvider: FC<PropsWithChildren> = ({ children }) => (
	<MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default MotionProvider;
