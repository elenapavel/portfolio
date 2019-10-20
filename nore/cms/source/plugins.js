import sessions from "@nore/plugin-http-sessions";
import sqlite from "@nore/plugin-sqlite";
import http from "@nore/plugin-http";
import squirrelly from "@nore/plugin-squirrelly";

// core plugins to load
export default [sqlite, http, sessions, squirrelly];
