# Landing Page Project
[![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)](dependencies) 
[![dependencies](https://img.shields.io/badge/version-v1.1.0-brightgreen)](dependencies) 
[![dependencies](https://img.shields.io/badge/licence-MIT-brightgreen)](dependencies) 
## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Support](#support)
* [License](#license)

## Description

This work is base on a landing webapp by Udacity, containing some css styling and HTML. The goal is to turn  the static page into a dynamic experience,
adding content to the'js/app.js' javascript file.
Using of s gained techniques, earlier in 2020, by Analysis of some  [JQuery 3.2.1](https://code.jquery.com/jquery-3.2.1.js "JQuery source code") parts and [nmpjs es6-set](https://www.npmjs.com/package/es6-set "npmjs source code") polyfill, Mainly the ways of calculating height and how  to change a function context (using call, apply methods). concerned functions ```addClass``` and ```removeClass```.

the app.js includes three main functions:

- ```getComputedHeight``` using getComputedStyle to get computed style.
- ```isLoadededInViewport``` uses calculated element's height, ```window.innerHeight``` and ```getBoundingClientRect``` to say if the element is in the viewport.       
- ```document scroll event``` is used to detect scrolling. 
- ```getElmRect``` used to calculate the coordinates/size of element relative to document instead to viewport!
- ```insertCollapseButton``` and ``````

### Alternatives

to implement similar behaviour: IntersectionObserver could be use. However for the sake of backward compatibility, we use the old school javascript.
Same is to say for ```classList``` property.

[here ](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API "Itersection observer API MDN Documentation")
## Installation
No installation required, create an empty folder and clone the project using git

```
git clone https://github.com/anaruz-source/landing-page.git <!--- fake --->

```
## Usage
Link the app.js to the html index.html

```
<script src="js/app.js"></script>
```
## Support

For any feedback, support, technical issues, security issues

[Contact info](support@landingpage.org)

## License

[MIT](https://choosealicense.com/licenses/mit/) license