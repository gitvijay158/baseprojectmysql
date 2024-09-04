const express = require("express")
const app = express();
var bodyParser = require('body-parser')
var path = require('path');
const { dirname } = require('path');
const axios = require('axios');
var flatten = require('flat')
var unflatten = require('flat').unflatten
var utility = require('./utilities/utility.js');
const fs = require('fs');



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



// Handling get request// Handling get request
//app.use('/', async () => {


const readjosn = async () => {
    let directory = dirname(require.main.filename) + "/assets/upload";
    var result = await utility.walk(directory);
    result.forEach(async (jsonFilePath) => {


        let filename = path.basename(jsonFilePath);

        let parentDirectory = path.dirname(jsonFilePath).split(path.sep).pop();

        let filedata2 = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
        var result = await flatten(filedata2, { maxDepth: 7 })
        let newJsonObj = {};

        // var jsonArray = Object.entries(result).forEach(async ([key, value]) => {
            // let  count=0
        for(let [key, value] of Object.entries(result)){
            if (key.indexOf("content_id") > 0 || key == 'content_id') {
                let payload = {};
                let res = await axios.post('https://dev-content.extramarks.com/content/v2/contentDetailByOldContentIds?oldContentIds='+value, payload);

                let resultAPI = res.data;
                // console.log(result.data);
                if (resultAPI.message = 'Success') {
                    for(let element of resultAPI.data){
                         console.log('old_id = '+value+ ' new content id ='+ element.content_id)
                         value = element.content_id;         
                    }
                }
            }
            newJsonObj[key] = value;
            
        }

        var result2 = await unflatten(newJsonObj, {
            transformKey: function (key) {
                return key.substring(0, key.length - 0)
            }
        })

        console.log(result2);

        var directoryPath = dirname(require.main.filename) + "/assets/completed/" + parentDirectory;

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        var completedPath = directoryPath + '/' + filename;

        console.log(completedPath);
        fs.writeFileSync(completedPath, JSON.stringify(result2));


    });

}

readjosn();
//})

// makeGetRequest = () => "Hello World!";

// async function makeGetRequest() {

//     let payload = { name: 'John Doe', occupation: 'gardener' };

//     let res = await axios.post('http://httpbin.org/post', payload);

//     let data = res.data;
//     console.log(data);
// }




app.listen(3001, () => {
    console.log("server RND ready")
})
