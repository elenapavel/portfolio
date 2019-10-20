import React, { Component } from "react";
import { Link } from "@nore/pwa";
import Button from "~/components/Button";
import $, { css } from "./style.css";

const Group = ({ title, children }) => (
	<b class={$.group}>
		<b class={$.group_title}>{title}</b>
		<b class={$.group_content}>{children}</b>
	</b>
);

export default () => (
	<b class={$.container}>
		<b class={$.title}>Buttons</b>

		<p>
			Buttons are generally used for interface actions. Suitable for all-purpose
			use. Defaults to primary call-to-action appearance.
		</p>

		<b id="internal" class={$.heading}>
			Primary button
		</b>

		<p>Should be used for main call-to-action on a page.</p>

		<Group title="flat">
			<Button type="flat" label="normal" />
			<Button type="flat" label="hovered" hovered />
			<Button type="flat" label="active" active />
			<Button type="flat" label="focused" focused />
			<Button type="flat" label="disabled" disabled />
		</Group>

		<Group title="default">
			<Button type="default" label="normal" />
			<Button type="default" label="hovered" hovered />
			<Button type="default" label="active" active />
			<Button type="default" label="focused" focused />
			<Button type="default" label="disabled" disabled />
		</Group>

		<Group title="raised">
			<Button type="raised" label="normal" />
			<Button type="raised" label="hovered" hovered />
			<Button type="raised" label="active" active />
			<Button type="raised" label="focused" focused />
			<Button type="raised" label="disabled" disabled />
		</Group>

		<Group title="size">
			<Button label="micro" size="micro" />
			<Button label="small" size="small" />
			<Button label="medium" size="medium" />
			<Button label="large" size="large" />
			<Button label="huge" size="huge" />
		</Group>

		<Group title="shape">
			<Button label="sharp" shape="sharp" size="large" />
			<Button label="round" shape="round" size="large" />
			<Button label="pill" shape="pill" size="large" />
			<Button shape="circle" size="large">
				<b style={{ width: 18, lineHeight: "18px" }}>✖</b>
			</Button>
		</Group>

		<Group title="events">
			<Button label="onClick" onClick={e => console.log("onClick")} />
			<Button label="onFocus" onFocus={e => console.log("onFocus")} />
			<Button label="onBlur" onBlur={e => console.log("onBlur")} />
		</Group>

		<Group title="primary / secondary / accent / positive / negative">
			<Button label="primary" is="primary" />
			<Button label="secondary" is="secondary" />
			<Button label="accent" is="accent" />
			<Button label="positive" is="positive" />
			<Button label="negative" is="negative" />
		</Group>

		<Group title="wide">
			<Button wide label="full width" shape="round" size="large" />
		</Group>

		<Group title="text and a button">
			Click the following link <Button label="Get a voucher" size="small" /> to
			get a voucher.
		</Group>
	</b>
);
