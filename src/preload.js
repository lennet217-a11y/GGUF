const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('ggufLab',{pickGGUF:()=>ipcRenderer.invoke('pick-gguf'),systemSpecs:()=>ipcRenderer.invoke('system-specs')});
