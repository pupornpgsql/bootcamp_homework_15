console.log("app.js loaded")

function InitDashboard(){
    console.log("InitDashboard()")

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then(function(data){
        console.log(data);
    });

    // Update the bargraph

    // Update the bublechart

    // Update the demographic Information
}

InitDashboard();