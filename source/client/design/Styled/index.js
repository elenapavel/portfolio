import React, { Component } from "react";
import styled from "@emotion/styled";
import $style from "../style.css";
import colors from "~/variables/color.yaml";

const Text = styled.div`
	color: ${props => props.theme.colors.primary};
`;

export default (
	<b class={$style.section}>
		emotion and styled system playground
		<Text>some text</Text>
		<div css={theme => ({ color: theme.colors.primary })}>some other text</div>
	</b>
);
