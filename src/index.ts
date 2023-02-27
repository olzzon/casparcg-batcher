import { createConnection } from "net";
import fs from "fs";

interface IConfigFile {
  host: string;
  port: number;
  commands: string[];
}

let configs: IConfigFile = {host: "127.0.0.1", port: 5250, commands: []};

const configFile = process.argv[2];
console.log("Using config file", configFile);
try {
  configs = JSON.parse(fs.readFileSync(configFile, "utf8"));
  console.log(configs);
} catch (e) {
  console.log("Error:", e.stack);
}

const socket = createConnection(configs.port, configs.host, () => {
  console.log("Connected to CasparCG");
});
socket
  .on("data", (data) => {
    console.log("Received data from CasparCG", data.toString());
  })
  .on("connect", () => {
    console.log("Send command to CasparCG");
    configs.commands.forEach((cmd: string) => {
      socket.write(
        cmd +
          "\r\n",
        (e) => (e ? console.log("Error", e) : console.log("Sent"))
      );
    });
  })
  .on("error", (err) => {
    console.log("Error", err);
  })
  .on("close", () => {
    console.log("Connection closed");
  });
