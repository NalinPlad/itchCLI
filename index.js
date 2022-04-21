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

function sanitizePath(path) {
    return path.replace(/ /g, "\\ ")
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

    app_folder = answer.replace(/ /g, "-");

    launch_dir =
      sanitizePath(apps_path) + app_folder + "/" + getApps(apps_path + app_folder)[0] + "/";

    console.log(launch_dir);
    
    childProcess.exec("open "+launch_dir, function (err, stdout, stderr) {
            if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
        process.exit(0);// exit process once it is opened
})
  })
  .catch(console.error);
