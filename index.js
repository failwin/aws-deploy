const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes");

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const PORT = process.env.PORT || 8181;
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "client")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

const httpServer = http.createServer(app);
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`We have a ${NODE_ENV} server running on PORT: ${PORT}`);
});
