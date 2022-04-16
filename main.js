#!/usr/bin/env node
//input
let inputarr = process.argv.slice(2);
console.log(inputarr);
let fs = require('fs');
let path = require('path');

//node main.js organize "pathdir"
//node main.js tree "pathdir"
//node main.js help

let helpobj = require('./commands/help');
let treepobj = require('./commands/tree');
let organiseobj = require('./commands/organise');
let command = inputarr[0];
switch(command){
    case "help":
        helpobj.helpKey();
        break;
    case "tree":
        treepobj.treeKey(inputarr[1],"");
        break;
    case "organize":
        organiseobj.organiseKey(inputarr[1]);
        break;
    default:
        console.log("please provide us the command");
        break;
}





