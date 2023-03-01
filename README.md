# casparcg-batcher
A simple batch utility to run AMCP commands from the shell or a .bat file. (e.g PLAY 1-10 file LOOP)

### Download:
You can download latest release here (just download the .exe file):
<https://github.com/olzzon/casparcg-batcher/releases/latest>

### Run:
#### Create a JSON file with the following structure in the same folder as the .exe file:

```
{
    "host": "192.168.1.67",
    "port": 5250,
    "commands": [
        "PLAY 2-10 AMB",
        "PLAY 1-12 [html] https://google.com"
    ]
}
```

#### Open cmd and call:
```
casparcg-batcher-win-x64.exe configfile.json
```


