// 下载
import { setState, setProgress } from './progress';
// eslint-disable-next-line
import { judgeTile, testDraw2 } from './baseMap';
import { ClipImage } from './clipImage';
// import { cloneDeep } from 'lodash';
const CLIPIMAGE = new ClipImage();
/**
 * 下载瓦片
 * @param {Array} list 瓦片列表
 * @param {Function} apiDownload 下载方法
 * @returns
 */
export function downloadLoop (list, apiDownload) {

  if (!Array.isArray(list) || typeof apiDownload !== 'function') return;
  const length = list.length;
  if (length === 0) return;

  const statistics = {success: 0, error: 0, percentage: 0, count: length};
  let index = 0;
  const download = () => {
    if (index >= length) {
      statistics.percentage = 100;
      setProgress(statistics);
      setState(false);
      window.$message.success(`下载完成。下载成功${statistics.success}，下载失败${statistics.error}`);
      return;
    }
    const item = list[index];
    statistics.percentage = Number((index / length * 100).toFixed(2));
    apiDownload(item);
    index++;
  };
  download();
  window.electron.imageDownloadDone(state => {
    if (state.state === 'completed') {
      statistics.success++;
    } else {
      statistics.error++;
    }
    setProgress(statistics);
    download();
  });
}

/**
 * 下载瓦片并裁切
 * @param {Array} list 瓦片列表
 * @param {Function} apiDownload 下载方法
 * @param {maptalks.TileLayer} tileLayer 下载瓦片图层
 * @param {maptalks.Geometry} downloadGeometry 下载范围
 * @param {String} imageType 瓦片格式
 * @returns
 */
export function downloadClipLoop (list, apiDownload, tileLayer, downloadGeometry, imageType) {
  if (!Array.isArray(list) || typeof apiDownload !== 'function') return;
  const length = list.length;
  if (length === 0) return;

  // 获取坐标投影信息
  const { width, height } = tileLayer.getTileSize();
  const spatialReference = tileLayer.getSpatialReference();
  const prj = spatialReference.getProjection();
  const fullExtent = spatialReference.getFullExtent();
  const code = prj.code;
  const statistics = {success: 0, error: 0, percentage: 0, count: length};
  let index = 0;
  const download = async () => {
    if (index >= length) {
      statistics.percentage = 100;
      setProgress(statistics);
      setState(false);
      window.$message.success(`下载完成。下载成功${statistics.success}，下载失败${statistics.error}`);
      return;
    }
    const item = list[index];
    statistics.percentage = Number((index / length * 100).toFixed(2));
    const relation = judgeTile(downloadGeometry, {
      width,
      height,
      spatialReference,
      prj,
      fullExtent,
      code,
      tile: {x:item.x, y:item.y,z:item.zoom},
    });
    if (relation === 1) {
      apiDownload(item);
      index++;
    } else if (relation === 2) {
      index++;
      statistics.success++;
      setProgress(statistics);
      download();
    } else if (typeof relation === 'object') {
      // testDraw2(tileLayer, relation.intersection);
      // 裁切下载
      CLIPIMAGE.addTempGeometry(relation.intersection, relation.rect);
      const imageBuffer = await CLIPIMAGE.getImage(imageType);
      item.imageBuffer = imageBuffer;
      apiDownload(item);
      index++;
    }
  };
  download();
  window.electron.imageDownloadDone(state => {
    if (state.state === 'completed') {
      statistics.success++;
    } else {
      statistics.error++;
    }
    setProgress(statistics);
    download();
  });
}

/**
 * 下载单张瓦片
 * @param {*} tile 瓦片参数
 * @param {*} downloadOption 下载参数
 * @returns Promise
 */

let list = [];

export function awaitDownLoad(){
  const result = [];
  return new Promise((resolve) => {
    window.electron.imageDownloadDone(state => {
      result.push(state);
      console.log(result.length, list.length);
      if(result.length >= list.length){
        list = [];
        resolve({
          success: result.filter(i=>i.state=='completed').length,
          error: result.filter(i=>i.state=='error').length,
        });
      }
    });

  });
}

export async function downloadImage (tile, downloadOption) {
  const { clipImage } = downloadOption;
  const downloadMethod = clipImage ? _downloadClipImage : _downloadImage;
  if( list.length < 1000 ){
    list.push(downloadMethod(tile, downloadOption));
    return;
  } else {
    Promise.race(list);
    const res =  await awaitDownLoad();
    list.push(downloadMethod(tile, downloadOption));
    return res;
  }
}



/**
 * 下载单张瓦片
 * @param {*} tile
 * @param {*} downloadOption
 * @returns
 */


function _downloadImage (tile, downloadOption) {
  return new Promise((resolve) => {
    const temppath = downloadOption.downloadPath + tile.z + '/' + tile.x;
    window.electron.ipcRenderer.send('ensure-dir', temppath);
    const savePath = temppath + '/' + tile.y + downloadOption.pictureType;
    const param = {zoom: tile.z, url:tile.url, savePath, x:tile.x, y:tile.y, patch: downloadOption.patch};
    window.electron.ipcRenderer.send('save-image', param);
    resolve(true);
  });
}

/**
 * 下载单张瓦片并裁切
 * @param {*} tile
 * @param {*} downloadOption
 * @returns
 */
function _downloadClipImage (tile, downloadOption) {
  return new Promise((resolve) => {
    const { tileLayer, downloadGeometry, pictureType, downloadPath, imageType } = downloadOption;
    // 获取坐标投影信息
    const { width, height } = tileLayer.getTileSize();
    const spatialReference = tileLayer.getSpatialReference();
    const prj = spatialReference.getProjection();
    const fullExtent = spatialReference.getFullExtent();
    const code = prj.code;

    const apiDownload = (temp, imageBuffer) => {
      const temppath = downloadPath + temp.z + '/' + temp.x;
      window.electron.ipcRenderer.send('ensure-dir', temppath);
      const savePath = temppath + '/' + temp.y + pictureType;
      const param = {zoom: temp.z, url:temp.url, savePath, x:temp.x, y:temp.y, imageBuffer, patch: downloadOption.patch};
      window.electron.ipcRenderer.send('save-image', param);
    };

    const item = tile;
    const relation = judgeTile(downloadGeometry, {
      width,
      height,
      spatialReference,
      prj,
      fullExtent,
      code,
      tile: {x:item.x, y:item.y,z:item.zoom || item.z},
    });
    if (relation === 1) {
      apiDownload(item);
    } else if (relation === 2) {
      resolve(true);
      return;
    } else if (typeof relation === 'object') {
      // testDraw2(tileLayer, relation.intersection);
      // 裁切下载
      CLIPIMAGE.addTempGeometry(relation.intersection, relation.rect);
      CLIPIMAGE.getImage(imageType).then(imageBuffer => {
        apiDownload(item, imageBuffer);
      });
    }
    resolve(true);
  });
}
