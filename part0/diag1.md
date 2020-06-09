title HTTP POST Request

note over browser: HTML form data is sent to the server with the POST method
browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
note over server: Server sends redirect response
server->browser: HTTP status code 302
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
server-->browser: HTML-code
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
server-->browser: main.css
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
server-->browser: main.js