console.log("app.js loaded");

function DrawBargraph(sampleId){
    console.log(`DrawBargraph(${sampleId})`);

}

function DrawBublechart(sampleId){
    console.log(`DrawBublechart(${sampleId})`);
    
}

function ShowMetadata(sampleId){
    console.log(`ShowMetadata(${sampleId})`);
    
}

function optionChanged(newSampleId){
    console.log(`User selected ${newSampleId} `);

    DrawBargraph(newSampleId);
    DrawBublechart(newSampleId);
    ShowMetadata(newSampleId);
}

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

        var id = samplesNames[0];

        DrawBargraph(id);
        DrawBublechart(id);
        ShowMetadata(id);


    });

    // Update the bargraph

    // Update the bublechart

    // Update the demographic Information
}

InitDashboard();