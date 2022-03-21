# Making API

## Step 0

configure dev environemnt

create npm project

```bash
npm init
```

install nodemon package

```bash
npm i --save-dev nodemon
```

add start/dev scripts to package.json

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## Step 1

create server.js file

import http module and create server

```js
const http = require("http");

const server = http.createServer(() => {});

const PORT = 8888;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
```

## Step 2

create response handler function

```js
const server = http.createServer((req, res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route Not Found" }));
});
```

## Step 3

add route handler

```js
const server = http.createServer((req, res) => {
  const [basePath, paramsString] = req.url.split("?");

  if (basePath === "/api/products" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(`response here`);
  } else if (basePath.match(/\/api\/products\/\w+/) && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(`response here`);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});
```

## Step 4

create controller

```js
const products = require("../data/products");

const getAll = ({ id, name, description, price }) =>
  new Promise((resolve) => {
    resolve({ code: 200, data: JSON.stringify(products) });
  });

const getById = (id) =>
  new Promise((resolve) => {
    const product = products.find((product) => product.id === id);

    if (product) {
      resolve({ code: 200, data: JSON.stringify(product) });
    } else {
      resolve({
        code: 404,
        data: { message: `No product found for id ${id}` },
      });
    }
  });

module.exports = {
  getAll,
  getById,
};
```

## Step 5

use controller functions in server.js

```js
const http = require("http");

const product = require("./controllers/product");

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    const { data, code } = await product.getAll();

    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(data);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3];

    const { data, code } = await product.getById(id);

    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

const PORT = 8888;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
```

## Step 6

add search params parser to router

```js
const http = require("http");

const product = require("./controllers/product");

const parseURLParams = (value) => {
  const params = new URLSearchParams(value);

  return Array.from(params.entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );
};

const server = http.createServer(async (req, res) => {
  const [basePath, paramsString] = req.url.split("?");

  if (basePath === "/api/products" && req.method === "GET") {
    const params = parseURLParams(paramsString);

    const { data, code } = await product.getAll(params);

    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(data);
  } else if (basePath.match(/\/api\/products\/\w+/) && req.method === "GET") {
    const id = basePath.split("/")[3];

    const { data, code } = await product.getById(id);

    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

const PORT = 8888;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
```

## Step 7

add filtering to getAll controller function

```js
const getAll = ({ id, name, description, price }) =>
  new Promise((resolve) => {
    let result = Array.from(products);

    if (id) {
      result = result.filter((item) => item.id === id);
    }

    if (name) {
      result = result.filter((item) => item.name === name);
    }

    if (description) {
      result = result.filter((item) => item.description === description);
    }

    if (price) {
      result = result.filter((item) => item.price === Number(price));
    }

    resolve({ code: 200, data: JSON.stringify(result) });
  });
```
