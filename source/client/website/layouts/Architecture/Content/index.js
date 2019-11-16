import React, { useEffect, useState } from "react";
import { debounce } from "@nore/std/utils";
import { useTransition, config, animated } from "react-spring";
import ArticleContent from "./ArticleContent";
import Progress from "./Progress";
import ArticleImage from "./ArticleImage";

import $, { css } from "./style.css";

export default ({ article, lastArticle, total, currentIndex, lastIndex }) => {
	const [isMobileView, setMobileView] = useState(0);

	useEffect(initialize, []);

	function initialize() {
		const onResize = debounce(setNavigationIsMobile, 200);

		function setNavigationIsMobile() {
			setMobileView(window.innerWidth > 1023);
		}

		setNavigationIsMobile();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}

	const transitionProgress = useTransition(currentIndex, null, {
		config: config.slow,
		duration: 400,
		from: {
			opacity: 0,
			left: `${currentIndex > lastIndex ? "-100%" : "100%"}`,
		},
		enter: {
			opacity: 1,
			left: "0",
		},
		leave: {
			opacity: 0,
			left: `${currentIndex > lastIndex ? "-100%" : "100%"}`,
		},
	});

	return (
		<b className={$.container}>
			<b className={$.to_left}>
				<ArticleContent
					title={article.title}
					date={article.date}
					category={article.category}
					content={article.content}
					more={article.more}
					lastTitle={lastArticle.title}
					lastDate={lastArticle.date}
					lastCategory={lastArticle.category}
					lastContent={lastArticle.content}
					lastMore={lastArticle.more}
				/>

				{!isMobileView ? (
					transitionProgress.map(({ props }, key) => {
						return (
							<animated.div key={key} style={props}>
								<Progress index={currentIndex} total={total} />
							</animated.div>
						);
					})
				) : (
					<Progress index={currentIndex} total={total} />
				)}
			</b>

			<b className={$.to_right}>
				<ArticleImage
					image={article.image}
					extras={article.extras}
					lastImage={lastArticle.image}
					lastExtras={lastArticle.extras}
				/>
			</b>
		</b>
	);
};
