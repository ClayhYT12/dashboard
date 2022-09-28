import app from '../app.js'
import https from "https"
import fs from 'fs'

https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },app).listen(80);

