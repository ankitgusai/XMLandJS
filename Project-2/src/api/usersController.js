const profiles = require("../animalOwners.json");

const getAll = ({ id, name, gender, favoriteAnimal}) =>
  new Promise((resolve) => {
    let result = Array.from(profiles);

    if (id) {
      result = result.filter(({item}) => item.guid === id);
    }

    if (name) {
      result = result.filter((item) => item.name === name);
    }
    
    if (gender) {
        result = result.filter((item) => item.gender === gender);
      }

    if (favoriteAnimal) {
        result = result.filter((item) => item.favoriteAnimal === favoriteAnimal);
      }

    resolve({ code: 200, data: JSON.stringify(result) });
  });

const getById = (id) =>
  new Promise((resolve) => {
    const product = profiles.find((item) => item.guid === id);

    if (product) {
      resolve({ code: 200, data: JSON.stringify(product) });
    } else {
      resolve({
        code: 404,
        data: { message: `No user found for id ${id}` },
      });
    }
  });

module.exports = {
  getAll,
  getById,
};
