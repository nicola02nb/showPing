/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./Ping.css";

import { FluxEvent, TextVariant } from "@vencord/discord-types";
import { FluxDispatcher, Text, useEffect, useState } from "@webpack/common";

import { RTCConnectionStore } from "../stores";

export function PingElement({ variant, parenthesis = true, color }: { variant: TextVariant; parenthesis?: boolean; color?: string; }) {
    const [ping, setPing] = useState(RTCConnectionStore.getLastPing());

    const updatePing = (_: FluxEvent) => {
        setPing(RTCConnectionStore.getLastPing());
    };

    const formatPing = (ping: number | undefined) => {
        if (ping === undefined) return "N/A";
        return parenthesis ? `(${ping} ms)` : `${ping} ms`;
    };

    useEffect(() => {
        return () => {
            FluxDispatcher.unsubscribe("RTC_CONNECTION_PING", updatePing);
        };
    }, []);

    FluxDispatcher.subscribe("RTC_CONNECTION_PING", updatePing);

    return (<Text variant={variant} className="pingDisplay" style={{ color: color ?? "inherit" }}>{formatPing(ping)}</Text>);
}
