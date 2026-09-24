import type { KeyboardEvent } from "react";

export const buttonProps = (onActivate: () => void) => ({
	role: "button",
	tabIndex: 0,
	onClick: onActivate,
	onKeyDown: (event: KeyboardEvent) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		onActivate();
	}
});
