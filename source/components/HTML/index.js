import React, { createElement } from "react";

export default function HTML({ children, className }) {
	const attrs = {
		dangerouslySetInnerHTML: { __html: children },
		className,
	};

	return createElement("div", attrs);
}
