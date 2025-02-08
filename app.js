const express = require("express");
const ejs = require("ejs");
const path = require("path");
const PhotonParser = require("./scripts/classes/PhotonPacketParser");
var Cap = require("cap").Cap;
var decoders = require("cap").decoders;
const WebSocket = require("ws");
const fs = require("fs");

const { getAdapterIp } = require("./server-scripts/adapter-selector");

const app = express();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.use(express.static(__dirname + "/views"));

// Adicione uma data de expira��o
const expirationDate = new Date('2025-02-20T23:59:59'); 

// Verifique se a data atual � posterior � data de expira��o
if (new Date() > expirationDate) {
  console.log('O programa n�o pode ser mais aberto. Data de expira��o atingida.');
  process.exit(1); // Encerra o programa
}

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const viewName = "main/home";
  res.render("layout", { mainContent: viewName });
});

app.get("/home", (req, res) => {
  const viewName = "main/home";
  res.render("./layout", { mainContent: viewName });
});

app.get("/resources", (req, res) => {
  const viewName = "main/resources";
  res.render("layout", { mainContent: viewName });
});

app.get("/enemies", (req, res) => {
  const viewName = "main/enemies";
  res.render("layout", { mainContent: viewName });
});

app.get("/chests", (req, res) => {
  const viewName = "main/chests";
  res.render("layout", { mainContent: viewName });
});

app.get("/map", (req, res) => {
  const viewName = "main/map";
  const viewRequireName = "main/require-map";

  fs.access("./images/Maps", function (error) {
    if (error) {
      res.render("layout", { mainContent: viewRequireName });
    } else {
      res.render("layout", { mainContent: viewName });
    }
  });
});

app.get("/ignorelist", (req, res) => {
  const viewName = "main/ignorelist";
  res.render("layout", { mainContent: viewName });
});

app.get("/drawing", (req, res) => {
  res.render("main/drawing");
});

app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/mob-info", express.static(__dirname + "/mob-info"));
app.use("/scripts/Handlers", express.static(__dirname + "/scripts/Handlers"));
app.use("/scripts/Drawings", express.static(__dirname + "/scripts/Drawings"));
app.use("/scripts/Utils", express.static(__dirname + "/scripts/Utils"));
app.use("/images/Resources", express.static(__dirname + "/images/Resources"));
app.use("/images/Maps", express.static(__dirname + "/images/Maps"));
app.use("/images/Items", express.static(__dirname + "/images/Items"));
app.use("/images/Flags", express.static(__dirname + "/images/Flags"));
app.use("/sounds", express.static(__dirname + "/sounds"));
app.use("/config", express.static(__dirname + "/config"));

const port = 5001;

app.listen(port, () => {
  console.log(`Online - Copie e cole no seu navegador a url> http://localhost:${port}`);
  import("open")
    .then((open) => {
      open.default(`http://localhost:${port}`).then(() => {
        setTimeout(() => {
          open.default(`http://localhost:${port}/drawing`);
        }, 1000); // Adjust the delay as needed
      });
    })
    .catch((err) => {
      console.error("Failed to open browser:", err);
    });
});

var c = new Cap();

let adapterIp;

if (fs.existsSync("ip.txt"))
  adapterIp = fs.readFileSync("ip.txt", { encoding: "utf-8", flag: "r" });

if (!adapterIp) {
  adapterIp = getAdapterIp();
} else {
  console.log();
  console.log('Mindware');
  console.log('discord.gg/xyFuZw7gdz');
  console.log('.');
  console.log(`Usando o ultimo adaptador selecionado - ${adapterIp}`);
  console.log('Se quiser trocar de adaptador, exclua o arquivo "ip.txt".');
  console.log();
}

let device = Cap.findDevice(adapterIp);

if (device == undefined) {
  console.log();
  console.log(`O ultimo adaptador noo esta funcionando, escolha um novo, apague ip.txt na pasta e escolha novamente.`);
  console.log();

  adapterIp = getAdapterIp();
  device = Cap.findDevice(adapterIp);
}

const filter = "udp and (dst port 5056 or src port 5056)";
var bufSize = 4096;
var buffer = Buffer.alloc(4096);
const manager = new PhotonParser();
var linkType = c.open(device, filter, bufSize, buffer);

c.setMinBytes && c.setMinBytes(0);

// setup Cap event listener on global level
c.on("packet", function (nbytes, trunc) {
  let ret = decoders.Ethernet(buffer);
  ret = decoders.IPV4(buffer, ret.offset);
  ret = decoders.UDP(buffer, ret.offset);

  let payload = buffer.slice(ret.offset, nbytes);

  // Parse the UDP payload
  try {
    manager.handle(payload);
  } catch {}
});

const server = new WebSocket.Server({ port: 5002, host: "localhost" });
server.on("listening", () => {
  manager.on("event", (dictonary) => {
    const dictionaryDataJSON = JSON.stringify(dictonary);
    server.clients.forEach(function (client) {
      client.send(
        JSON.stringify({ code: "event", dictionary: dictionaryDataJSON }),
      );
    });
  });

  manager.on("request", (dictonary) => {
    const dictionaryDataJSON = JSON.stringify(dictonary);
    server.clients.forEach(function (client) {
      client.send(
        JSON.stringify({ code: "request", dictionary: dictionaryDataJSON }),
      );
    });
  });

  manager.on("response", (dictonary) => {
    const dictionaryDataJSON = JSON.stringify(dictonary);
    server.clients.forEach(function (client) {
      client.send(
        JSON.stringify({ code: "response", dictionary: dictionaryDataJSON }),
      );
    });
  });
});

server.on("close", () => {
  console.log("closed");
  manager.removeAllListeners();
});
