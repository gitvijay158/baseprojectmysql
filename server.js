const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
var userRoute = require("./app/routes/routeUser.js");

var dbConn = require('./app/config/mysqldb.js');

var moment = require('moment'); // require



const PORT = process.env.NODE_DOCKER_PORT || 3001;


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());






app.get("/", function (req, res) {
    datewiseTime();
   // return true;
});


const datewiseTime = async () => {
    dbConn.query("SELECT * FROM `server_up_time` WHERE is_migrated=0 ORDER BY `id` limit 10000", function (err, result) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {

            for (const data of result) {
                var output = convertTime(data)


            }
        }
    });

}



//datewiseTime();

const convertTime = async (dataServerUpTime) => {

    //  SELECT * FROM `server_up_time` WHERE `uptime` LIKE '%25 August 2020%' and uuid='1006BC3A0CED' and school_branch_code='JHICT160' ORDER BY `id` DESC

    // ALTER TABLE `server_up_time` ADD `is_migrated` TINYINT NOT NULL DEFAULT '0' AFTER `client_alias`;
    // ALTER TABLE `server_datewise_uptime_logs` ADD `server_uptime_id` INT NOT NULL AFTER `server_update`, ADD `unique_key` VARCHAR(120) NOT NULL AFTER `server_uptime_id`;
    // ALTER TABLE `server_datewise_uptime_logs` ADD `start_date_time` DATETIME NOT NULL AFTER `unique_key`, ADD `end_day_time` DATETIME NOT NULL AFTER `start_date_time`, ADD `seconds` INT NOT NULL AFTER `end_day_time`;
    // ALTER TABLE `server_datewise_uptime_logs` ADD `totalseconds` INT NOT NULL AFTER `seconds`;

    console.log(dataServerUpTime);

    var dataFormat = dataServerUpTime.uptime;

    // purpose.replace(",", "")
    var result = dataFormat.replace("", "").trim().split(/[\s_]+/);

    console.log(result)

    var startdatetime = result[2] + '-' + result[1] + '-' + result[0] + ' ' + result[3];
    // var startdate  = result[0]+result[1]+result[2];
     console.log(startdatetime);

    var index = 0;
    var tillTime = '';
    for (const data of result) {
        if (index < 4) { index = index + 1; continue; }
        tillTime = tillTime + " " + data;
        index = index + 1;
    }


    var datetime = new Date(startdatetime);
    var startdatetime = new Date(startdatetime);


    if ( moment(startdatetime).format('MMDDYYYYHHmmss') == 'Invalid date'){
        console.log(dataServerUpTime.id);
        return false;
    }

    var uniquekey = moment(startdatetime).format('MMDDYYYYHHmmss') + dataServerUpTime.school_branch_code + dataServerUpTime.uuid;

    // console.log( datetime.getHours()+55)




    var tillTime = tillTime.split(/\,+/);

   

    var changes = 0;

    for (const t of tillTime) {
        var data = t.trim().split(/\s+/);



        if (data[1] && (data[1] == 'days' || data[1] == 'day' || data[1] == 'd')) {
            datetime = moment(datetime).add(parseInt(data[0]), 'days');
            changes = 1;
        }
        if (data[1] && (data[1] == 'hours' || data[1] == 'hour' || data[1] == 'h')) {
            datetime = moment(datetime).add(parseInt(data[0]), 'hours');
            changes = 1;
            // console.log("hours" + parseInt(data[0]))
        }
        if (data[1] && (data[1] == 'minutes' || data[1] == 'minute' || data[1] == 'm')) {
            datetime = moment(datetime).add(parseInt(data[0]), 'minutes');
            changes = 1;
            //console.log("minutes" + parseInt(data[0]))
        }
        if (data[1] && (data[1] == 'seconds' || data[1] == 'second'  || data[1] == 's')) {
            datetime = moment(datetime).add(parseInt(data[0]), 'seconds');
            changes = 1;
            //console.log("minutes" + parseInt(data[0]))
        }

    }

    if(changes==0){
        for (const t of tillTime) {
            var data21 = t.trim().split(/\s+/);

            const reg = /([0-9.]+)(?![0-9.])|([a-z]+)(?![a-z])/gi


            for(const t2 of data21){
                var breakData = t2.trim().match(reg);

                if (breakData[1] == 'd') {
                    datetime = moment(datetime).add(parseInt(breakData[0]), 'days');
                   
                }
                if ( breakData[1] == 'h') {
                    datetime = moment(datetime).add(parseInt(breakData[0]), 'hours');
                    
                }
                if ( breakData[1] == 'm') {
                    datetime = moment(datetime).add(parseInt(breakData[0]), 'minutes');
                   
                }
                if ( breakData[1] == 's') {
                    datetime = moment(datetime).add(parseInt(breakData[0]), 'seconds');
                   
                }
            }

            
    

        }

    }

    // console.log(moment(datetime, "DD MM YYYY hh:mm:ss", true));
    // console.log(tillTime);

   // console.log(datetime)
    var startdate = moment([moment(startdatetime).year(), moment(startdatetime).month(), moment(startdatetime).date(), moment(startdatetime).hours(), moment(startdatetime).minutes()]);
    var enddate = moment([moment(datetime).year(), moment(datetime).month(), moment(datetime).date(), moment(datetime).hours(), moment(datetime).minutes()]);
    var midnightDate = moment([moment(startdatetime).year(), moment(startdatetime).month(), moment(startdatetime).add(1, 'day').date()]);

   //console.log('startdate : ');
   // console.log(startdate)
  //  console.log('enddate : ' ) 
  //  console.log(enddate)


    var totalStartEndSeconds = enddate.diff(startdate, 'seconds');
    var totalSeconds = enddate.diff(midnightDate, 'seconds')
    var perdaysecond = 24 * 60 * 60;

    var insertArray = [];

    //console.log(totalStartEndSeconds + '  '  + totalSeconds)
   // return false

    if (totalStartEndSeconds < perdaysecond) {

        var startdate1 = moment(startdate).format('YYYY-MM-DD HH:mm:ss') //  moment(startdate, "DD-MM-YYYY-hh:mm:ss", true)
        var enddate1 = moment(enddate).format('YYYY-MM-DD HH:mm:ss') //moment(enddate, "DD-MM-YYYY-hh:mm:ss", true)
        var obj = { 'startdate': startdate1, 'enddate': enddate1, 'seconddiff': enddate.diff(startdate, 'seconds') }

        insertArray.push(obj);

        totalSeconds = 0;

    } else {
        var startdate1 = moment(startdate).format('YYYY-MM-DD HH:mm:ss') //moment(startdate, "DD-MM-YYYY-hh:mm:ss", true)
        var midnightDate1 = moment(midnightDate).format('YYYY-MM-DD HH:mm:ss')  // moment(midnightDate, "DD-MM-YYYY-hh:mm:ss", true)
        var obj = { 'startdate': startdate1, 'enddate': midnightDate1, 'seconddiff': midnightDate.diff(startdate, 'seconds') }

        insertArray.push(obj);
    }


    while (totalSeconds > 0) {

        if (totalSeconds > perdaysecond) {


            totalSeconds = totalSeconds - perdaysecond;
            midnightDate = moment(midnightDate).add(parseInt(perdaysecond), 'seconds');
            biginningDate = moment(midnightDate).subtract(parseInt(perdaysecond), 'seconds');
            // 
            var obj = { 'startdate': biginningDate, 'enddate': midnightDate, 'seconddiff': perdaysecond }
            insertArray.push(obj);
        } else {
            // var obj = {  'startdate': moment(midnightDate, "DD-MM-YYYY-hh:mm:ss", true), 'enddate': moment(midnightDate).add(parseInt(totalSeconds), 'seconds'), 'seconddiff': totalSeconds }
            var obj = { 'startdate': moment(midnightDate).format('YYYY-MM-DD HH:mm:ss'), 'enddate': moment(midnightDate).add(parseInt(totalSeconds), 'seconds'), 'seconddiff': totalSeconds }
            insertArray.push(obj);
            totalSeconds = 0;

        }
    }

    //console.log(insertArray);

    if (insertArray.length > 0) {

       await deleteTimeLogs(uniquekey);

        for (const innerData of insertArray) {

            var dateLogs = {
                "school_id": dataServerUpTime.school_id,
                "school_code": dataServerUpTime.school_code,
                "school_branch_code": dataServerUpTime.school_branch_code,
                "uuid": dataServerUpTime.uuid,
                "time": hhmmss(innerData.seconddiff),
                "type": dataServerUpTime.type,
                "unique_identifier": dataServerUpTime.unique_identifier,
                "client_alias": dataServerUpTime.client_alias,
                "created_date":  moment(innerData.startdate).format('YYYY-MM-DD')  ,
                "server_update": moment(innerData.startdate).format('YYYY-MM-DD')  ,
                "server_uptime_id": dataServerUpTime.id,
                "unique_key": uniquekey,
                "start_date_time": moment(innerData.startdate).format('YYYY-MM-DD HH:mm:ss'),
                "end_day_time": moment(innerData.enddate).format('YYYY-MM-DD HH:mm:ss'), 
                "seconds": innerData.seconddiff,
                "totalseconds" : totalStartEndSeconds
            };
            console.log(dateLogs)
          const result =  await insertTimeLogs(dateLogs);   

        }   
        await updateImgratedStatus(dataServerUpTime.id);   

    }





}



var deleteTimeLogs = async(uniquekey) =>{
    await dbConn.query("DELETE FROM server_datewise_uptime_logs WHERE unique_key = ?", [uniquekey]);
}

var insertTimeLogs = async(dateLogs) =>{

    await dbConn.query("INSERT INTO server_datewise_uptime_logs set ?", dateLogs, function (err, res) {
        if (err) {
            console.log("error: ", err);
           
        }
        else {
            console.log(res.insertId);
           
        }
    });

}

var updateImgratedStatus = async(id) =>{

    await  dbConn.query("UPDATE server_up_time SET is_migrated=1 WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            
        } else {
            
        }
    });


}


const pad = (num) => {
    return ("0" + num).slice(-2);
}
const hhmmss =  (secs) => {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
}
//convertTime();




app.listen(PORT, () => {
    console.log("server RND ready")
})
