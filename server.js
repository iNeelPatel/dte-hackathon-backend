var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require("parse-dashboard");

var api = new ParseServer({
  databaseURI: "mongodb://localhost:27017",
  appId: "myAppId1",
  fileKey: "myFileKey1",
  masterKey: "mySecretMasterKey1"
});

var options = { allowInsecureHTTP: false };

var dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: "http://localhost:1337/parse",
      appId: "myAppId1",
      masterKey: "myMasterKey1",
      appName: "DTE"
    }
  ]
});

var app = express();

// make the Parse Server available at /parse
app.use("/parse", api);

// make the Parse Dashboard available at /dashboard
app.use("/dashboard", dashboard);

var httpServer = require("http").createServer(app);
httpServer.listen(4040);

console.log("App is Running");
