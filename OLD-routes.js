//OUTDATED//
// MANUALLY SETTING UP NODEJS SERVER //
/* const fs = require('fs') // imports the file system core module

const requestHandler = (req, res) => {
    console.log(req) // logs the the incoming requests into terminal
    const url = req.url; // stores the request url in a constant
    const method = req.method;
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title> Enter Message </title></head>')
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message><button type="submit">Send now</button></form></body>')
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
}

module.exports = requestHandler; // makes this file into a module, so it can be imported in the app.js file */