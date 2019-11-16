import React from "react";
import $ from "./style.css";

export default ({ sections }) => (
	<b className={$.sections}>
		{sections != null &&
			sections.length != 0 &&
			sections.map((section, key) => (
				<b
					className={$.section}
					key={key}
					style={{
						order:
							sections.length % 2
								? key < sections.length / 2 - 1
									? key
									: key - sections.length / 2
								: key <= sections.length / 2 - 1
									? key
									: key - sections.length / 2,
						marginTop:
							key == 0 || key == sections.length / 2 ? 0 : null,
					}}
				>
					<b className={$.section_heading}>{section.heading}</b>
					<b className={$.section_description}>
						{section.description}
					</b>
				</b>
			))}
	</b>
);
