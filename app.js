// Dependencies
var fs = require('fs');
var http = require('http');
var async = require('async');
var obj;

// Global variables
var update_frequency = 3000; // 3 mins [ms] = 5 * 60 * 1000
var current_date = new Date().toLocaleString();
var file_url = "https://radwatch.berkeley.edu/sites/default/files/output.geojson";

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

// Function to download file using HTTP.get
function getFile () {
    var file_name = "output.geojson";
    var file = fs.createWriteStream(file_name);

    var options = {
        host: "radwatch.berkeley.edu",
        port: 80,
        path: "/sites/default/files/" + file_name
    };

    http.get(options, function(res) {
        res.setEncoding('utf8');
        res
            .on('data', function(data) {
                file.write(data);
                console.log("--> WRITE");
            })
            .on('end', function() {
                file.end();
                console.log("--> GOT " + file_name);
            })
            .on('error', function(e) {
                console.log("--> ERROR " + e.message);
            });
    });

    //callback();
};

function broadcast(){
    current_date = new Date().toTimeString();
    console.log("Next update in " + update_frequency + " ms @ " + current_date);
    console.log("I'll broadcast here with sockets soon. \n");
}

// Equivalent main function
function main(){
    console.log("DoseNet Broadcast Node.js service! @ " + current_date + "\n");
    try {
        /*async.series(
            [
                getFile(),
                readJSONFromFile()
            ],
            function(err) {
                //console.log(err);
            }
        );*/
        //getFile(readJSONFromFile);
        getFile();
        //readJSONFromFile();
        setInterval(broadcast, update_frequency);
    } catch(err) {
        console.log(err);
        console.log("FATAL ERROR: main() failure");
    }
}

main();
