import React, { useContext } from "react";
import { Application, Scope, Link, loadable, store } from "@nore/pwa";

const Page = props => {
	const style = {
		background: "#f4f4f4",
		borderRadius: "3px",
		fontSize: "12px",
		fontFamily: "monospace",
		whiteSpace: "pre",
		padding: "1em",
		marginBottom: "2em",
	};

	return <div style={style}>{props.children}</div>;
};

const msg = {
	exact: `<Scope exact>`,
	render: `<Scope render={...}>`,
	nested: `<Scope match="one">
  <Scope match="two">
    <Scope match="three">
      {...}
    </Scope>
  </Scope>
</Scope>`,
	nomatch: `<Scope match="/no/path">
  <Scope.NotMatched>...</Scope.NotMatched>
</Scope>`,
	resource: `<Link to="/resource?id=A12345">...</Link>

<Scope match="/resource" render={({ scope }) => {
  scope.get("url.query") => { id: "A12345" }
}} />`,
	slug: `<Link to="/article/a-random-title">...</Link>

<Scope match="/article" render={({ scope }) => {
  scope.route.split("/").pop() => a-random-title
}} />
`,
	reference: `<Link to="@settings/account/password">...</Link>

<Scope name="settings" match="/client/preferences">
  <Scope match="account/password">Password reset</Scope>
</Scope>
`,
};

const style = {
	display: "block",
};

const links = [
	{ to: "/", label: "prop: exact" },
	{ to: "/render", label: "prop: render" },
	{ to: "/one/two/three", label: "nested" },
	{ to: "/no/path/matched", label: "not matched" },
	{ to: "/resource?id=A12345", label: "url: query" },
	{ to: "/article/the-new-moon", label: "url: slug" },
	{ to: "#internal", label: "internal #hashtag" },
	{ to: "@settings/account/password", label: "internal @reference" },
	{ newtab: 1, to: "/render", label: "internal new tab" },
	{ native: 1, to: store.get("url.path"), label: "native (refresh)" },
	{ native: 1, newtab: 1, to: "https://google.com", label: "native newtab" },
	{ to: "https://google.com", label: "external" },
	{ newtab: 1, to: "https://google.com", label: "external newtab" },
];

const TestScopes = () => (
	<>
		<Scope exact>
			<Page>{msg.exact}</Page>
		</Scope>

		<Scope
			match="/render"
			render={({ scope }) => <Page>{`${msg.render}`}</Page>}
		/>

		<Scope match="one">
			<Scope match="two">
				<Scope match="three">
					<Page>{msg.nested}</Page>
				</Scope>
			</Scope>
		</Scope>

		<Scope match="/no/path">
			<Page>
				<Scope.NotMatched>{msg.nomatch}</Scope.NotMatched>
			</Page>
		</Scope>

		<Scope
			match="/resource"
			render={({ scope }) => <Page>{msg.resource}</Page>}
		/>

		<Scope match="/article" render={({ scope }) => <Page>{msg.slug}</Page>} />

		<Scope match="account/password">
			<Page>{msg.reference}</Page>
		</Scope>
	</>
);

export default () => (
	<Application>
		<Scope name="settings">
			<div style={{ padding: "2rem" }}>
				<TestScopes />

				{links.map((props, key) => (
					<Link {...props} style={style} key={key} />
				))}

				<br />
				<div onClick={() => history.back()}>history: go back</div>
				<div onClick={() => history.forward()}>history: go forward</div>
				<br />
			</div>
		</Scope>
	</Application>
);
