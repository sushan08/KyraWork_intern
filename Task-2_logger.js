const fs = require("fs");
const path = require("path");


const File = path.join(__dirname, "logs.log");

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

//example usage
logEvent("sushan@test.com", "LOGIN", "SUCCESS", "192.168.1.10");
logEvent("sushan@test.com", "LOGOUT", "SUCCESS", "192.168.1.10");
