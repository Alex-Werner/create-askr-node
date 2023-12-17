#!/usr/bin/env node

// Terminal is used to send commands to the server and receive responses.
// It is also used to display the output of the commands.

import Logger from "hermodlog";
import {Client} from "node-askr";
import CommandMessage from "node-askr/src/CommandMessage.js";

class Terminal {
    constructor(props = { name: 'Terminal'}) {
        this.name = props?.name;
        this.logger = new Logger().context(this.name);

        this.isInitialized = false;
        this.askr = null;
        this.peer = null;
        this.commands = {};
        this.commandHistory = [];
        this.commandHistoryIndex = 0;
        this.commandHistoryMax = 100;
        this.commandHistoryCurrent = '';
        this.commandHistoryIndex = 0;
        this.commandHistoryIndexMax = 0;
        this.commandHistoryIndexMin = 0;
        this.commandHistoryIndexCurrent = 0;
        this.commandHistoryIndexLast = 0;
        this.commandHistoryIndexFirst = 0;
        this.commandHistoryIndexLast = 0;
        this.commandHistoryIndexFirst = 0;
        this.commandHistoryIndexLast = 0;
        this.commandHistoryIndexFirst = 0;
        this.commandHistoryIndexLast = 0;
        this.commandHistoryIndexFirst = 0;
        this.commandHistoryIndexLast = 0;
        this.commandHistoryIndexFirst = 0;
        this.commandHistoryIndexLast = 0;
        this.commandHistoryIndexFirst = 0;
        this.commandHistoryIndexLast = 0;
        this.commandHistoryIndexFirst = 0;
        this.commandHistoryIndexLast = 0;
        this.commandHistoryIndexFirst = 0;
        this.commandHistoryIndexLast = 0;
        this.commandHistoryIndexFirst = 0;
        this.commandHistoryIndexLast = 0;
    }

    async init() {
        const logger = this.logger.method('init');
        logger.info('Initializing terminal');
        this.client = new Client({
            name: this.name.toLowerCase(),
        })

        logger.info('Terminal initialized');
        this.isInitialized = true;

    }

    async start() {
        const logger = this.logger.method('start');
        logger.info('Starting terminal');
        if (!this.isInitialized) {
            await this.init();
        }

        await this.client.connect();


        const req = await this.client.send('MONITORING_REQUEST');
        console.log('req', req)
        logger.info('Terminal started');
    }

    async stop() {
        const logger = this.logger.method('stop');
        logger.info('Stopping terminal');
        if (!this.isInitialized) {
            await this.init();
        }
        logger.info('Terminal stopped');
    }
}

const terminal = new Terminal();
terminal.start();
