const http = require("http");
const userController = require("./controllers/peopleController");

const parseURLParams = (value) => {
    const params = new URLSearchParams(value);

    return Array.from(params.entries()).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {}
    );
}

const server = http.createServer(async (req, res) => {
    const [basePath, paramsString] = req.url.split("?");

    if (req.method === "GET") {

        if (basePath == '/api/people') {
            const params = parseURLParams(paramsString);

            let { code, data } = await userController.getAllData(params)
            res.writeHead(code, { "Content-Type": "application/json" });
            res.end(data)

        } else if (basePath.match(/\/api\/people\/\w+/)) {
            const id = basePath.split("/")[3];

            const { data, code } = await userController.getPeopleById(id);

            res.writeHead(code, { "Content-Type": "application/json" });
            res.end(data);

        } else {
            res.end('Invalid route')

        }
    } else {
        res.end('Invalid method')
    }




})


server.listen(8888, () => console.log(`listening at 8888`))
