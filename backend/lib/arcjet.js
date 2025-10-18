import arcjet,{tokenBucket, shield, detectBot} from "@arcjet/node";

import "dotenv/config";

// init arcjet

//Understand about Arcjet, Ratelimiting, tokenbucket and after that come to this point and make changes.
// const aj = arcjet({
//     key: process.env.ARCJET_KEY,
//     characteristics: ["ip.src"],
//     rules: [

//     ]
// })