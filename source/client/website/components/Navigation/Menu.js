import React, { useContext, useRef } from "react";
import { Link, Scope } from "@nore/pwa";
import useOnEscOrOutsideClick from "~/client/hooks/useOnEscOrOutsideClick";
import { State, Dispatch } from "$website";
import $, { css } from "./style.css";

const isActive = (scope, link) =>
	link.to.length > 1 && scope.route.indexOf(link.to) === 0;

export default function Menu({ items = [] }) {
	const scope = useContext(Scope.Context);
	const dispatch = useContext(Dispatch);
	const state = useContext(State);
	const ref = useRef(null);

	const { isVisible, isMobile } = state.navigation;
	const closeNavigation = () => dispatch("navigation.close");

	useOnEscOrOutsideClick(ref, isVisible, closeNavigation);

	if (!items.length) return null;

	return (
		<b ref={ref} class={css("menu", { is_visible: isVisible })}>
			{items.map((item, key) =>
				item.divider ? (
					<b class={$.menu_divider} key={key} />
				) : (
					<Link
						to={item.to}
						delay={isMobile ? 100 : 0}
						onClick={closeNavigation}
						class={css("menu_item", { is_active: isActive(scope, item) })}
						label={item.label}
						key={key}
					/>
				)
			)}
		</b>
	);
}
