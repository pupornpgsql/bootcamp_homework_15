console.log("app.js loaded")

function InitDashboard(){
    console.log("InitDashboard()")

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then(function(data){
        console.log(data);

        var samplesNames =  data.names;

        samplesNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });


    });

    // Update the bargraph

    // Update the bublechart

    // Update the demographic Information
}

InitDashboard();