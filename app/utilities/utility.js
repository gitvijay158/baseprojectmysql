var recursive = require("recursive-readdir");
var rra = require('recursive-readdir-async');

var walk = async function (dir) {
/*
    const options = {
    mode: rra.LIST,
    recursive: true,
    stats: false,
    ignoreFolders: true,
    extensions: false,
    deep: false,
    realPath: true,
    normalizePath: true,
    include: [],
    exclude: [],
    readContent: false,
    encoding: 'base64'
}
const result = await rra.list(dir, options, function (obj, index, total) {
    console.log(`${index} of ${total} ${obj.path}`)
   // obj.custom = { foo: 'bar' };// use custom key to inject custom properties
    if(obj.name=="assets")
        return true;// return true to delete item from the result array
})

//test(dir);
if(result.error)
    return result.error
else
   return result

   })

*/

 
 
var result = await recursive(dir)    ;      
return result;

};


var test = async function (dir, result){
    console.log(dir, result);
}

module.exports = { walk , test};
