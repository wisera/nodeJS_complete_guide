const { fstat } = require('fs');
const http = require('http'); // require() method imports modules, in this case is importing http core module
const fs = require('fs') // imports the file system core module

// the createServer() method on the http function has a callback function as its first argument
// this callback function is called requestListener
// in this function the first argument is the request and the second the response
// this method returns a Server object which is your actual nodeJS server
// then you can call a method on this server object to listen on a specific port and there you can interact w/ it
// req is the http request, when a user access a page
// res is the http response, what the server responds to a certain http request
// res.write() method writes whatever you want back to the request 

const server = http.createServer((req, res) => { 
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
    if (method === 'POST') {
        const body = []; // empty array to store data
        req.on('data', (chunk) => { // the on() method is an event listener, it listen to an event, its first argument is the name of the event
            // the second argument is a callback function where the arg is the chunks of data stream
            console.log(chunk) // stream of data, not workable
            body.push(chunk); // adds the data stream to the empty array
        }); // to be able to work w/ this data stream you must create another event listener and call a buffer on the data stream
        req.on('end', () => { // listens for the end of the data stream
            const parsedBody = Buffer.concat(body).toString() // stores the buffer on a constant, 
            // and calls a method to concat the buffer into the array created and convert it into a string
            console.log(parsedBody) // the data is in a key value format, where the key is the name of the input html tag, in this case message
            // and the value is whatever the user adds as input
            const message = parsedBody.split('=')[1] // this extracts only the user input from the data
            fs.writeFileSync('message.txt', message) // stores the suer input into a file
        })
        // fs.writeFileSync('message', 'DUMMY') this method of the filesystem module writes a file, 
        // the first arg is the name of the file, and the second its contents
        res.statusCode = 302 // status code of 302 is redirect, so you want to respond teh user that you redirected them to somewhere else
        res.setHeader('Location', '/') // this is the location of the redirect
        return res.end()
    }
    res.setHeader('Content-Type', 'text/html') // this a default response header
    res.write('<html>') // responds w/ a simple html page
    res.write('<head><title>My first page</title></head>')
    res.write('<body><h1>hello from Node.js server</body></h1>')
    res.write('</html>')
    res.end() // must have a end() to stop
}) 

server.listen(3000) // server is now live on port 3000 w/ the simple html page displayed