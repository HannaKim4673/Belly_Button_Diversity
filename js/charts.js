function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1
// 1. Create the buildCharts function.
// function buildCharts(sample) {
//   // 2. Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
//     // 3. Create a variable that holds the samples array. 
//     var sampleArray = data.samples;
//     // 4. Create a variable that filters the samples for the object with the desired sample number.
//     var resultArray = sampleArray.filter(sampleObject => sampleObject.id == sample);
//     //  5. Create a variable that holds the first sample in the array.
//     var result = resultArray[0];

//     // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
//     var otuIds = result.otu_ids;
//     var otuLabels = result.otu_labels;
//     var sampleValues = result.sample_values;
//     // 7. Create the yticks for the bar chart.
//     // Hint: Get the the top 10 otu_ids and map them in descending order  
//     //  so the otu_ids with the most bacteria are last. 

//     var yticks = otuIds.slice(0,10).reverse();
//
//     // 8. Create the trace for the bar chart. 
//     var barData = [{
//       x: sampleValues.slice(0,10).reverse(),
//       y: yticks,
//       text: otuLabels,
//       type: "bar",
//       orientation: 'h'
//     }];
//     // 9. Create the layout for the bar chart. 
//     var barLayout = {
//       title: "Top 10 Bacteria Found in Belly Button",
//       yaxis: {
//         type: 'category',
//       }
//     };
//     // 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot("bar", barData, barLayout);
//   });
// }

// Deliverable 2
// Bar and Bubble charts
// Create the buildCharts function.
// function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
//     // 3. Create a variable that holds the samples array. 
//     var sampleArray = data.samples;
//     // 4. Create a variable that filters the samples for the object with the desired sample number.
//     var resultArray = sampleArray.filter(sampleObject => sampleObject.id == sample);
//     //  5. Create a variable that holds the first sample in the array.
//     var result = resultArray[0];

//     // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
//     var otuIds = result.otu_ids;
//     var otuLabels = result.otu_labels;
//     var sampleValues = result.sample_values;
//     // 7. Create the yticks for the bar chart.
//     // Hint: Get the the top 10 otu_ids and map them in descending order  
//     //  so the otu_ids with the most bacteria are last. 

//     var yticks = otuIds.slice(0,10).reverse();

//     // 8. Create the trace for the bar chart. 
//     var barData = [{
//       x: sampleValues.slice(0,10).reverse(),
//       y: yticks,
//       text: otuLabels,
//       type: "bar",
//       orientation: 'h'
//     }];
//     // 9. Create the layout for the bar chart. 
//     var barLayout = {
//       title: "Top 10 Bacteria Found in Belly Button",
//       yaxis: {
//         type: 'category',
//       }
//     };
//     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot("bar", barData, barLayout); 

//     // 1. Create the trace for the bubble chart.
//     var bubbleData = [{
//       x: otuIds,
//       y: sampleValues,
//       text: otuLabels,
//       mode: "markers",
//       marker: {
//         color: otuIds,
//         size: sampleValues
//       }
//     }];

//     // 2. Create the layout for the bubble chart.
//     var bubbleLayout = {
//       title: "Bacteria Cultures for Chosen Subject",
//       xaxis: {
//         title: "OTU ID",
//         automargin: true,
//       },
//       yaxis: {
//         automargin: true
//       },
//       hovermode: 'closest'
//     };

//     // 3. Use Plotly to plot the data with the layout.
//     Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
//   });
// }

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var sampleArray = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = sampleArray.filter(sampleObject => sampleObject.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var firstMetadata = metadataArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;     
    var sampleValues = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var washingFrequency = firstMetadata.wfreq;
    // Create the yticks for the bar chart.
    var yticks = otuIds.slice(0,10).reverse();

    // Use Plotly to plot the bar data and layout.
    // Create trace for bar chart
    var barData = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels,
      type: "bar",
      orientation: 'h'
    }];
    // Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Found in Belly Button",
      yaxis: {
        type: 'category',
      }
    };
    Plotly.newPlot("bar", barData, barLayout);

    // Use Plotly to plot the bubble data and layout.
    // Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        color: otuIds,
        size: sampleValues
      }
    }];
    // Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures for Chosen Subject",
      xaxis: {
        title: "OTU ID",
        automargin: true,
      },
      yaxis: {
        automargin: true
      },
      hovermode: 'closest'
    };
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: washingFrequency,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10] },
        bar: { color: "black"},
        steps: [
          { range: [0, 2], color: "red" },
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "lime" },
          { range: [8, 10], color: "green"}
        ]
      }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 400,
      margin: { t: 0, b: 0 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}