sequenceDiagram
participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa
activate server
server-->>browser: 304 Not Modified
deactivate serrver

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.css
server-->>browser: CSS file

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/spa.js
server-->>browser: JavaScript file

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/data.json
activate server
server-->>browser: [ { content, date }, ... ]
deactivate server
