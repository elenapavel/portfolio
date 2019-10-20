import React, { useContext, useEffect } from "react";
import { Link, Scope } from "@nore/pwa";
import Panel from "../../";
import $, { css } from "./style.css";

const isActive = (scope, link) =>
	link.to.length > 1 && scope.path.indexOf(link.to) === 0;

const Item = ({ to, icon, label, isActive, onClick }) => (
	<Link
		to={to}
		delay={50}
		onClick={onClick}
		class={css("item", { is_active: isActive })}
		label={
			<>
				<b class={$.icon}>{icon}</b>
				<b class={$.label}>{label}</b>
			</>
		}
	/>
);

export default ({ items = [] }) => {
	const scope = useContext(Scope.Context);
	const dispatch = useContext(Panel.Dispatch);

	if (!items.length) return null;

	function onClick() {
		dispatch("navigation.close");
	}

	return (
		<b class={$.menu}>
			{items.map((item, key) =>
				item.divider ? (
					<b class={$.divider} key={key} />
				) : (
					<Item
						{...item}
						isActive={isActive(scope, item)}
						onClick={onClick}
						key={key}
					/>
				)
			)}
		</b>
	);
};
