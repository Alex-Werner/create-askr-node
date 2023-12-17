import Logger from "hermodlog";
import {Askr} from "node-askr";
import os from "os";
class Service {
    constructor(props = { name: 'Service'}) {
        this.name = props?.name;
        this.logger = new Logger().context(this.name);

        this.intervals = {}

        this.askr = null;
        this.isInitialized = false;
    }

    async init(){
        const logger = this.logger.method('init');
        logger.info('Initializing service');
        const askr = new Askr({
            name: this.name.toLowerCase(),
        })
        this.askr = askr;

        const monitor = {
            getStatus() {

                const payload = {
                    name: this.name,
                    isInitialized: this.isInitialized,
                };
                if(askr?.getStatus){
                    payload.askr = askr.getStatus();
                }
                return {
                    ...payload,

                    // Basic OS-level metrics
                    freeMemory: os.freemem(), // Free system memory
                    totalMemory: os.totalmem(), // Total system memory
                    cpuLoad: os.loadavg(), // Load average over the last 1, 5, and 15 minutes
                    uptime: os.uptime(), // System uptime

                    // Process-level metrics
                    processMemoryUsage: process.memoryUsage(), // Memory usage of the Node.js process
                    processUptime: process.uptime(), // Uptime of the Node.js process
                    activeHandles: process._getActiveHandles().length, // Number of active handles
                    activeRequests: process._getActiveRequests().length // Number of active requests
                };
            }
        }
        // Add a specific monitoring command handler.
        this.askr.on('MONITORING_REQUEST', (event, peer) => {
            const payload = monitor.getStatus();
            const response = {
                type: 'MONITORING_RESPONSE',
                payload
            }
            peer.write(JSON.stringify(response));
        });

        logger.info('Service initialized');
        this.isInitialized = true;
    }

    async start(){
        const logger = this.logger.method('start');
        logger.info('Starting service');
        if(!this.isInitialized){
            await this.init();
        }

        await this.askr.start();
        logger.info('Service started');
    }
}

export default Service;
