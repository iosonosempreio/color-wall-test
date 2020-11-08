let express = require("express")
let port = 3000
let app = express()
app.use(express.static('public'))

let server = app.listen(port);

console.log("I am up and running!")
