class PrrByVaccineTableView {

    #prrByVaccineTable;
    #downloadPrrByVaccineTableButton;
    #symptom;

    constructor(prrByVaccineTableElement, downloadPrrByVaccineTableButton) {
        this.#prrByVaccineTable = new PrrByVaccineTable(prrByVaccineTableElement);
        this.#prrByVaccineTable.initialize();
        this.#initializeButton(downloadPrrByVaccineTableButton);
    }

    displayPrrByVaccineTable4Symptom(symptom) {
        UIUtils.disableButton(this.#downloadPrrByVaccineTableButton);
        PrrByVaccineProvider
            .getPrrByVaccine(symptom)
            .then(prrByVaccine => {
                this.#symptom = symptom;
                this.#prrByVaccineTable.display(prrByVaccine);
                UIUtils.enableButton(this.#downloadPrrByVaccineTableButton);
            });
    }

    #initializeButton(downloadPrrByVaccineTableButton) {
        this.#downloadPrrByVaccineTableButton = downloadPrrByVaccineTableButton;
        UIUtils.disableButton(downloadPrrByVaccineTableButton);
        downloadPrrByVaccineTableButton.addEventListener(
            'click',
            () => this.#downloadPrrByVaccine())
    }

    #downloadPrrByVaccine() {
        UIUtils.downloadUrlAsFilename(
            window.URL.createObjectURL(
                new Blob(
                    [this.#prrByVaccineTable.getDisplayedTableAsCsv('# Symptom: ' + this.#symptom)],
                    { type: 'text/csv' })),
            this.#symptom
        );
    }
}
