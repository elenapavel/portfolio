import React, { Component } from "react";
import Member from "./Member";
import Button from "./Button";
import $ from "./style.css";

const components = {
	member: Member,
	register: Button,
};

export default ({ data, heading = null }) => (
	<b className={$.section}>
		<b className={$.heading}>{heading || data.heading}</b>
		<b className={$.content}>
			{data.items.length &&
				data.items.map((item, key) => {
					const Component = components[item.type];

					return (
						<b className={$.item} key={key}>
							{item.type == "member" ? (
								<Component
									avatar={item.avatar}
									name={item.name}
									position={item.position}
								/>
							) : item.type == "register" ? (
								<Component heading={item.heading} />
							) : null}
						</b>
					);
				})}
		</b>
	</b>
);
