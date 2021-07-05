module.exports = {
    entry: { 
      handler: './handler.js'
    },
    target: 'node',
    mode: 'development',
}

// var handlerFunc = function(){
//   const universal = require("./lambda.js");
//   return universal();
// }

// "use strict";
// import { universal } from "./lambda.js";

// const settings = {
//   entry: { 
//     handler: './lambda.js',
//     function: ()=> {      
//       return universal;
//     }
//   },
//   target: 'node',
//   mode: 'development',
//   output: {
//     filename: "lambda.js",
//     path: __dirname + "/.webpack/service"
// output: {
//   filename: '[name].[hash:8].js',
//   chunkFilename: '[id].[chunkhash].js',
//   path: __dirname + "/.webpack/service"
// }
//   }
// }

// export {
//   settings
// }