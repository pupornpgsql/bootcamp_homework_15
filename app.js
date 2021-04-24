// This code is based in Office hours training

console.log("app.js loaded");

function DrawBargraph(sampleId){
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        //
        console.log("data contains ...");
        console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);

        console.log("resultArray contains ...");
        console.log(resultArray);

        var result = resultArray[0];

        console.log("result contains ...");
        console.log(result);

        var otu_ids = result.otu_ids;

        var otu_labels = result.otu_labels;

        console.log(otu_labels);

        var sample_values =  result.sample_values;

        console.log(sample_values);

        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
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

        yticks = sample_values.slice(0,10);

        var bubbleChartData = {
            x: otu_ids.slice(0,10).map(otuId => `${otuId}`),
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
            margin: {t: 0},
            hovermode: "closest", // Default mode
            xaxis: { title: "OTU ID" },
            margin: { t: 30}            
        };

        Plotly.newPlot("bubble",bubbleArray, bubbleChartLayout);

    });
    
}

function DrawGaugeChart(sampleId){
    console.log(`ShowMetadata("In DrawGaugeChart SampleID=" + ${sampleId})`);
}

function ShowMetadata(sampleId){
    console.log(`ShowMetadata("In ShowMetadata SampleID=" + ${sampleId})`);
    d3.json("data/samples.json").then((data) => {
        var metadata = data.metadata;
        // Select data for the object with the selected sampleId
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sampleId);
        // Selecting first member in the array
        var result = resultArray[0];
        // Using d3 to select the panel tag with id of `#sample-metadata` in index.html
        var demoPanel = d3.select("#sample-metadata");
    
        // Using .html("") to clear previous data
        demoPanel.html("");
    
        // Add each key and value pair to the panel tag
        Object.entries(result).forEach(([key, value]) => {
          demoPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
          demoPanel.append("hr");
        });
    
        // BONUS: Build the Gauge Chart
        DrawGaugeChart(result.wfreq);
      });
    
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

        var initialId = samplesNames[0];        

        // Show or Update the bargraph
        DrawBargraph(initialId);
        
        // Update the bubblechart
        DrawBubbleChart(initialId);

        // Show or Update the demographic Information
        ShowMetadata(initialId);

    });


}

InitDashboard();