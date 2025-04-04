import io from 'socket.io-client';
import API from '../config/api';

// Extract the base URL without the /api suffix
const baseUrl = API.baseURL.split('/api')[0];

// Create socket instance
// const socket = io(baseUrl);
const socket = io(baseUrl);

// Add connection event handlers
socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
});

socket.on('connect_error', (error) => {
  console.log(baseUrl);
  console.error('Socket connection error:', error);
});

export default socket;


// λ  ERROR  Socket connection error: TransportError: xhr poll error
//     at XHR.onError (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75965:35)
//     at Request.<anonymous> (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75524:14)
//     at Request.Emitter.emit (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:76496:22)
//     at Request._onError (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75627:12)
//     at Timeout._onTimeout (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75601:20)
//     at listOnTimeout (node:internal/timers:614:17)
//     at processTimers (node:internal/timers:549:7) {
//   description: 0,
//   context: XMLHttpRequest {
//     UNSENT: 0,
//     OPENED: 1,
//     HEADERS_RECEIVED: 2,
//     LOADING: 3,
//     DONE: 4,
//     readyState: 4,
//     onreadystatechange: [Function (anonymous)],
//     responseText: 'AggregateError: \n' +
//       '    at internalConnectMultiple (node:net:1139:18)\n' +
//       '    at afterConnectMultiple (node:net:1712:7)',
//     responseXML: '',
//     response: <Buffer >,
//     status: 0,
//     statusText: AggregateError: 
//         at internalConnectMultiple (node:net:1139:18)
//         at afterConnectMultiple (node:net:1712:7) {
//       code: 'ECONNREFUSED',
//       [errors]: [Array]
//     },
//     open: [Function (anonymous)],
//     setDisableHeaderCheck: [Function (anonymous)],
//     setRequestHeader: [Function (anonymous)],
//     getResponseHeader: [Function (anonymous)],
//     getAllResponseHeaders: [Function (anonymous)],
//     getRequestHeader: [Function (anonymous)],
//     send: [Function (anonymous)],
//     handleError: [Function (anonymous)],
//     abort: [Function (anonymous)],
//     addEventListener: [Function (anonymous)],
//     removeEventListener: [Function (anonymous)],
//     dispatchEvent: [Function (anonymous)]
//   },
//   type: 'TransportError'
// } 
// λ  ERROR  Socket connection error: TransportError: xhr poll error
//     at XHR.onError (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75965:35)
//     at Request.<anonymous> (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75524:14)
//     at Request.Emitter.emit (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:76496:22)
//     at Request._onError (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75627:12)
//     at Timeout._onTimeout (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75601:20)
//     at listOnTimeout (node:internal/timers:614:17)
//     at processTimers (node:internal/timers:549:7) {
//   description: 0,
//   context: XMLHttpRequest {
//     UNSENT: 0,
//     OPENED: 1,
//     HEADERS_RECEIVED: 2,
//     LOADING: 3,
//     DONE: 4,
//     readyState: 4,
//     onreadystatechange: [Function (anonymous)],
//     responseText: 'AggregateError: \n' +
//       '    at internalConnectMultiple (node:net:1139:18)\n' +
//       '    at afterConnectMultiple (node:net:1712:7)',
//     responseXML: '',
//     response: <Buffer >,
//     status: 0,
//     statusText: AggregateError: 
//         at internalConnectMultiple (node:net:1139:18)
//         at afterConnectMultiple (node:net:1712:7) {
//       code: 'ECONNREFUSED',
//       [errors]: [Array]
//     },
//     open: [Function (anonymous)],
//     setDisableHeaderCheck: [Function (anonymous)],
//     setRequestHeader: [Function (anonymous)],
//     getResponseHeader: [Function (anonymous)],
//     getAllResponseHeaders: [Function (anonymous)],
//     getRequestHeader: [Function (anonymous)],
//     send: [Function (anonymous)],
//     handleError: [Function (anonymous)],
//     abort: [Function (anonymous)],
//     addEventListener: [Function (anonymous)],
//     removeEventListener: [Function (anonymous)],
//     dispatchEvent: [Function (anonymous)]
//   },
//   type: 'TransportError'
// } 
// λ  ERROR  Socket connection error: TransportError: xhr poll error
//     at XHR.onError (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75965:35)
//     at Request.<anonymous> (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75524:14)
//     at Request.Emitter.emit (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:76496:22)
//     at Request._onError (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75627:12)
//     at Timeout._onTimeout (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75601:20)
//     at listOnTimeout (node:internal/timers:614:17)
//     at processTimers (node:internal/timers:549:7) {
//   description: 0,
//   context: XMLHttpRequest {
//     UNSENT: 0,
//     OPENED: 1,
//     HEADERS_RECEIVED: 2,
//     LOADING: 3,
//     DONE: 4,
//     readyState: 4,
//     onreadystatechange: [Function (anonymous)],
//     responseText: 'AggregateError: \n' +
//       '    at internalConnectMultiple (node:net:1139:18)\n' +
//       '    at afterConnectMultiple (node:net:1712:7)',
//     responseXML: '',
//     response: <Buffer >,
//     status: 0,
//     statusText: AggregateError: 
//         at internalConnectMultiple (node:net:1139:18)
//         at afterConnectMultiple (node:net:1712:7) {
//       code: 'ECONNREFUSED',
//       [errors]: [Array]
//     },
//     open: [Function (anonymous)],
//     setDisableHeaderCheck: [Function (anonymous)],
//     setRequestHeader: [Function (anonymous)],
//     getResponseHeader: [Function (anonymous)],
//     getAllResponseHeaders: [Function (anonymous)],
//     getRequestHeader: [Function (anonymous)],
//     send: [Function (anonymous)],
//     handleError: [Function (anonymous)],
//     abort: [Function (anonymous)],
//     addEventListener: [Function (anonymous)],
//     removeEventListener: [Function (anonymous)],
//     dispatchEvent: [Function (anonymous)]
//   },
//   type: 'TransportError'
// } 
// λ  ERROR  Socket connection error: TransportError: xhr poll error
//     at XHR.onError (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75965:35)
//     at Request.<anonymous> (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75524:14)
//     at Request.Emitter.emit (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:76496:22)
//     at Request._onError (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75627:12)
//     at Timeout._onTimeout (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75601:20)
//     at listOnTimeout (node:internal/timers:614:17)
//     at processTimers (node:internal/timers:549:7) {
//   description: 0,
//   context: XMLHttpRequest {
//     UNSENT: 0,
//     OPENED: 1,
//     HEADERS_RECEIVED: 2,
//     LOADING: 3,
//     DONE: 4,
//     readyState: 4,
//     onreadystatechange: [Function (anonymous)],
//     responseText: 'AggregateError: \n' +
//       '    at internalConnectMultiple (node:net:1139:18)\n' +
//       '    at afterConnectMultiple (node:net:1712:7)',
//     responseXML: '',
//     response: <Buffer >,
//     status: 0,
//     statusText: AggregateError: 
//         at internalConnectMultiple (node:net:1139:18)
//         at afterConnectMultiple (node:net:1712:7) {
//       code: 'ECONNREFUSED',
//       [errors]: [Array]
//     },
//     open: [Function (anonymous)],
//     setDisableHeaderCheck: [Function (anonymous)],
//     setRequestHeader: [Function (anonymous)],
//     getResponseHeader: [Function (anonymous)],
//     getAllResponseHeaders: [Function (anonymous)],
//     getRequestHeader: [Function (anonymous)],
//     send: [Function (anonymous)],
//     handleError: [Function (anonymous)],
//     abort: [Function (anonymous)],
//     addEventListener: [Function (anonymous)],
//     removeEventListener: [Function (anonymous)],
//     dispatchEvent: [Function (anonymous)]
//   },
//   type: 'TransportError'
// } 
// λ  ERROR  Socket connection error: TransportError: xhr poll error
//     at XHR.onError (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75965:35)
//     at Request.<anonymous> (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75524:14)
//     at Request.Emitter.emit (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:76496:22)
//     at Request._onError (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75627:12)
//     at Timeout._onTimeout (/Users/harshnagrani/Desktop/projects/project/Frontend/node_modules/expo-router/node/render.js.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node&unstable_transformProfile=hermes-stable:75601:20)
//     at listOnTimeout (node:internal/timers:614:17)
//     at processTimers (node:internal/timers:549:7) {
//   description: 0,
//   context: XMLHttpRequest {
//     UNSENT: 0,
//     OPENED: 1,
//     HEADERS_RECEIVED: 2,
//     LOADING: 3,
//     DONE: 4,
//     readyState: 4,
//     onreadystatechange: [Function (anonymous)],
//     responseText: 'AggregateError: \n' +
//       '    at internalConnectMultiple (node:net:1139:18)\n' +
//       '    at afterConnectMultiple (node:net:1712:7)',
//     responseXML: '',
//     response: <Buffer >,
//     status: 0,
//     statusText: AggregateError: 
//         at internalConnectMultiple (node:net:1139:18)
//         at afterConnectMultiple (node:net:1712:7) {
//       code: 'ECONNREFUSED',
//       [errors]: [Array]
//     },
//     open: [Function (anonymous)],
//     setDisableHeaderCheck: [Function (anonymous)],
//     setRequestHeader: [Function (anonymous)],
//     getResponseHeader: [Function (anonymous)],
//     getAllResponseHeaders: [Function (anonymous)],
//     getRequestHeader: [Function (anonymous)],
//     send: [Function (anonymous)],
//     handleError: [Function (anonymous)],
//     abort: [Function (anonymous)],
//     addEventListener: [Function (anonymous)],
//     removeEventListener: [Function (anonymous)],
//     dispatchEvent: [Function (anonymous)]
//   },
//   type: 'TransportError'
// } 