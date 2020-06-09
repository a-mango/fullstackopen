note over browser:
JS Handler creates a new note, add it
to the list, rerenders the post list
and sends POST request to the 
server with JSON data
end note

browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
server->browser: HTTP status code 201 Created