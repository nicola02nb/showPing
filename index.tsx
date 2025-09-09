/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { React } from "@webpack/common";

import { PingElement } from "./components/Ping";
import { settings } from "./settings";

export default definePlugin({
    name: "ShowPing",
    description: "Displays your live ping.",
    authors: [{
        name: "nicola02nb",
        id: 257900031351193600n
    }],
    settings,
    patches: [
        {
            find: ".hoverableStatus),hoverText:",
            replacement: {
                match: /(children:\i}\):null,children:)(\(0,\i.jsx\)\(\i.Text,.{0,50}\i\}\))/,
                replace: "$1[$2,$self.renderPing()]"
            }
        }
    ],
    start: () => {
    },
    stop: () => {
    },

    renderPing() {
        return <PingElement />;
    }
});


