let alleleChart;

// Function to update graph when p or q is changed
function updateGraph() {
    let p = parseFloat(document.getElementById("pValue").value);
    let q = 1 - p; // Ensure p + q = 1

    document.getElementById("pDisplay").innerText = p.toFixed(2);
    document.getElementById("qDisplay").innerText = q.toFixed(2);

    let generations = Array.from({ length: 10 }, (_, i) => i); // 10 generations
    let pValues = generations.map(gen => p * (0.98 ** gen)); // Simulate slight selection
    let qValues = generations.map(gen => 1 - pValues[gen]);

    alleleChart.data.labels = generations;
    alleleChart.data.datasets[0].data = pValues;
    alleleChart.data.datasets[1].data = qValues;
    alleleChart.update();
}

// Function to initialize the graph
function createGraph() {
    let ctx = document.getElementById("alleleChart").getContext("2d");
    alleleChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: Array.from({ length: 10 }, (_, i) => i),
            datasets: [
                {
                    label: "Dominant Allele (p)",
                    borderColor: "#ff6f00",
                    borderWidth: 2,
                    fill: false,
                    data: Array(10).fill(0.5)
                },
                {
                    label: "Recessive Allele (q)",
                    borderColor: "#0077b6",
                    borderWidth: 2,
                    fill: false,
                    data: Array(10).fill(0.5)
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: "Generations" } },
                y: { title: { display: true, text: "Allele Frequency" }, min: 0, max: 1 }
            }
        }
    });

    updateGraph(); // Update with initial values
}

// Initialize graph on page load
window.onload = createGraph;
