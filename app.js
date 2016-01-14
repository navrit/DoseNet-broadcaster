// Dependencies
var fs = require('fs');
var http = require('http');
var obj;

// Global variables
var update_frequency = 3000; // 3 mins [ms] = 5 * 60 * 1000
var current_date = new Date().toLocaleString();
var request = require('superagent');
var geojson;

// Get file to compare against
function readJSONFromFile(){
    console.log("--> OPEN file");
    fs.readFile('output.geojson', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        obj = JSON.parse(data);
        console.log(obj.features[0].properties["Latest measurement"]);
    });
}

// Function to download a file using superagent
function getFile(url){
    var req = request.get(url, function(err, res){
        if (err) throw err;
        console.log('Response ok:', res.ok);
        console.log('Response text:', res.text);
        return res.text;
    });
}

function broadcast(){
    current_date = new Date().toTimeString();
    console.log("Next update in " + update_frequency + " ms @ " + current_date);
    console.log("I'll broadcast here with sockets soon. \n");
}

// Equivalent main function
function main(){
    console.log("DoseNet Broadcast Node.js service! @ " + current_date + "\n");
    try {
        geojson = getFile("https://radwatch.berkeley.edu/sites/default/files/output.geojson");
        setInterval(broadcast, update_frequency);
    } catch(err) {
        console.log(err);
        console.log("FATAL ERROR: main() failure");
    }
}

main();
