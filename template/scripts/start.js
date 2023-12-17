import Service from '../src/Service/Service.js';

const service = new Service();

(async () => {
    // Start the service with monitoring enabled.
    await service.start();
})();
