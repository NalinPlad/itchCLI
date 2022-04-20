const childProcess = require("child_process");
const fs = require("fs");
const os = require("os");
const path_mod = require("path");
const { AutoComplete } = require("enquirer");


const apps_path = os.homedir + "/Library/Application Support/itch/apps/";

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

function getApps(path) {
  return fs.readdirSync(path).filter(function (file) {
    return path_mod.extname(path + "/" + file) == ".app";
  });
}

app_dirs = getDirectories(apps_path);
app_names = app_dirs.map((e) => e.replace(/-/g, " "));

const prompt = new AutoComplete({
  name: "app",
  message: "Launch",
  limit: 10,
  initial: 1,
  choices: app_names,
});

app_choice = [];

prompt
  .run()
  .then((answer) => {
    console.log("Launching .. 🚀");

    launch_dir =
      apps_path + getApps(apps_path + answer.replace(/ /g, "-"))[0] + "/";

    console.log(launch_dir);
    
    childProcess.exec(launch_dir, function (err, stdout, stderr) {
            if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
        process.exit(0);// exit process once it is opened
})
  })
  .catch(console.error);
