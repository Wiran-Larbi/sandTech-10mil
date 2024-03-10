import http from 'node:http'
import {Readable, Transform, Writable} from 'node:stream'

import { createReadStream, readFileSync } from 'fs'
import { stat } from 'node:fs/promises'
import { read } from 'node:fs';

import express from 'express';
import fs from 'fs';
import cors from 'cors';
// import { Transform } from 'node:stream';
import streamify from 'async-stream-generator';
import { randomUUID } from 'node:crypto';

import readline from 'readline';


const app = express();
app.use(cors());

// function * run(){

//     for (let index = 0; index < 100; index++) {
//         yield `username-${index}\n`;
//     }
// }

// function* run(){
//     const stream = fs.createReadStream('usernames.txt', {encoding: 'utf-8'});
//     let buffer = '';
//     stream.on('data', function*(chunk) {
//         buffer += chunk;
//         const lines = buffer.split('\n');
//         buffer = lines.pop();
//         for (const line of lines){
//             const data = {
//                 id: randomUUID(),
//                 username: line.trim()
//             };
//             yield data;
//         }
//     });

//     stream.on('end', function*(){
//         if (buffer){
//             yield buffer;
//         }
//     });

//     stream.on('error', (error) => {
//         console.error('Stream error:', error);
//     });

// }

// async function* generator(stream){
//     for await (const chunk of stream){
//         const data = `${chunk}`;
        
//         yield data;
//     }
// }

// const TransformStream = new Transform({
//     transform(chunk, encoding, callback){
//         const data = "haha";
//         callback(null, data);
//     }

// });

// class StableNormalStringFilter extends Transform {
//     constructor(options) {
//       super(options);
//     }
  
//     _transform(chunk, encoding, callback) {
//       // Convert the chunk to a string
//       const data = chunk.toString();
  
//       // Define your criteria for stable normal strings
//       const isStableNormalString = (str) => {
//         // Example: Check if the string only contains alphanumeric characters and spaces
//         return /^[a-zA-Z0-9\s]+$/.test(str);
//       };
  
//       // Filter out only stable normal strings
//       const stableNormalStrings = data.split('\n').filter((str) => isStableNormalString(str));
  
//       // Join the filtered strings back together with newline characters
//       const filteredData = stableNormalStrings.join(' ');
  
//       // Pass the filtered data to the next stream in the pipeline
//       callback(null, filteredData);
//     }
//   }

//   class UsernameTransformStream extends Transform {
//     constructor(options) {
//       super(options);
//       this.buffer = ''; // Store incomplete lines between data chunks
//     }
  
//     _transform(chunk, encoding, callback) {
//       // Append the chunk to the buffer
//       this.buffer += chunk.toString();
  
//       // Split the buffer into lines
//       const lines = this.buffer.split(/\r?\n/);
  
//       // Process each complete line (except the last one)
//       lines.slice(0, -1).forEach((line) => {
//         // Emit the username
//         this.push(line);
//       });
  
//       // Store the incomplete line for the next chunk
//       this.buffer = lines.slice(-1)[0];
  
//       callback();
//     }
  
//     _flush(callback) {
//       // Emit the last incomplete line, if any
//       if (this.buffer) {
//         this.push(this.buffer);
//       }
//       callback();
//     }
//   }

async function handler(req, res){
    res.writeHead(200, {'Content-Type': 'application/json'});
    // const stream = fs.createReadStream('usernames.txt');
    // const filterStream = new StableNormalStringFilter();
    // const usernameStream = new UsernameTransformStream();

    // stream
    // .pipe(usernameStream)
    // .pipe(filterStream)
    // .on('data', (chunk) => {
    //     res.write(JSON.parse(`{"data": "${chunk}\n" }`)) ;
    // })
    // .on('end', () => {
    //     res.end();
    // });
    

    // stream.pipe(res);

    // const readableStream = Readable({
    //     read(){
    //         for (const data of run()){
    //             this.push(data.concat('\n'));
    //         }
    //         // stream has finished !
    //         this.push(null);
    //     }
    // })
    // streamify(generator(stream)).pipe(res);
    // readableStream.pipe(res);

    // for await (const chunk of generator(stream)){
    //     res.write(chunk);    
    // }

    // res.end();

    //? Lets try interfaces
    const readInterface = readline.createInterface({
        input: fs.createReadStream('usernames.txt'),
        crlfDelay: Infinity
    });

    readInterface.on('line', (username) => {
        // res.write(JSON.stringify({username: username }) + "\n");
        res.write(`${username}\n`);
    });

    readInterface.on('close', () => {
        res.end();
    });

}   

app.get('/stream', handler);

app.use((req, res) => {
    res.status(404).send('Not found');
});

const server = app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});

server.on('error', (error) => {
    console.error('Server error:', error);
});
