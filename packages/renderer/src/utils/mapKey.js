// 地图Key

const TDTKEY = 'map-key-tdt';
const MAPBOXKEY = 'map-key-mapbox';
const BAIDUKEY = 'map-key-baidu';

/**
 * 获取地图key
 * @returns 地图key
 */
export function getKeys() {
  return {
    tdtKey: localStorage.getItem(TDTKEY),
    mapboxKey: localStorage.getItem(MAPBOXKEY),
    baiduKey: localStorage.getItem(BAIDUKEY),
  };
}
/**
 * 设置key
 * @param {*} param key对象
 */
export function setKeys(param) {
  localStorage.setItem(TDTKEY, param?.tdtKey);
  localStorage.setItem(MAPBOXKEY, param?.mapboxKey);
  localStorage.setItem(BAIDUKEY, param?.baiduKey);
}
