(function () {

    let orgTable;
    let tableHeader;
    let tableHeaderItems;
    let tableBody;
    let tableType;
    let natTable;

    function initNAT(){
        orgTable = document.querySelector('[nat]');
        tableHeader = orgTable.querySelector('thead');
        tableBody = orgTable.querySelector('tbody');
        tableType = 'nat-default';
        if(document.body.contains(document.querySelector('[nat-column]'))) {
            tableType = 'nat-column';
        }
        else if(document.body.contains(document.querySelector('[nat-row]'))) {
            tableType = 'nat-row';
        }
        // start building the nat
        natTable = `<div class="nat__table ${tableType}">`;
    }

    function buildHeader() {
        // start building table header
        if (tableHeader) {
            // find all header items
            tableHeaderItems = tableHeader.querySelectorAll('th');

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

        } else {
            if(tableType !== 'nat-row'){
                console.error('NAT: No thead found');
                return
            }
        }
    }

    function buildBody() {

        // start building table body
        if (tableBody) {

            // find all body rows
            let tableBodyRows = orgTable.querySelectorAll('tbody tr')
            if (tableBodyRows) {

                natTable += '<div class="nat__row-group" role="rowgroup">';

                // ! NAT COLUMN
                if(tableType === 'nat-column') {

                    tableHeaderItems.forEach((headerItem, index) => {
                        
                        natTable += '<div class="nat__row" role="row">';
                        natTable += `<div class="nat__cell nat__visible--xs" role="cell">${headerItem.textContent}</div>`;

                        tableBodyRows.forEach((row) => {
                            let rowItem = row.querySelector(`td:nth-of-type(${index+1})`);
                            natTable += `<div class="nat__cell nat__visible--xs" role="cell">${rowItem.textContent}</div>`;
                            
                        });


                        natTable += '</div>';
                    });

                    // for each body row
                    tableBodyRows.forEach(row => {
                        natTable += '<div class="nat__row nat__hidden--xs" role="row">';

                        // find row items
                        let rowItems = row.querySelectorAll('td');
                        rowItems.forEach((item, index) => {
                            natTable += `<div class="nat__cell" role="cell">`;
                            natTable += `<span>${item.textContent}</span>`;
                            natTable += `</div>`;
                        });

                        // close the row
                        natTable += '</div>';
                    });

                }

                // ! NAT ROW
                else if(tableType === 'nat-row') {
                    // for each body row
                    tableBodyRows.forEach(row => {
                        natTable += '<div class="nat__row" role="row">';

                        // find row items
                        let rowItems = row.querySelectorAll('td');
                        rowItems.forEach((item, index) => {
                            
                            if(index === 0){
                                natTable += `<div class="nat__cell" role="columnheader">`;  
                            }
                            else {
                                natTable += `<div class="nat__cell" role="cell">`;
                            }
                            
                            natTable += `<span>${item.textContent}</span>`;
                            natTable += `</div>`;
                        });

                        // close the row
                        natTable += '</div>';
                    });
                }


                // ! NAT DEFAULT
                else {
                    // for each body row
                    tableBodyRows.forEach(row => {
                        natTable += '<div class="nat__row" role="row">';

                        // find row items
                        let rowItems = row.querySelectorAll('td');
                        rowItems.forEach((item, index) => {
                            if(tableHeaderItems.item(index).textContent !== ''){
                                natTable += `<div class="nat__cell" role="cell">`;
                                natTable += `<span class="nat__visible--xs">${tableHeaderItems.item(index).textContent}: </span>`;
                            }
                            else {
                                natTable += `<div class="nat__cell" role="columnheader">`;  
                            }
                            natTable += `<span>${item.textContent}</span>`;
                            natTable += `</div>`;
                        });

                        // close the row
                        natTable += '</div>';
                    });
                }

                // close the row group
                natTable += '</div>';
            }

        } else {
            console.error('NAT: No tbody found')
            return
        }
    }

    if(document.body.contains(document.querySelector('[nat'))) {
        initNAT();
        if(buildHeader() !== 'error') { buildBody() } 
        orgTable.outerHTML = natTable;
    }
    
})();