import React, { useContext } from "react";
import { Scope, Slot, Link, loadable } from "@nore/pwa";
import onlyAuthenticated from "./onlyAuthenticated.js";
import $, { css } from "./style.css";

const SignIn = loadable(() => import("./SignIn"));
const Dashboard = loadable(() => import("./Dashboard"));
const Pages = loadable(() => import("./Pages"));
const Articles = loadable(() => import("./Articles"));
const PrintTypeform = loadable(() => import("./Typeform/Response"));
const Typeform = loadable(() => import("./Typeform"));
const Copsi = loadable(() => import("./Copsi"));
const Home = () => <h2></h2>;

export default () => (
	<b class={$.container}>
		<Scope match="signin" render={SignIn} />
		<Scope match="print/typeform/response" render={PrintTypeform} />

		<Scope.NotMatched
			render={() =>
				onlyAuthenticated(
					<Dashboard>
						<Scope exact render={Home} />
						<Scope match="pages" render={Pages} />
						<Scope match="articles" render={Articles} />
						<Scope match="typeform" render={Typeform} />
						<Scope match="copsi" render={Copsi} />
					</Dashboard>
				)
			}
		/>
	</b>
);
