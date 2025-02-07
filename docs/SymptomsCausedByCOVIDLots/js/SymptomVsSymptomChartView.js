class SymptomVsSymptomChartView {

    #canvas;
    #chart;

    constructor(canvas) {
        this.#canvas = canvas;
    }

    loadAndDisplayChart(symptomX, symptomY) {
        return this
            .#loadChart(symptomX, symptomY)
            .then(({ labels, data }) => {
                this.#displayChart(symptomX, symptomY, labels, data);
                return { labels, data };
            });
    }

    #loadChart(symptomX, symptomY) {
        return Promise
            .all([symptomX, symptomY].map(symptom => PrrByVaccineProvider.getPrrByVaccine(symptom)))
            .then(([prrByLotX, prrByLotY]) => SymptomVsSymptomChartDataProvider.getChartData({ prrByLotX, prrByLotY }));
    }

    #displayChart(symptomX, symptomY, labels, data) {
        if (this.#chart != null) {
            this.#chart.destroy();
        }
        this.#chart =
            new Chart(
                this.#canvas,
                this.#getConfig(symptomX, symptomY, labels, data));
    }

    #getConfig(symptomX, symptomY, labels, data) {
        return {
            type: 'scatter',
            data: this.#getData(labels, data),
            options: this.#getOptions(symptomX, symptomY)
        };
    }

    #getData(labels, data) {
        return {
            datasets:
                [
                    {
                        labels: labels,
                        data: data,
                        backgroundColor: 'rgb(0, 0, 255)'
                    }
                ]
        };
    }

    #getOptions(symptomX, symptomY) {
        return {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: this.#getAxisTitle(symptomX)
                },
                y: {
                    title: this.#getAxisTitle(symptomY)
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'Batch: ' + context.dataset.labels[context.dataIndex];
                        }
                    }
                }
            }
        };
    }

    #getAxisTitle(symptom) {
        return {
            display: true,
            text: 'PRR ratio of Batch for ' + symptom
        }
    }
}