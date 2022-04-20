const childProcess = require("child_process");
const fs = require("fs");
const os = require("os");
const { AutoComplete } = require("enquirer");

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

app_dirs = getDirectories(
  os.homedir + "/Library/Application Support/itch/apps/"
);
app_names = app_dirs.map((e) => e.replace(/-/g, " "));

const prompt = new AutoComplete({
  name: "app",
  message: "Launch",
  limit: 10,
  initial: 2,
  choices: app_names,
});

app_choice = [];

prompt
  .run()
  .then((answer) => {
    
    console.log(answer);
  })
  .catch(console.error);

// childProcess.exec('start Example.xlsx', function (err, stdout, stderr) {
//         if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(stdout);
//     process.exit(0);// exit process once it is opened
// })
