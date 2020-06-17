# new note spa

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa
server-->browser: HTML-code
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
server-->browser: main.css
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note

note over browser:
user fills form and 
clicks save button
JS Handler creates a new note, add it
to the list, rerenders the component
and sends POST request to the 
server with JSON data
end note

browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
server->browser: HTTP status code 201 Created