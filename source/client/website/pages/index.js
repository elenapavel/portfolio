import React, { useState } from "react";
import { keys } from "@nore/std/object";
import { Scope, loadable } from "@nore/pwa";
import layouts from "$website/layouts";
import Page from "$website/components/Page";

const NotFound = loadable(() => import("$website/pages/NotFound"));

export default (
	<>
		<Scope exact match="404" render={NotFound} />
		{keys(layouts).map(path => (
			<Scope
				exact
				match={path}
				render={() => <Page layout={layouts[path]} path={path} />}
				key={path}
			/>
		))}

		<Scope.NotMatched render={NotFound} />
	</>
);
