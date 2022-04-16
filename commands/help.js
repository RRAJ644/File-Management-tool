
function helpfn(){
    console.log(`
    node main.js organize "pathdir"
    node main.js tree "pathdir"
    node main.js help
    `);
}
module.exports = {
    helpKey : helpfn
}