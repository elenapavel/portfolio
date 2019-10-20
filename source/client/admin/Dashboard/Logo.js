import React, { useContext } from "react";
import { Link } from "@nore/pwa";
import Panel from "$admin/components/Panel";
import $, { css } from "./style.css";

export default () => {
	const dispatch = useContext(Panel.Dispatch);

	return (
		<Link
			to="."
			delay={50}
			label="Ryota"
			class={$.logo}
			onClick={() => dispatch("navigation.close")}
		/>
	);
};
