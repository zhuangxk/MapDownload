import {contextBridge} from 'electron';
const { ipcRenderer } = require('electron');

const apiKey = 'electron';
let imageDownloadhandle;
let downloadProgressHandle;
ipcRenderer.on('imageDownloadDone', (event, state) => {
  imageDownloadhandle && imageDownloadhandle(state);
});
ipcRenderer.on('download-progress', (event, state) => {
  downloadProgressHandle && downloadProgressHandle(state);
});
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api = {
  versions: process.versions,
  ipcRenderer: { ...ipcRenderer },
  imageDownloadDone: (callback) => {
    imageDownloadhandle = callback;
  },
  downloadProgress: (callback) => {
    downloadProgressHandle = callback;
  },
};

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api);
