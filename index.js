const http = require('http');
const url = require('url')

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

    if (req.url === '/createUser') {
        const randomUserName = Math.floor(Math.random() * userName.length) + 1
        const userDetails = {
            id: user?.userTable?.length + 1,
            name: userName[randomUserName],
            gender: 'Male',
            contact: '01741313873',
            address: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
        }
        // user.userTable.push(userDetails)
        fs.readFile('./user.json', (err, data) => {
            // console.log(data)
            const json = JSON.parse(data)
            json.push(userDetails)
            fs.writeFile('./user.json', JSON.stringify(json), err => {
                if (err) {
                    console.log(err)
                }
            })
        }
        )
    }

})
const port = 5000
listener.listen(port)
console.log('server is running on ', port)
