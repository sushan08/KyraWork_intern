const fs = require("fs");
const path = require("path");

const File = path.join(__dirname, "task3_log.log");

//format log entry
function format_log(user, action, status = "SUCCESS", ip = "UNKNOWN") {
  const timestamp = new Date().toISOString();
  return `${timestamp} | USER: ${user} | ACTION: ${action} | STATUS: ${status} | IP: ${ip}\n`;
}

//write log
function logEvent(user, action, status = "SUCCESS", ip = "UNKNOWN") {
  const Entry = format_log(user, action, status, ip);
  fs.appendFileSync(File, Entry, "utf8");
  console.log("Log written:", Entry.trim());
}

//delete logs for a specific user
function deleteUserLogs(user) {
  if (!fs.existsSync(File)) {
    console.log("No log file found.");
    return;
  }

  const data = fs.readFileSync(File, "utf8").split("\n");
  const filtered = data.filter(line => line && !line.includes(`USER: ${user}`));
  fs.writeFileSync(File, filtered.join("\n"), "utf8");
  console.log(` All logs for ${user} have been deleted.`);
}

//show file content
function showLogs(label) {
  console.log(`\n--- ${label} ---`);
  if (!fs.existsSync(File)) {
    console.log("Log file not found.");
    return;
  }
  const content = fs.readFileSync(File, "utf8");
  console.log(content || "No logs available.");
}

//example usage
logEvent("sushan@test.com", "LOGIN", "SUCCESS", "192.168.1.10");
logEvent("sushan@test.com", "LOGOUT", "SUCCESS", "192.168.1.10");

logEvent("user@test.com", "LOGIN", "FAILED", "10.0.0.5");

showLogs("Before Deletion");

deleteUserLogs("sushan@test.com");

showLogs("After Deletion");
