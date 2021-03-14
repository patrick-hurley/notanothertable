/**
 * nat v1.0.0
 * (c) 2021 Patrick Hurley
 * @license MIT
 */
 (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.nat = factory());
  }(this, function () { 'use strict';
  
      let tableClassName;
      let tableHeader;
      let tableHeaderItems;
      let tableBody;
      let tableType;
      let natTable = {
          error: false
      };
  
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
          natTable.display = `<div class="nat__table ${tableType} ${tableClassName}" role="table">`;
      }
  
      function startHeader() {
  
          // Start building nat header
          if (tableHeader) {
              // Find all header items
              tableHeaderItems = tableHeader.querySelectorAll('th');
  
              if (tableHeaderItems) {
                  natTable.display += '<div class="nat__row-group" role="rowgroup">'
                  natTable.display += '<div class="nat__row nat__row--header" role="row">';
  
                  // New header th's
                  tableHeaderItems.forEach(item => {
                      natTable.display +=
                          `<div class="nat__cell nat__cell--header" role="columnheader">${item.innerHTML}</div>`;
                  })
  
                  // Close the header
                  natTable.display += '</div></div>';
              }
  
          } else {
              if (tableType !== 'nat-row') {
                  natTable.display = null;
                  natTable.error = 'NAT: No thead found'
                  console.error(natTable.error);
  
              }
          }
      }
  
      function startBody(orgTable) {
  
          // Start building nat body
          if (tableBody) {
  
              // Find all body rows
              let tableBodyRows = orgTable.querySelectorAll('tbody tr')
              if (tableBodyRows) {
  
                  natTable.display += '<div class="nat__row-group nat__body" role="rowgroup">';
  
                  // ! NAT COLUMN
                  if (tableType === 'nat-column') {
  
                      tableHeaderItems.forEach((headerItem, index) => {
  
                          natTable.display += '<div class="nat__row" role="row">';
                          natTable.display += `<div class="nat__cell nat__visible--xs" role="cell">${headerItem.innerHTML}</div>`;
  
                          tableBodyRows.forEach((row) => {
                              let rowItem = row.querySelector(`td:nth-of-type(${index+1})`);
                              natTable.display += `<div class="nat__cell nat__visible--xs" role="cell">${rowItem.innerHTML}</div>`;
  
                          });
  
                          natTable.display += '</div>';
                      });
  
                      tableBodyRows.forEach(row => {
                          natTable.display += '<div class="nat__row nat__hidden--xs" role="row">';
  
                          let rowItems = row.querySelectorAll('td');
                          rowItems.forEach((item) => {
                              natTable.display += `<div class="nat__cell" role="cell">`;
                              natTable.display += `<span>${item.innerHTML}</span>`;
                              natTable.display += `</div>`;
                          });
  
                          // Close the row
                          natTable.display += '</div>';
                      });
                  }
  
                  // ! NAT ROW
                  else if (tableType === 'nat-row') {
  
                      tableBodyRows.forEach(row => {
                          natTable.display += '<div class="nat__row" role="row">';
  
                          let rowItems = row.querySelectorAll('td');
                          rowItems.forEach((item, index) => {
  
                              // Create a column header if this is the first cell
                              if (index === 0) {
                                  natTable.display += `<div class="nat__cell nat__cell--header" role="columnheader">`;
                              } else {
                                  natTable.display += `<div class="nat__cell" role="cell">`;
                              }
                              console.log(item);
  
                              natTable.display += `<span>${item.innerHTML}</span>`;
                              natTable.display += `</div>`;
                          });
  
                          // Close the row
                          natTable.display += '</div>';
                      });
                  }
  
                  // ! NAT DEFAULT
                  else {
  
                      tableBodyRows.forEach(row => {
                          natTable.display += '<div class="nat__row" role="row">';
  
                          let rowItems = row.querySelectorAll('td');
                          rowItems.forEach((item, index) => {
                              if (tableHeaderItems.item(index).innerHTML !== '') {
                                  natTable.display += `<div class="nat__cell" role="cell">`;
                                  natTable.display += `<span class="nat__visible--xs nat__cell--header">${tableHeaderItems.item(index).innerHTML}: </span>`;
                              } else {
                                  natTable.display += `<div class="nat__cell nat__cell--header" role="columnheader">`;
                              }
                              natTable.display += `<span>${item.innerHTML}</span>`;
                              natTable.display += `</div>`;
                          });
  
                          // Close the row
                          natTable.display += '</div>';
                      });
                  }
  
                  // Close the row group
                  natTable.display += '</div>';
              }
  
          } else {
              natTable.display = null;
              natTable.error = 'NAT: No tbody found';
              console.error(natTable.error);
          }
      }
  
      // Public function to convert a table to nat
      function convert(orgTable) {
          natTable.error = false;
          // Create an object if a string has been passed
          if (typeof orgTable !== 'object') {
              let createTableObject = document.createElement('div');
              createTableObject.innerHTML = orgTable;
              orgTable = createTableObject.firstElementChild;
          }
          // Check whether the object is a table
          const isDOM = el => el instanceof Element
          if (isDOM(orgTable)) {
              if (orgTable.tagName === 'TABLE' && orgTable.hasAttribute('nat')) {
  
                  // Begin building the table
                  startTable(orgTable);
                  if (!natTable.error) {
                      startHeader();
                      if (!natTable.error) {
                          startBody(orgTable);
                          // Close the table
                          if (!natTable.error) {
                              natTable.display += '</div>'
                          }
                      }
                  }
              } else {
                  natTable.display = null;
                  natTable.error = 'NAT: No table found';
                  console.error(natTable.error);
              }
  
          } else {
              natTable.display = null;
              natTable.error = 'NAT: No table found';
              console.error(natTable.error);
          }
  
          // Return the table, null will be returned if there was an error
          return natTable;
      }
  
      function init() {
  
          const orgTables = document.querySelectorAll('[nat]');
          if (orgTables) {
              orgTables.forEach(orgTable => {
                  natTable = this.convert(orgTable);
                  if (natTable.display !== null) {
                      orgTable.outerHTML = natTable.display;
                  }
              })
              console.log('NAT initiated');
          }
      }
  
      // return public functions
      return Object.freeze({
          convert: convert,
          init: init
      });
  
  }));