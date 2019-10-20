import initialize from "./initialize.js";

export default {
    handle: "nore/squirrelly",
    version: "1.0.0",

    name: "Nore HTTP",
    description: "Nore Squirrelly interface",
    website: "https://github.com/nore/plugin-squirrelly",
    documentation: "https://navaru.com/nore/docs/squirrelly",

    author: {
        name: "Navaru",
        email: "office@navaru.com",
        url: "https://navaru.com",
    },
    settings: {
        path: "source/templates",
    },
    initialize,
};
