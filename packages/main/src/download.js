const fse = require('fs-extra');
const fs = require('fs');
const sharp = require('sharp');
const request = require('superagent');

import { requestHandle } from './ipHandle';

export class DownloadManager {
  
    constructor(win) {
        this.queue = [];
        this.win = win;
        this.successCount = 0;
        this.errorCount = 0;
    }

    clear(){
        this.queue = [];
        this.successCount = 0;
        this.errorCount = 0;
    }

    
    async addTask(task) {
        while (this.queue.length >= 1000) {
            await new Promise(resolve => setTimeout(resolve, 100)); // 等待一段时间后重试
        }
        this.queue.push(task);
        this.executeTask(task);
    }
    
    async popTask(task, success){
        let index = this.queue.indexOf(task); // 查找值为4的元素的索引
        if (index !== -1) {
            this.queue.splice(index, 1);
            if(success){
                this.successCount ++;
            }else{
                this.errorCount ++;
            }
            this.win.webContents.send('download-progress', {
                successCount: this.successCount,
                errorCount: this.errorCount,
            });
        }
      
    }

    async executeTask(args) {
        try {
            const sharpStream = sharp({
              failOnError: true,
            });
            if(args.patch){
              const exists = await fse.pathExists(args.savePath); 
              console.log('文件存在：' + args.savePath );
              if(exists){
                this.popTask(args, true);
                return;
              }    
            }
            const promises = [];
            if (args.imageBuffer) { // 前端下载
              const base64Data = args.imageBuffer.replace(/^data:image\/\w+;base64,/, '');
              const dataBuffer = Buffer.from(base64Data, 'base64');
              promises.push(
                sharpStream
                  .composite([{ input: dataBuffer, gravity: 'centre', blend: 'dest-in' }])
                  .toFile(args.savePath),
              );
            } else {
              promises.push(sharpStream.toFile(args.savePath));
            }
            requestHandle(request.get(args.url)).pipe(sharpStream);
            Promise.all(promises)
              .then(() => {
                  this.popTask(args, true);
                  console.log('下载完成:'+ this.successCount + '__'+ args.savePath);
              })
              .catch(() => {
                try {
                  fs.unlinkSync(args.savePath);
                } catch (e) {
                  console.error(e);
                }
                this.popTask(args, false);
              });
            } catch (error) {
                this.popTask(args, false);
            }
      }
}

