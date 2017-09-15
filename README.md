# node

## This is a server for nodejs language

[![Build Status](https://travis-ci.org/Microsoft/vscode.svg?branch=master)](https://travis-ci.org/Microsoft/vscode)
[![Build Status](https://ci.appveyor.com/api/projects/status/vuhlhg80tj3e2a0l/branch/master?svg=true)](https://ci.appveyor.com/project/VSCode/vscode)
[![Coverage Status](https://img.shields.io/coveralls/Microsoft/vscode/master.svg)](https://coveralls.io/github/Microsoft/vscode?branch=master)
[![Gitter](https://img.shields.io/badge/chat-on%20gitter-blue.svg)](https://gitter.im/Microsoft/vscode)

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.


As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection the callback is fired, but if there is no work to be done, Node will sleep.

<p align="center">
  <img alt="VS Code in action" src="https://cloud.githubusercontent.com/assets/11839736/16642200/6624dde0-43bd-11e6-8595-c81885ba0dc2.png">
</p>

This is in contrast to today's more common concurrency model where OS threads are employed. Thread-based networking is relatively inefficient and very difficult to use. Furthermore, users of Node are free from worries of dead-locking the process, since there are no locks. Almost no function in Node directly performs I/O, so the process never blocks. Because nothing blocks, scalable systems are very reasonable to develop in Node.

If some of this language is unfamiliar, there is a full article on Blocking vs Non-Blocking.

Node is similar in design to, and influenced by, systems like Ruby's Event Machine or Python's Twisted. Node takes the event model a bit further. It presents an event loop as a runtime construct instead of as a library. In other systems there is always a blocking call to start the event-loop. Typically behavior is defined through callbacks at the beginning of a script and at the end starts a server through a blocking call like EventMachine::run(). In Node there is no such start-the-event-loop call. Node simply enters the event loop after executing the input script. Node exits the event loop when there are no more callbacks to perform. This behavior is like browser JavaScript — the event loop is hidden from the user.

HTTP is a first class citizen in Node, designed with streaming and low latency in mind. This makes Node well suited for the foundation of a web library or framework.

Just because Node is designed without threads, doesn't mean you cannot take advantage of multiple cores in your environment. Child processes can be spawned by using our child_process.fork() API, and are designed to be easy to communicate with. Built upon that same interface is the cluster module, which allows you to share sockets between processes to enable load balancing over your cores.

## Everything you've seen is just a pose. That's the beginning

## Purpose

* Quick build service.
* Help you develop efficiently.
* Test some of the server issues.
* It's easy to write the tools you want.
* There's a lot more besides these.

## This code may have nothing to do with the project

```javascript
const http = require('http');

const hostname = '127.0.0.1';

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

```
## Things that might be related to the project
* Turn on the service and start here together.
```javascript
npm start
````
* Using crawlers, the project uses NetEase resources in the phantomjs scratch zone
```javascript
npm run crawler
````
* Configure the session expiration time, in units of minutes
```JSON
{

    "session": {
        "maxAge": 10
    }
}
````

