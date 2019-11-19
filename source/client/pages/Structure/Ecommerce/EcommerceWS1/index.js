import React, { useState } from "react";
import Actions from "./Actions";
import Product from "./Product";
import Ad from "./Ad";
import $ from "./style.css";

const components = { product: Product, ad: Ad };

export default ({ data, heading = null }) => {
	const [active, setActive] = useState(0);
	const [selectedProduct, selectProduct] = useState(null);
	return (
		<b className={$.section}>
			<b className={$.heading}>{heading || data.heading}</b>
			<b className={$.content}>
				<Actions
					items={data.categories}
					active={active}
					onSelect={key => {
						setActive(key);
						selectProduct(null);
					}}
				/>
				<b className={$.items}>
					{data.items[active].map((item, key) => {
						const Component = components[item.type];

						if (item.type == "product")
							return (
								<b className={$.product} key={key}>
									<Component
										{...item}
										index={key}
										isSelected={key == selectedProduct}
										onSelect={key =>
											selectProduct(
												selectedProduct == key
													? null
													: key
											)
										}
									/>
								</b>
							);
						else if (item.type == "ad")
							return (
								<b className={$.ad} key={key}>
									<Component {...item} />
								</b>
							);
						else
							return (
								<b className={$.error} key={key}>
									No component found for {item.type}.
								</b>
							);
					})}
				</b>
			</b>
		</b>
	);
};
