import React, { useState, useEffect, useRef } from "react";
import { debounce } from "@nore/std/utils";
import Logo from "./Logo";
import Navigation from "./Navigation";
import IntroSection from "./IntroSection";
import BeginningSection from "./BeginningSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import ClientsSection from "./ClientsSection";
import PortfolioSection from "./PortfolioSection";
import WebSection from "./WebSection";
import FrontendSection from "./FrontendSection";
import $, { css } from "./style.css";

export default function Gradient({ data }) {
	const [isMenuOpened, toggleMenu] = useState(false);

	function handleScroll(value) {
		toggleMenu(false);

		setTimeout(() => {
			window.scrollTo({
				top: document.getElementById(value).offsetTop,
				behavior: "smooth",
			});
		}, 300);
	}

	useEffect(initialize, []);

	function initialize() {
		const onResize = debounce(getWindowWidth, 200);

		function getWindowWidth() {
			if (window.innerWidth > 899) {
				toggleMenu(false);
			}
		}

		getWindowWidth();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}

	const styleMenuOpened = {
		transform: "translateX(-15rem)",
		overflow: "hidden",
		opacity: 0.5,
	};

	const styleMenuClosed = {
		transform: "translateX(0)",
		overflow: "visible",
		opacity: 1,
	};

	return (
		<b className={$.application}>
			<b className={$.header}>
				<i
					className={$.logo}
					style={{
						transform: `translateX(${isMenuOpened ? -15 : 0}rem)`,
					}}
				>
					<Logo image={data.logo} link="/" />
				</i>
				<i
					className={isMenuOpened ? $.menu_icon_colored : $.menu_icon}
					onClick={() => toggleMenu(!isMenuOpened)}
				>
					<i className={$.bar_long} />
					<i className={$.bar_short} />
					<i className={$.bar} />
				</i>
				<i
					className={$.navigation}
					style={{
						transform: `translateX(${isMenuOpened ? 0 : 15}rem)`,
					}}
				>
					{
						<Navigation
							menu={data.menu}
							onSelect={value => handleScroll(value)}
						/>
					}
				</i>
			</b>
			<b
				className={$.container}
				style={isMenuOpened ? styleMenuOpened : styleMenuClosed}
			>
				<b className={$.intro_section} id={data.introSection.id}>
					<IntroSection
						image={data.introSection.image}
						heading={data.introSection.heading}
					/>
				</b>
				<b
					className={$.beginning_section}
					id={data.beginningSection.id}
				>
					<BeginningSection
						heading={data.beginningSection.heading}
						description={data.beginningSection.description}
						image={data.beginningSection.image}
					/>
				</b>
				<b className={$.about_section} id={data.aboutSection.id}>
					<AboutSection
						heading={data.aboutSection.heading}
						subheading={data.aboutSection.subheading}
						description={data.aboutSection.description}
						image={data.aboutSection.image}
					/>
				</b>
				<b className={$.services_section} id={data.servicesSection.id}>
					<b className={$.gradient} />
					<ServicesSection
						heading={data.servicesSection.heading}
						items={data.servicesSection.items}
					/>
				</b>
				<b className={$.clients_section} id={data.clientsSection.id}>
					<ClientsSection
						heading={data.clientsSection.heading}
						image={data.clientsSection.image}
						description={data.clientsSection.description}
					/>
				</b>
				<b
					className={$.portfolio_section}
					id={data.portfolioSection.id}
				>
					<PortfolioSection
						heading={data.portfolioSection.heading}
						items={data.portfolioSection.items}
					/>
				</b>
				<b className={$.web_section} id={data.webSection.id}>
					<WebSection
						heading={data.webSection.heading}
						image={data.webSection.image}
						description={data.webSection.description}
					/>
				</b>
				<b className={$.frontend_section} id={data.frontendSection.id}>
					<FrontendSection
						heading={data.frontendSection.heading}
						image={data.frontendSection.image}
						description={data.frontendSection.description}
					/>
				</b>
			</b>
		</b>
	);
}
