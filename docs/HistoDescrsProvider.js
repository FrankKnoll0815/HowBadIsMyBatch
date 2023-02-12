class HistoDescrsProvider {

    static getHistoDescrsForBatchcode(batchcode) {
        return fetch(`data/histograms/global/${batchcode}.json`)
            .then(response => response.json())
            .then(histoDescrs => {
                histoDescrs.histograms.sort((histoDescr1, histoDescr2) => histoDescr1.batchcodes.length - histoDescr2.batchcodes.length);
                return histoDescrs;
            });
    }
}