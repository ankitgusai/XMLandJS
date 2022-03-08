/**
 * 1. Replace regular functions with arrow functions
 * 2. Fix callback hell by rewriting it with async/await
 * 3. Make sure the "Finish" is logged after all the data is converted
 */

const timeout = (ms) => new Promise(resolve => {
    setTimeout(resolve, ms);
})


const generateRandomNumber = () => Math.floor(Math.random() * 40);


const generateData = async () => timeout(1000).then(() => Array.from({ length: 20 }, generateRandomNumber))


const convertToFeet = (meters) =>timeout(3500).then(()=>(meters * 3.2808))
    

const processData = async(data, converterFn) => data.map((value) => {
    return {
        val1: value,
        res1: converterFn(value)
    };
});


function logResult(meters, feet) {
    console.log(`Converted ${meters}m to ${feet}ft`);
}

const main = () => {
    console.log("Start");
    generateData()
        .then((data) => processData(data, convertToFeet))
        .then((processedData) => {
            processedData.forEach(element => {
                console.log(element.val1, element.res1)
            })
        })

    // generateData(function (data) {
    //     processData(data, function (value) {
    //         convertToFeet(value, function (result) {
    //             logResult(value, result);
    //         });
    //     });
    // });
    console.log("Finish");
}

main();
