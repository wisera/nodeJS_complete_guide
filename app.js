const express = require('express')

const app = express()

app.use('/add-product',(req, res, next) => {
    console.log('another middleware')
    res.send('<h1>Product</h1>') // send method is like write method, it allow you to send back a response
})

app.use((req, res, next) => { // use method runs takes a function as its first argument, and this function will be executed for every incomeng request
    console.log('IN the middleware') // this function has 3 args, request, response, and next, which is actually a function
    next()
}) // next allows the request to continue to the next use method
// use method allow you to use middleware which is how expressJS works

app.use((req, res, next) => {
    console.log('another middleware')
    res.send('<h1>Hello</h1>')
})

app.listen(3000) // listen method for express does behind the scenes the http.startServer for you














// Code below uses OLD-routes.js external file to start nodeJS server manually //

/* const routes = require('./routes'); // imports the routing logic from another file

// const fs = require('fs') // imports the file system core module

const server = http.createServer(routes); // routes is the constant that holds the function that would go inside .createServer method, which is below

server.listen(3000) */

// NOTES //
// The code below has all the logic to have a running nodeJS server
// it has been moved to a separate file to be imported 

// the createServer() method on the http function has a callback function as its first argument
// this callback function is called requestListener
// in this function the first argument is the request and the second the response
// this method returns a Server object which is your actual nodeJS server
// then you can call a method on this server object to listen on a specific port and there you can interact w/ it
// req is the http request, when a user access a page
// res is the http response, what the server responds to a certain http request
// res.write() method writes whatever you want back to the request 

/* const server = http.createServer((req, res) => { 
    console.log(req) // logs the the incoming requests into terminal
    const url = req.url; // stores the request url in a constant
    const method = req.method;
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title> Enter Message </title></head>')
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message><button type="submit">Send</button></form></body>')
            // creates a form w/ a button of type submit if you access the url '/' 
            // notice the body's tag action, that is the target url after submiting the form
        res.write('</html>')
        return res.end() // must have return because you want to exit the condition and not execute any code after
    }
    if (url === '/message' && method === 'POST') {
        const body = []; // empty array to store data
        req.on('data', (chunk) => { // the on() method is an event listener, it listen to an event, its first argument is the name of the event
            // the second argument is a callback function where the arg is the chunks of data stream
            console.log(chunk) // stream of data, not workable
            body.push(chunk); // adds the data stream to the empty array
        }); // to be able to work w/ this data stream you must create another event listener and call a buffer on the data stream
        return req.on('end', () => { // listens for the end of the data stream, there's a return because you don't want the rest of the code to be executed
            const parsedBody = Buffer.concat(body).toString() // stores the buffer on a constant, 
            // and calls a method to concat the buffer into the array created and convert it into a string
            console.log(parsedBody) // the data is in a key value format, where the key is the name of the input html tag, in this case message
            // and the value is whatever the user adds as input
            const message = parsedBody.split('=')[1] // this extracts only the user input from the data
            fs.writeFile('message.txt', message, err => { // stores the user input into a file
                res.statusCode = 302 // status code of 302 is redirect, so you want to respond teh user that you redirected them to somewhere else
                res.setHeader('Location', '/') // this is the location of the redirect
                return res.end()
            }) // fs.writeFile('message', 'DUMMY', callbackFunction() {}) this method of the filesystem module writes a file, 
        }); // the first arg is the name of the file, and the second its contents, and the third is a callback function   
    } // this function is what you want to be done next after the file is written, the arg of this function is err, for handling errors
    res.setHeader('Content-Type', 'text/html') // this a default response header
    res.write('<html>') // responds w/ a simple html page
    res.write('<head><title>My first page</title></head>')
    res.write('<body><h1>hello from Node.js server</body></h1>')
    res.write('</html>')
    res.end() // must have a end() to stop
}) 

server.listen(3000) // server is now live on port 3000 w/ the simple html page displayed */

