const http = require('http');
const url = require('url')
const express = require('express');
const app = express()
const getRandomUser = require('./api/getRandomUser.js')
app.use(express.json())


const fs = require('fs');
const user = {
    userTable: [

    ]
}

const userName = ['Thomas', 'Tom Cruise', 'Stark', 'Randy', 'Hemsworth', 'Steve']

const listener = http.createServer((req, res) => {

    if (req.url === '/') {
        res.write('<p>This is home page</p>')
    }

    // create user 
    if (req.url === '/createUser') {

        const randomUserName = Math.floor(Math.random() * userName.length) + 1
        const userDetails = {
            name: userName[randomUserName],
            gender: 'Male',
            contact: '01741313873',
            address: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
        }
        // user.userTable.push(userDetails)
        fs.readFile('./user.json', (err, data) => {
            // console.log(data)
            const json = JSON.parse(data)
            userDetails.id = json.length + 1
            json.push(userDetails)
            fs.writeFile('./user.json', JSON.stringify(json), err => {
                if (err) {
                    console.log(err)
                }
            })
        }
        )
    }
    // random user 
    else if (req.url === '/user/random') {
        fs.readFile('./user.json', (err, data) => {
            const user = JSON.parse(data)
            const randomUser = Math.floor(Math.random() * user.length)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user[randomUser]));

        })
    }
    //  all user 
    else if ((req.url === '/user/all') || req.url.includes('/user/all?limit')) {
        // const limit  = req.query.limit 

        const limit = url.parse(req.url, true).query.limit
        console.log(limit)
        fs.readFile('./user.json', (err, data) => {
            const user = JSON.parse(data)
            res.setHeader('Content-Type', 'application/json');
            if (limit < user.length && limit >= 0) {
                res.end(JSON.stringify(user[+limit]));
            } else {
                res.end(JSON.stringify(user));
            }

        })
    }

})
const port = 5000
listener.listen(port)
console.log('server is running on ', port)


// app.use('/user',getRandomUser)













