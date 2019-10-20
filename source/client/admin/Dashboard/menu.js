import React, { Component } from "react";

import BookOpen from "assets/icons/feather/book-open.svg?inline";
import FileText from "assets/icons/feather/file-text.svg?inline";
import Layers from "assets/icons/feather/layers.svg?inline";
import Layout from "assets/icons/feather/layout.svg?inline";
import Book from "assets/icons/feather/book.svg?inline";

export default [
	{ to: "/admin/pages", label: "Pages", icon: <BookOpen /> },
	// { to: "/admin/articles", label: "Articles", icon: <FileText /> },
	{ to: "/admin/copsi", label: "COPSI", icon: <Book /> },
	{ to: "/admin/typeform", label: "Typeform", icon: <Layers /> },

	{ divider: true },

	{ to: "/", label: "Website", icon: <Layout /> },
];
