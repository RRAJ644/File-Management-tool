let fs = require('fs');
let path = require('path');
function treefn(dirpath) {
    if (dirpath==undefined) {  
        treehelper(process.cwd(),"");
        return;
    }
    else{
        if(fs.existsSync(dirpath) == true){
            treehelper(dirpath,"");    
        }
        else{
            console.log("provide correct path");
            return;
        }
    }
}

function treehelper(dirpath, indentation) {
    //check path if it is for file or folder
    let isfile = fs.lstatSync(dirpath).isFile();
    if(isfile){
        let filename = path.basename(dirpath);
        console.log(indentation + "|----" + filename);
    }
    else{
        let dirname = path.basename(dirpath);
        console.log(indentation+"|---"+dirname);
        let childrens = fs.readdirSync(dirpath);
        for (let i = 0; i < childrens.length; i++) {
            let childpath = path.join(dirpath, childrens[i])
            treehelper(childpath, indentation+"\t");
        }
    }
}
module.exports = {
    treeKey : treefn
}