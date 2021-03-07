function NAT() {

    let tableClassName;
    let tableHeader;
    let tableHeaderItems;
    let tableBody;
    let tableType;
    let natTable;
    let error = false;

    function startTable(orgTable) {
    
        tableHeader = orgTable.querySelector('thead');
        tableBody = orgTable.querySelector('tbody');
        tableClassName = orgTable.className;
        
        // Set the table type
        tableType = 'nat-default';
        if (orgTable.hasAttribute('nat-column')) {
            tableType = 'nat-column';
        } else if (orgTable.hasAttribute('nat-row')) {
            tableType = 'nat-row';
        }

        // Start building the nat
        natTable = `<div class="nat__table ${tableType} ${tableClassName}">`;

    }

    function startHeader() {
        
        // Start building nat header
        if (tableHeader) {
            // Find all header items
            tableHeaderItems = tableHeader.querySelectorAll('th');

            if (tableHeaderItems) {
                natTable += '<div class="nat__row-group" role="rowgroup">'
                natTable += '<div class="nat__row nat__row--header" role="row">';

                // New header th's
                tableHeaderItems.forEach(item => {
                    natTable +=
                        `<div class="nat__cell" role="columnheader">${item.textContent}</div>`;
                })

                // Close the header
                natTable += '</div></div>';
            }

        } else {
            if (tableType !== 'nat-row') {
                console.error('NAT: No thead found');
                natTable = null;
                error = true;
            }
        }
    }

    function startBody(orgTable) {

        // Start building nat body
        if (tableBody) {

            // Find all body rows
            let tableBodyRows = orgTable.querySelectorAll('tbody tr')
            if (tableBodyRows) {

                natTable += '<div class="nat__row-group" role="rowgroup">';

                // ! NAT COLUMN
                if (tableType === 'nat-column') {

                    tableHeaderItems.forEach((headerItem, index) => {

                        natTable += '<div class="nat__row" role="row">';
                        natTable += `<div class="nat__cell nat__visible--xs" role="cell">${headerItem.textContent}</div>`;

                        tableBodyRows.forEach((row) => {
                            let rowItem = row.querySelector(`td:nth-of-type(${index+1})`);
                            natTable += `<div class="nat__cell nat__visible--xs" role="cell">${rowItem.textContent}</div>`;

                        });

                        natTable += '</div>';
                    });

                    tableBodyRows.forEach(row => {
                        natTable += '<div class="nat__row nat__hidden--xs" role="row">';

                        let rowItems = row.querySelectorAll('td');
                        rowItems.forEach((item, index) => {
                            natTable += `<div class="nat__cell" role="cell">`;
                            natTable += `<span>${item.textContent}</span>`;
                            natTable += `</div>`;
                        });

                        // Close the row
                        natTable += '</div>';
                    });

                }

                // ! NAT ROW
                else if (tableType === 'nat-row') {
                    
                    tableBodyRows.forEach(row => {
                        natTable += '<div class="nat__row" role="row">';

                        let rowItems = row.querySelectorAll('td');
                        rowItems.forEach((item, index) => {

                            // Create a column header if this is the first cell
                            if (index === 0) {
                                natTable += `<div class="nat__cell" role="columnheader">`;
                            } else {
                                natTable += `<div class="nat__cell" role="cell">`;
                            }

                            natTable += `<span>${item.textContent}</span>`;
                            natTable += `</div>`;
                        });

                        // Close the row
                        natTable += '</div>';
                    });
                }

                // ! NAT DEFAULT
                else {
                    
                    tableBodyRows.forEach(row => {
                        natTable += '<div class="nat__row" role="row">';

                        let rowItems = row.querySelectorAll('td');
                        rowItems.forEach((item, index) => {
                            if (tableHeaderItems.item(index).textContent !== '') {
                                natTable += `<div class="nat__cell" role="cell">`;
                                natTable += `<span class="nat__visible--xs">${tableHeaderItems.item(index).textContent}: </span>`;
                            } else {
                                natTable += `<div class="nat__cell" role="columnheader">`;
                            }
                            natTable += `<span>${item.textContent}</span>`;
                            natTable += `</div>`;
                        });

                        // Close the row
                        natTable += '</div>';
                    });
                }

                // Close the row group
                natTable += '</div>';
            }

        } else {
            console.error('NAT: No tbody found');
            natTable = null;
            error = true;
        }
    }

    // Public function to convert a table to nat
    this.getNAT = (orgTable) => {
        error = false;
        // Create an object if a string has been passed
        if (typeof orgTable !== 'object') {
            let createTableObject = document.createElement('div');
            createTableObject.innerHTML = orgTable;
            orgTable = createTableObject.firstElementChild;
        }
        // Check whether the object is a table
        const isDOM = el => el instanceof Element
        if (isDOM(orgTable)) {
            if (orgTable.tagName === 'TABLE') {

                // Begin building the table
                startTable(orgTable);
                if(!error){
                    startHeader();
                    if(!error){
                        startBody(orgTable);
                        // Close the table
                        if(!error){
                            natTable += '</div>'
                        }
                    }
                }
            } else {
                natTable = null;
                console.error('NAT: No table found');
            }

        } else {
            natTable = null;
            console.error('NAT: No table found');
        }

        // Return the table, null will be returned if there was an error
        return natTable;
    }
};

// Find all nat tables and process them
function natInit() {
    const nat = new NAT();
    const orgTables = document.querySelectorAll('[nat]');
    if (orgTables) {
        orgTables.forEach(orgTable => {
            natTable = nat.getNAT(orgTable);
            if(natTable !== null){
                orgTable.outerHTML = natTable;
            }
        })
    }
}