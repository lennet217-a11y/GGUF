const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');
function parseGGUF(filePath){const stat=fs.statSync(filePath);const fd=fs.openSync(filePath,'r');const h=Buffer.alloc(24);fs.readSync(fd,h,0,24,0);fs.closeSync(fd);if(h.subarray(0,4).toString('ascii')!=='GGUF')throw new Error('Keine gültige GGUF-Datei.');return {file:path.basename(filePath),path:filePath,sizeBytes:stat.size,version:h.readUInt32LE(4),tensors:Number(h.readBigUInt64LE(8)),metadataCount:Number(h.readBigUInt64LE(16))};}
function createWindow(){const win=new BrowserWindow({width:1180,height:780,minWidth:900,minHeight:620,backgroundColor:'#0b1020',webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false}});win.loadFile(path.join(__dirname,'index.html'));}
ipcMain.handle('pick-gguf',async()=>{const r=await dialog.showOpenDialog({properties:['openFile'],filters:[{name:'GGUF Model',extensions:['gguf']}]});if(r.canceled||!r.filePaths[0])return null;return parseGGUF(r.filePaths[0]);});
ipcMain.handle('system-specs',()=>({platform:process.platform,arch:process.arch,cpu:os.cpus()[0]?.model||'Unknown',cores:os.cpus().length,ramGB:Math.round(os.totalmem()/1024**3*10)/10,freeRamGB:Math.round(os.freemem()/1024**3*10)/10}));
app.whenReady().then(()=>{createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});});app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
