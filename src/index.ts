import { createConnection } from "net";
import fs from "fs";

interface IConfigFile {
  host: string;
  port: number;
  commands: string[];
}

let configFile: IConfigFile = { host: "127.0.0.1", port: 5250, commands: [] };

const configFileName = process.argv[2];
console.log("Using config file", configFileName);
try {
  configFile = JSON.parse(fs.readFileSync(configFileName, "utf8"));
  console.log(configFile);
} catch (err: any) {
  console.log("Error:", err?.stack);
}

const socket = createConnection(configFile.port, configFile.host, () => {
  console.log("Connected to CasparCG");
});
socket
  .on("data", (data) => {
    console.log("Received data from CasparCG", data.toString());
  })
  .on("connect", () => {
    console.log("Send command to CasparCG");
    configFile.commands.forEach((cmd: string) => {
      socket.write(cmd + "\r\n", (err: any) =>
        err ? console.log("Error", err) : console.log("Sent")
      );
    });
    setInterval(() => {
      socket.destroy();
    }, 2000);
  })
  .on("close", () => {
    console.log("Connection closed");
  });
