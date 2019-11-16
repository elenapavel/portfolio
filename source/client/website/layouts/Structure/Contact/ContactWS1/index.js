import React, { Component } from "react";
import { Gmaps, Marker, InfoWindow, Circle } from "react-gmaps";
import Form from "./Form";
import $ from "./style.css";

export default ({ data }) => {
	const onMapCreated = map => {
		map.setOptions({
			disableDefaultUI: true,
		});
	};

	const onDragEnd = e => {
		console.log("onDragEnd", e);
	};

	const onCloseClick = () => {
		console.log("onCloseClick");
	};

	const onClick = e => {
		console.log("onClick", e);
	};

	return (
		<b className={$.section}>
			<b className={$.content}>
				<b className={$.to_left}>
					<Gmaps
						lat={data.map.coords.lat}
						lng={data.map.coords.lng}
						zoom={12}
						loadingMessage={data.map.loadingMessage}
						params={data.map.params}
						onMapCreated={onMapCreated}
					>
						<Marker
							lat={data.map.coords.lat}
							lng={data.map.coords.lng}
							draggable={true}
							onDragEnd={onDragEnd}
						/>
						<InfoWindow
							lat={data.map.coords.lat}
							lng={data.map.coords.lng}
							content={data.map.infoBox}
							onCloseClick={onCloseClick}
						/>
						<Circle
							lat={data.map.coords.lat}
							lng={data.map.coords.lng}
							radius={500}
							onClick={onClick}
						/>
					</Gmaps>
				</b>
				<b className={$.to_right}>
					<b className={$.heading}>{data.form.heading}</b>
					<b className={$.subheading}>{data.form.subheading}</b>
					<b className={$.login_action}>
						<Form
							fields={data.form.fields}
							submitActionText={data.form.submitAction.text}
						/>
					</b>
				</b>
			</b>
		</b>
	);
};
