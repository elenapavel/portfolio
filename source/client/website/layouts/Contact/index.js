import React, { useState } from "react";
import { Title } from "@nore/pwa";
import Header from "$website/components/Header";
import Footer from "$website/components/Footer";
import $, { css } from "./style.css";

export default () => (
	<b class={$.container}>
		<Title hidden>Contact</Title>
		<Header />
		<Footer />
	</b>
);
