const fs = require("fs");

const arrayOfActiveAccountsOnly = (array) => array.filter((element) => element.isActive)

const highestBalane = (array) => array.map(element => element.balance)
    .reduce((pv, cv) => {

        let pvNum = Number(pv.substr(1, pv.length).replace(',', ''))
        let cvNum = Number(cv.substr(1, cv.length).replace(',', ''))

        if (cvNum > pvNum) {
            return cv
        } else {
            return pv
        }


    }, '0')


const arrayOfAllFriends = (array) => array.reduce((pv,cv) =>{
    cv.friends.forEach(element => {
        pv.push(element)
    });
    return pv
}, [])    


const stringOfAllAccountNames = (array) => array.reduce((pv,cv) =>{
    if(pv.length == 0){
        return cv.name
    }else{
        return pv + ', '+cv.name
    }
     
}, '')    



const main = async () => {

    fs.readFile(`${__dirname}/data.json`, null, (err, data) => {
        if (err) {
            throw err;
        }

        let array = JSON.parse(data)

        console.log(`########################## array Of Active Accounts Only `)
        console.log(arrayOfActiveAccountsOnly(array))

        console.log(`########################## Highest Balance `)
        console.log(highestBalane(array))

        
        console.log(`########################## Array of all friends `)
        console.log(arrayOfAllFriends(array))

        
        console.log(`########################## String of al account names `)
        console.log(stringOfAllAccountNames(array))

    });


}

main()