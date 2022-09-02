
const fs = require('fs');

exports.getRandomUser = (req, res) => {
    fs.readFile('../user.json', (err, data) => {
        const user =JSON.parse(data)
        const randomUser=Math.floor(Math.random()+user.length)+1
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(randomUser));
        console.log(randomUser)
    })
}

