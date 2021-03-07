<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/paddy-fields/notanothertable">
    <img src="https://github.com/othneildrew/Best-README-Template/raw/master/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">NotAnotherTable</h3>

  <p align="center">
    Responsive <i>and</i> accessible tables, without the headache.
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#installation-options">Installation Methods</a>
      <ul>
        <li><a href="#download">Download</a></li>
        <li><a href="#CDN">CDN</a></li>
        <li><a href="#NPM">NPM</a></li>
        <li><a href="#pre-compliled">Pre-compiled HTML</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#browser-compatibility">Browser Compatibility</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About The Project

<img src="https://i.ibb.co/BypKvSM/notanothetable-screenshot.png" width="600px">

</br>

We've all been there. You're given a desktop design that includes a table and now need to make that display nicely on a screen that's 600px wide. "Ergh, not another...". You get the idea.


NotAnotherTable allows you to write code in semantic ``<table>`` HTML, converting it to a ``<div>`` based responsive version. Utilising the ``role`` attribute, the tables remain suitable for those using screen readers as their ``<table>`` counterparts, as well as looking great on mobile.

## Installation Methods

There are a few ways to install NotAnotherTable.


### Download

* CSS: <a href="https://cdn.jsdelivr.net/npm/notanothertable@1.0.2/dist/css/nat.css">nat.css</a>
* JS: <a href="https://cdn.jsdelivr.net/npm/notanothertable@1.0.2/dist/js/nat-min.js">nat-min.js</a>

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notanothertable@1.0.2/dist/css/nat.css"/>
<script src="https://cdn.jsdelivr.net/npm/notanothertable@1.0.2/dist/js/nat-min.js"></script>
```

### NPM

```sh
npm install notanothertable
```

### Pre-compliled HTML

To save on overhead, you can pre-compile your ``<table>`` HTML using the <a href="www.patrickhurley.co.uk">online version</a>, and then just include the CSS stylesheet in your projects.

## Usage

To initialise NotAnotherTable, simply add ``nat`` as an attribute to any ``<table>`` element.

It's important to create the HTML structures as below, including ``thead`` and ``tbody`` when used in the examples. 

There are 3 configuration options depending on whether you have headers on the x and y axis of the table: <b>default</b>, <b>nat-column</b>, and <b>nat-row</b>.

* * *

### default

By default, NotAnotherTable is set up to expect x and y axis headers.

<table>
    <thead>
        <tr>
            <th></th>
            <th>Column header 1</th>
            <th>Column header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>Row header 1</b></td>
            <td>Cell 1</td>
            <td>Cell 2</td>
        </tr>
        <tr>
            <td><b>Row header 2</b></td>
            <td>Cell 3</td>
            <td>Cell 4</td> 
        </tr>
    </tbody>
</table>

```html
<table nat>
    <thead>
        <tr>
            <th></th>
            <th>Column header 1</th>
            <th>Column header 2</th>
            ..
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row header 1</td>
            <td>Cell 1</td>
            <td>Cell 2</td>
            ..
        </tr>
        <tr>
            <td>Row header 2</td>
            <td>Cell 3</td>
            <td>Cell 4</td> 
            ..
        </tr>
    </tbody>
</table>
```

:iphone: On mobile, this becomes...

<table>
    <thead>
        <tr>
            <th>Row header 1</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>Column header 1:</b> Cell 1</td>
        </tr>
 		<tr>
            <td><b>Column header 2:</b> Cell 2</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th>Row header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>Column header 1:</b> Cell 3</td>
        </tr>
 		<tr>
            <td><b>Column header 2:</b> Cell 4</td>
        </tr>
    </tbody>
</table>


* * *

### nat-column

Add ``nat-column`` if you just have headers on the x-axis.

<table>
    <thead>
        <tr>
            <th>Column header 1</th>
            <th>Column header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cell 1</td>
            <td>Cell 3</td>
        </tr>
        <tr>
            <td>Cell 2</td>
            <td>Cell 4</td> 
        </tr>
    </tbody>
</table>

```html
<table nat nat-column>
    <thead>
        <tr>
            <th>Column header 1</th>
            <th>Column header 2</th>
            ..
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cell 1</td>
            <td>Cell 3</td>
            ..
        </tr>
        <tr>
            <td>Cell 2</td>
            <td>Cell 4</td> 
            ..
        </tr>
    </tbody>
</table>
```

:iphone: On mobile, this becomes...

<table>
    <thead>
        <tr>
            <th>Column header 1</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cell 1</td>
        </tr>
 		<tr>
            <td>Cell 2</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th>Column header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cell 3</td>
        </tr>
 		<tr>
            <td>Cell 4</td>
        </tr>
    </tbody>
</table>

* * *

### nat-row

Add ``nat-row`` if you just have headers on the y-axis.

<table>
    <tbody>
        <tr>
            <td><b>Row header 1</b></td>
            <td>Cell 1</td>
            <td>Cell 2</td>
        </tr>
        <tr>
            <td><b>Row header 2</b></td>
            <td>Cell 3</td>
            <td>Cell 4</td> 
        </tr>
    </tbody>
</table>

```html
<table nat nat-row>
    <tbody>
        <tr>
            <td>Row header 1</td>
            <td>Cell 1</td>
            <td>Cell 2</td>
            ..
        </tr>
        <tr>
            <td>Row header 2</td>
            <td>Cell 3</td>
            <td>Cell 4</td> 
            ..
        </tr>
    </tbody>
</table>
```

:iphone: On mobile, this becomes...

<table>
    <thead>
        <tr>
            <th>Row header 1</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cell 1</td>
        </tr>
 		<tr>
            <td>Cell 2</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th>Row header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cell 3</td>
        </tr>
 		<tr>
            <td>Cell 4</td>
        </tr>
    </tbody>
</table>

## Browser Compatibility

Tested and working on:

* IE7+
* Firefox 
* Safari
* Chrome

## License

Distributed under the MIT License. Have at it.

* * *

Made by <a href="www.patrickhurley.co.uk">Patrick Hurley</a>