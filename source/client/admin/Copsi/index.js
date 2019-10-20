import React, { useContext } from "react";
import { Scope, Link, loadable } from "@nore/pwa";
import $, { css } from "./style.css";

const Contracts = loadable(() => import("./Contracts"));
const Documents = loadable(() => import("./Documents"));

export default () => (
	<>
		<Scope match="contracts" render={Contracts} />
		<Scope match="documents" render={Documents} />

		<Scope.NotMatched>
			<b class={$.container}>
				<b class={$.listing}>
					<Link
						class={$.link}
						to="contracts"
						label="Registrul de evidență al contractelor"
					/>
					<Link
						class={$.link}
						to="documents"
						label="Registrul de evidență al actelor profesionale"
					/>
				</b>
			</b>
		</Scope.NotMatched>
	</>
);
