const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config();

const PORT = process.env.NODE_DOCKER_PORT || 3001;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



const str = 'ab ba c';
const convertToNato = (str = '') => {
   let nato = {
      a: 'Alfa',
      b: 'Bravo'
    }
   let arr = [...str];
   console.log(arr);

   return arr
   .filter((letter) => letter !== " ")
   .map((letter) => {

    //     console.log(letter)
    //   if( /[^a-z]/.test(letter.toLowerCase()) ) {
    //      return letter
    //   }
    //   else { 
        return nato[letter.toLowerCase()]; 
    //}
   }).join(' ');
}
console.log(convertToNato(str));

// Example 5
// var myAwesomeArray = [1, 2, 3, 4, 5]


// var final = myAwesomeArray.map(x => x * x).reduce((total,value) =>{
//     return total+ value
// })

// console.log(final)

// var data = myAwesomeArray.map(x => x * x)

// console.log(data);
// var data2 = data.reduce((total, value) => { 

//     console.log('total :' + total + ' value :' + value )
//    return total + value
// })


// console.log(data2);

//example 3
// var str = 'this is my home'
// data = str.split(" ").map(word => {
//    return word.split("").reverse().join("");
// }).join(" ");


// console.log(data);


// example 1
// const points = [-1, 40, -3, 40, 1, 5,-10, 25, 10];
// console.log(points) ;

// let arr =[]
// points.forEach((element, index) => {
//     if (element > 0 ){       
//         arr.push(element)
//     }
// })
// arr.sort((a,b) => a-b );
// index =0

// var arr2 =[]

// points.forEach((element) => {
//   if (element > 0 ){       
//         arr2.push(arr[index])
//         index = index+1;      
//     }else{
//         arr2.push(element)
//     }
// })
// console.log(arr2)

//Example 2
// const points = [-1, 40, -3, 40, 1, 5,-10, 25, 10];
// points.sort(  (a, b) =>  {
//   console.log (a+ ' = ' +b);
//   return a - b
//   }
// );

// console.log(points) ;
app.listen(PORT, () => {
    console.log("server RND ready")
})
