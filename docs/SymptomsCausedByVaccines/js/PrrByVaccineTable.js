class PrrByVaccineTable {

    #tableElement;
    #table;
    #sumPrrs;

    constructor(tableElement) {
        this.#tableElement = tableElement;
    }

    initialize() {
        this.#table = this.#createEmptyTable();
    }

    display(prrByVaccine) {
        const vaccine_prr_pairs = Object.entries(prrByVaccine);
        this.#setTableRows(vaccine_prr_pairs);
    }

    #createEmptyTable() {
        return this.#tableElement.DataTable(
            {
                search:
                {
                    return: false
                },
                processing: true,
                deferRender: true,
                order: [[this.#getColumnIndex('Proportional Reporting Ratio'), "desc"]],
                columnDefs:
                    [
                        {
                            searchable: false,
                            targets: [this.#getColumnIndex('Proportional Reporting Ratio')]
                        },
                        {
                            render: prr =>
                                NumberWithBarElementFactory
                                    .createNumberWithBarElement(
                                        {
                                            number: prr,
                                            barLenInPercent: prr / this.#sumPrrs * 100
                                        })
                                    .outerHTML,
                            targets: [this.#getColumnIndex('Proportional Reporting Ratio')]
                        }
                    ]
            });
    }

    #getColumnIndex(columnName) {
        switch (columnName) {
            case 'Vaccine':
                return 0;
            case 'Proportional Reporting Ratio':
                return 1;
        }
    }

    #setTableRows(vaccine_prr_pairs) {
        this.#sumPrrs = this.#getSumPrrs(vaccine_prr_pairs);
        this.#table
            .clear()
            .rows.add(vaccine_prr_pairs)
            .draw();
    }

    #getSumPrrs(vaccine_prr_pairs) {
        const prrs = vaccine_prr_pairs.map(vaccine_prr_pair => vaccine_prr_pair[1])
        return Utils.sum(prrs);
    }
}
