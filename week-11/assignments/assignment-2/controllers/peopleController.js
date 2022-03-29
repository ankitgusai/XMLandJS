const people = require('../peopleData.json');


const getAllData = async ({ id, email, first_name, last_name }) => {
    try {
        let result = Array.from(people);

        if (id) {
            result = result.filter((item) => item.id === Number(id));
        }

        if (email) {
            result = result.filter((item) => item.email === email);
        }

        if (first_name) {
            result = result.filter((item) => item.first_name === first_name);
        }
        
        if (last_name) {
            result = result.filter((item) => item.last_name === last_name);
        }

        return { code: 200, data: JSON.stringify(result) };
    } catch (error) {
        return { code: 500, data: { message: error.message } };
    }
}


const getPeopleById = async (personId) => {
    const user = people.find(({ id }) => id === Number(personId));

    if (user) {
        return { code: 200, data: JSON.stringify(user) }
    } else {
        return {
            code: 404,
            data: JSON.stringify({ message: `No person found for id ${userId}` }),
        }
    }
}

module.exports = {
    getAllData,
    getPeopleById,
};