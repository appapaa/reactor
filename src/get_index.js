var path = require('path'), fs = require('fs');
var pathList = [];

function fromDir(startPath, filter) {

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        }
        else if (filename.indexOf(filter) > 0) {
            pathList.push(filename.replace(filter, ''));
        }
    }
}

function getComponentName(path) {
    return path.replace(/^Components\\/g, '').replace(/\\/g, '_');
}

function getPath(path) {
    return path.replace(/\\/g, '/');
}

function getImport(path) {
    var name = getComponentName(path);
    if(name==='Loading'){
        return '';
    }
    return ["const " + name + " = Loadable({",
        "	loader: () => import('./" + getPath(path) + "' /* webpackChunkName: '" + name + "' */),",
        "	loading: Loading", "});"].join('\n');
}

fromDir('./Components', '\\index.js');
var fileText = ["'use strict';",
    "import React from 'react';",
    "import ReactDOM from 'react-dom';",
    "import Loadable from 'react-loadable';",
    "import './styles.scss';",
    "import Loading from './Components/Loading';"];
for (i in pathList) {
    fileText.push(getImport(pathList[i]));
}
fileText.push([
    "window.__mainComponent = (name, root, props = {}) => {",
    "   const C = eval(name);",
    "   ReactDOM.render(",
    "   	<C {...props}/>",
    "   	, root)", "};"].join('\n'));
fs.writeFileSync('index.js', fileText.join('\n'));