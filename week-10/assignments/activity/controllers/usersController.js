const users = require('../week5Data.json');


const getAllData = async ({ id, email, gender }) => {
    try {
        let result = Array.from(users);

        if (id) {
            result = result.filter((item) => item.id === Number(id));
        }

        if (email) {
            result = result.filter((item) => item.email === email);
        }

        if (gender) {
            result = result.filter((item) => item.gender === gender);
        }

        return { code: 200, data: JSON.stringify(result) };
    } catch (error) {
        return { code: 500, data: { message: error.message } };
    }
}


const getUserById = async (userId) => {
    const user = users.find(({ id }) => id === Number(userId));

    if (user) {
        return { code: 200, data: JSON.stringify(user) }
    } else {
        return {
            code: 404,
            data: JSON.stringify({ message: `No user found for id ${userId}` }),
        }
    }
}

module.exports = {
    getAllData,
    getUserById,
};