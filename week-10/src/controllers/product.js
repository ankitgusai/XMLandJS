const products = require("../../api/data/products.json");


const getAllData = ({ id, name, description, price }) => new Promise((resolve) => {
    try {
        let result = Array.from(products);
        console.log(`result ${result.length}`)

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
    } catch (error) {
        resolve({code: 500, data: {message: error.message}})
     }
})


const getProductById = (productId) => new Promise((resolve) => {
    const product = products.find(({ id }) => id === productId);

    if (product) {
        resolve({ code: 200, data: JSON.stringify(product) });
    } else {
        resolve({
            code: 404,
            data: JSON.stringify({ message: `No product found for id ${productId}` }),
        });
    }
});

module.exports = {
    getAllData,
    getProductById,
};