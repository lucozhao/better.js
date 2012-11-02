require("./lib/long-stack-traces");

var fs = require("fs");

function initSecondTimeout(tag) {
    setTimeout(function secondTimeout() {
        throw new Error(tag);
    }, 1000);
}

function onload() {
    // function f() {
    //     throw new Error('foo');
    // }
    // setTimeout(f, Math.random()*1000);
    // setTimeout(f, Math.random()*1000);

    setTimeout(function firstTimeout() {
        initSecondTimeout("timeout");
    }, 100);

    // fs.readFile('README.md', 'utf8', function (err, data) {
    //   if (err) throw err;
    //   initSecondTimeout("readFile");
    // });
}

onload();