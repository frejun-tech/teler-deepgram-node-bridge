import { Client } from "@frejun/teler";
import { config } from "../core/config";
import { logger } from "./logger";

export const telerClient = new Client(config.telerKey, {
    logger: logger
});