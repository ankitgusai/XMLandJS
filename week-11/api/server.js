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

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}


const PORT = 8888;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = allowCors(server);
