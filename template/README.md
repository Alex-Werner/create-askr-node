# create-askr-node

Template to spawn a ready to use microservice with basic start/stop and monitoring system

Allows to create a microservice with a basic start/stop and monitoring system.  
Integrates node-askr package to allow for cross service communication.


## Installation

```bash
npx create-askr-node my-service

```

## Usage

```bash
npm start
```

In `scripts/start.js` you can find the code executed when running `npm start`. It's a simple instance creation and start of the `src/Service`.  
The `Service` class has a `.start()` method that returns a promise that resolves when the service is ready to receive requests.  
By default, the service will listen to `MONITORING_REQUEST` events (use {Client} from node-askr to call or see scripts/terminal.js).

## Configuration

### Add a new listener for commands: 

```js
        service.askr.on('TIME_REQUEST', (event, peer) => {
            const response = {
                type: 'MONITORING_RESPONSE',
                payload: {time: Date.now()}
            }
            // Answer to the peer
            peer.write(JSON.stringify(response));
        });
```

### Add a new emitter for commands: 

```js
        service.askr.emit('TIME', {time: Date.now()});
```

