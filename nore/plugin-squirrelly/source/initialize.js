import * as Sqrl from "squirrelly";
import { join } from "@nore/std/path";
import { readFile, readDirectory, isFile, itExists, isDirectory } from "@nore/std/fs";
import { log, define } from "@nore/cms";
import fs from "fs";

export default async settings => {
    const templates = new Map();

    // const files = await readDirectory();

    const initializeDirectories = async path => {
        const files = await readDirectory(`${path}`);

        for (const file of files) {
            const fileName = file.split(settings.path + "/")[1].split(".")[0];

            if (!itExists(file)) {
                continue;
            }

            if (await isFile(file)) {
                const fileContain = await readFile(file);

                templates.set(fileName, fileContain);

                Sqrl.definePartial(fileName, fileContain);
            }
            if (await isDirectory(file)) {
                await initializeDirectories(file);
            }
        }
    };

    await initializeDirectories(`${PROJECT_PATH}/${settings.path}`);

    return {
        render(path, params) {
            var badge = Sqrl.Render(templates.get(path) || templates.get(path + "/index"), params);

            return badge;
        },

        has(path) {
            return templates.get(path) || templates.get(path + "/index");
        },
    };
};
