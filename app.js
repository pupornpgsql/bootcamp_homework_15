// This code is based in Office hours training

console.log("app.js loaded");

function DrawBargraph(sampleId){
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        //

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);

        console.log(resultArray);

        var result = resultArray[0];

        console.log(result);

        var otu_ids = result.otu_ids;

        var otu_labels = result.otu_labels;

        console.log(otu_labels);

        var sample_values =  result.sample_values;

        console.log(sample_values);

        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`);

        var barData = {
            x: sample_values.slice(0,10),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10),
            orientation: "h"

        };

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}

        };

        Plotly.newPlot("bar",barArray, barLayout);

    });

}

function DrawBubbleChart(sampleId){
    console.log(`DrawBubleChart(${sampleId})`);


    d3.json("data/samples.json").then(data => {
        //

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);

        console.log(resultArray);

        var result = resultArray[0];

        console.log(result);

        var otu_ids = result.otu_ids;

        var otu_labels = result.otu_labels;

        console.log(otu_labels);

        var sample_values =  result.sample_values;

        console.log(sample_values);

        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`);

        var bubbleChartData = {
            x: sample_values.slice(0,10),
            y: yticks,
            mode: "markers",
            text: otu_labels.slice(0,10),
            marker: {
                size: sample_values.slice(0,10),
                color: otu_ids,
                colorscale: "Earth"
              }

        };

        var bubbleArray = [bubbleChartData];

        var bubbleChartLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}

        };

        Plotly.newPlot("bubble",bubbleArray, bubbleChartLayout);

    });
    
}

function ShowMetadata(sampleId){
    console.log(`ShowMetadata(${sampleId})`);
    
}

function optionChanged(newSampleId){
    console.log(`User selected ${newSampleId} `);

    DrawBargraph(newSampleId);
    DrawBubbleChart(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard(){
    console.log("InitDashboard()")

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(data => {
        console.log(data);

        var samplesNames =  data.names;

        samplesNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        var id = samplesNames[0];        

        // Show or Update the bargraph
        DrawBargraph(id);
        
        // Update the bubblechart
        DrawBubbleChart(id);

        // Show or Update the demographic Information
        ShowMetadata(id);

    });


}

InitDashboard();