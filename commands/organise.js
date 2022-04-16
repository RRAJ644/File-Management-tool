let fs = require('fs');
let path = require('path');
let types = {
    document : ['txt','pdf'],
    Image : ['jpeg','png','jpg'],
    Application : ['exe','apk'],
    Videos : ['mp4']
};
function organizefn(dirpath){
    //1. input path from user
    let destpath;
    if (dirpath==undefined) {
        destpath = process.cwd();
        // console.log("please provide the path");
        return;
    }
    else{
        //2. create directory named as orgainsed folder
        if(fs.existsSync(dirpath) == true){
            destpath = path.join(dirpath,"orgainsed_folder");
            if(fs.existsSync(destpath)==false){
                fs.mkdirSync(destpath);
            }       
        }
        else{
            console.log("provide correct path");
            return;
        }
    }
    //3. find the category of the file under the dirpath and also create the category folder
    organizehelper(dirpath, destpath);
}

function organizehelper(src,dest){
    let childname = fs.readdirSync(src);
    //console.log(childname);
    for (let  i = 0; i < childname.length; i++) {
        let childaddress = path.join(src,childname[i]);
        // console.log(childaddress);
        //if path is file we will proceed
        //else won't proceed

        let isfile = fs.lstatSync(childaddress).isFile();
        if(isfile==true){
            // console.log(childname[i]);
            //3. cateory identification
            let category = getCategory(childname[i]);
            // console.log(childname[i], "belongs to category ", category);
            //4. cut/copy the files from the source file given and paste it under the category
            sendfile(childaddress,dest,category);
        }

    }
}

function getCategory(name){
    let ext = path.extname(name);
    ext=ext.slice(1);
    // console.log(ext);
    // compare it with the the keys inside the objects
    for(let keys in types){
        let cytypearr = types[keys];
        for (let i= 0; i< cytypearr.length; i++) {
            if (ext==cytypearr[i]) {
                return keys;
            }
        } 
    }
    return "other";
}

function sendfile(srcfilepath,dest,category) {
    let categorypath = path.join(dest,category);
    if (fs.existsSync(categorypath)==false) {
        fs.mkdirSync(categorypath);   
    }
    let filename = path.basename(srcfilepath);
    let destpathfile = path.join(categorypath,filename);
    fs.copyFileSync(srcfilepath,destpathfile);
    fs.unlinkSync(srcfilepath);
    console.log(filename , "copies to", category);
}

module.exports = {
    organiseKey : organizefn
}