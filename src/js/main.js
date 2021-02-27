(function () {

    const orgTable = document.querySelector('[nat]');
    const tableHeader = orgTable.querySelector('thead');
    const tableBody = orgTable.querySelector('tbody')

    // start building the nat
    let natTable = '<div class="nat__table">';

    function buildHeader() {
        // start building table header
        if (tableHeader) {
            // find all header items
            const tableHeaderItems = tableHeader.querySelectorAll('th');

            if (tableHeaderItems) {
                natTable += '<div class="nat__row-group" role="rowgroup">'
                natTable += '<div class="nat__row nat__row--header" role="row">';

                // new header th's
                tableHeaderItems.forEach(item => {
                    natTable +=
                        `<div class="nat__cell" role="columnheader">${item.textContent}</div>`;
                })

                // close the header
                natTable += '</div></div>';
            }

            buildBody(tableHeaderItems)

        } else {
            console.error('NAT: No thead found');
            return
        }
    }

    function buildBody(tableHeaderItems) {

        // start building table body
        if (tableBody) {

            // find all body rows
            const tableBodyRows = orgTable.querySelectorAll('tbody tr')
            if (tableBodyRows) {

                natTable += '<div class="nat__row-group" role="rowgroup">';

                // for each body row
                tableBodyRows.forEach(row => {
                    natTable += '<div class="nat__row" role="row">';

                    // find row items
                    let rowItems = row.querySelectorAll('td');
                    rowItems.forEach((item, index) => {
                        natTable += `<div class="nat__cell" role="cell">`;
                        natTable +=
                            `<span class="nat__visible--xs">${tableHeaderItems.item(index).textContent}</span>${item.textContent}</div>`;
                    });

                    // close the row
                    natTable += '</div>';
                });
            }

        } else {
            console.error('NAT: No tbody found')
            return
        }
    }

    buildHeader();

    orgTable.outerHTML = natTable;

})();