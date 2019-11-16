import React from "react";

import Header from "./Header";
import Content from "./Content";
import Grid from "./Grid";
import Features from "./Features";
import Portfolio from "./Portfolio";
import Blog from "./Blog";
import Team from "./Team";
import Ecommerce from "./Ecommerce";
import Pricing from "./Pricing";
import CTA from "./CTA";
import Form from "./Form";
import Contact from "./Contact";
import Footer from "./Footer";

import $ from "./style.css";

export default ({ data }) => (
	<b className={$.application}>
		<Header data={data.header} />
		<Content data={data.content} />
		<Grid data={data.gallery} />
		<Features data={data.features} />
		<Portfolio data={data.portfolio} />
		<Blog data={data.blog} />
		<Team data={data.team} />
		<Ecommerce data={data.ecommerce} />
		<Pricing data={data.pricing} />
		<CTA data={data.cta} />
		<Form data={data.form} />
		<Contact data={data.contact} />
		<Footer data={data.footer} />
	</b>
);
