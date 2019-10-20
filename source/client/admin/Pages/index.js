import React, { useEffect, useState } from "react";
import { store } from "@nore/pwa";
import Listing from "./Listing";
import Edit from "./Edit";

export default function Pages(attrs) {
	const { id } = store.get("url.query");

	return id ? <Edit id={id} /> : <Listing />;
}
