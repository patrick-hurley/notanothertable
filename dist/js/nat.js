"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * nat v1.1.3
 * (c) 2021 Patrick Hurley
 * @license MIT
 */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.nat = factory());
})(void 0, function () {
  'use strict';

  var tableClassName;
  var tableHeader;
  var tableHeaderItems;
  var tableBody;
  var tableType;
  var natTable = {
    hasError: false,
    errorString: null
  };

  function startTable(orgTable) {
    tableHeader = orgTable.querySelector('thead');
    tableBody = orgTable.querySelector('tbody');
    tableClassName = orgTable.className; // Set the table type

    tableType = 'nat-default';

    if (orgTable.hasAttribute('nat-column')) {
      tableType = 'nat-column';
    } else if (orgTable.hasAttribute('nat-row')) {
      tableType = 'nat-row';
    } // Start building the nat


    natTable.display = "<div class=\"nat__table ".concat(tableType, " ").concat(tableClassName, "\" role=\"table\">");
  }

  function startHeader() {
    // Start building nat header
    if (tableHeader) {
      // Find all header items
      tableHeaderItems = tableHeader.querySelectorAll('th');

      if (tableHeaderItems) {
        natTable.display += '<div class="nat__row-group" role="rowgroup">';
        natTable.display += '<div class="nat__row nat__row--header" role="row">'; // New header th's

        tableHeaderItems.forEach(function (item) {
          natTable.display += "<div class=\"nat__cell nat__cell--header\" role=\"columnheader\">".concat(item.innerHTML, "</div>");
        }); // Close the header

        natTable.display += '</div></div>';
      }
    } else {
      if (tableType !== 'nat-row') {
        natTable.display = null;
        natTable.hasError = true;
        natTable.errorString = 'NAT: No thead found';
        console.error(natTable.errorString);
      }
    }
  }

  function startBody(orgTable) {
    // Start building nat body
    if (tableBody) {
      // Find all body rows
      var tableBodyRows = orgTable.querySelectorAll('tbody tr');

      if (tableBodyRows) {
        natTable.display += '<div class="nat__row-group nat__body" role="rowgroup">'; // ! NAT COLUMN

        if (tableType === 'nat-column') {
          tableHeaderItems.forEach(function (headerItem, index) {
            natTable.display += '<div class="nat__row" role="row">';
            natTable.display += "<div class=\"nat__cell nat__visible--xs\" role=\"cell\">".concat(headerItem.innerHTML, "</div>");
            tableBodyRows.forEach(function (row) {
              var rowItem = row.querySelector("td:nth-of-type(".concat(index + 1, ")"));
              natTable.display += "<div class=\"nat__cell nat__visible--xs\" role=\"cell\">".concat(rowItem.innerHTML, "</div>");
            });
            natTable.display += '</div>';
          });
          tableBodyRows.forEach(function (row) {
            natTable.display += '<div class="nat__row nat__hidden--xs" role="row">';
            var rowItems = row.querySelectorAll('td');
            rowItems.forEach(function (item) {
              natTable.display += "<div class=\"nat__cell\" role=\"cell\">";
              natTable.display += "<span>".concat(item.innerHTML, "</span>");
              natTable.display += "</div>";
            }); // Close the row

            natTable.display += '</div>';
          });
        } // ! NAT ROW
        else if (tableType === 'nat-row') {
            tableBodyRows.forEach(function (row) {
              natTable.display += '<div class="nat__row" role="row">';
              var rowItems = row.querySelectorAll('td');
              rowItems.forEach(function (item, index) {
                // Create a column header if this is the first cell
                if (index === 0) {
                  natTable.display += "<div class=\"nat__cell nat__cell--header\" role=\"columnheader\">";
                } else {
                  natTable.display += "<div class=\"nat__cell\" role=\"cell\">";
                }

                natTable.display += "<span>".concat(item.innerHTML, "</span>");
                natTable.display += "</div>";
              }); // Close the row

              natTable.display += '</div>';
            });
          } // ! NAT DEFAULT
          else {
              tableBodyRows.forEach(function (row) {
                natTable.display += '<div class="nat__row" role="row">';
                var rowItems = row.querySelectorAll('td');
                rowItems.forEach(function (item, index) {
                  if (tableHeaderItems.item(index).innerHTML !== '') {
                    natTable.display += "<div class=\"nat__cell\" role=\"cell\">";
                    natTable.display += "<span class=\"nat__visible--xs nat__cell--header\">".concat(tableHeaderItems.item(index).innerHTML, ": </span>");
                  } else {
                    natTable.display += "<div class=\"nat__cell nat__cell--header\" role=\"columnheader\">";
                  }

                  natTable.display += "<span>".concat(item.innerHTML, "</span>");
                  natTable.display += "</div>";
                }); // Close the row

                natTable.display += '</div>';
              });
            } // Close the row group


        natTable.display += '</div>';
      }
    } else {
      natTable.display = null;
      natTable.hasError = true;
      natTable.errorString = 'NAT: No tbody found';
      console.error(natTable.errorString);
    }
  } // Public function to convert a table to nat


  function convert(orgTable) {
    natTable.hasError = false;
    natTable.errorString = null; // Create an object if a string has been passed

    if (_typeof(orgTable) !== 'object') {
      var createTableObject = document.createElement('div');
      createTableObject.innerHTML = orgTable;
      orgTable = createTableObject.firstElementChild;
    } // Check whether the object is a table


    var isDOM = function isDOM(el) {
      return el instanceof Element;
    };

    if (isDOM(orgTable)) {
      if (orgTable.tagName === 'TABLE' && orgTable.hasAttribute('nat')) {
        // Begin building the table
        startTable(orgTable);

        if (!natTable.hasError) {
          startHeader();

          if (!natTable.hasError) {
            startBody(orgTable); // Close the table

            if (!natTable.hasError) {
              natTable.display += '</div>';
            }
          }
        }
      } else {
        natTable.display = null;
        natTable.hasError = true;
        natTable.errorString = 'NAT: No table found';
        console.error(natTable.errorString);
      }
    } else {
      natTable.display = null;
      natTable.hasError = true;
      natTable.errorString = 'NAT: No table found';
      console.error(natTable.errorString);
    } // Return the table, null will be returned if there was an error


    return natTable;
  }

  function init() {
    var _this = this;

    var orgTables = document.querySelectorAll('[nat]');

    if (orgTables) {
      orgTables.forEach(function (orgTable) {
        natTable = _this.convert(orgTable);

        if (natTable.display !== null) {
          orgTable.outerHTML = natTable.display;
        }
      });
      console.log('NAT initiated');
    }
  } // return public functions


  return Object.freeze({
    convert: convert,
    init: init
  });
});