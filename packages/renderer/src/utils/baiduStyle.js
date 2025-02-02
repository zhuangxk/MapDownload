export const featureTypeOptions = [
    { value : 'all', label: '全部 [4,18]'},
    { value : 'background', label: '地图背景-全部 [4,18]'},
    { value : 'land', label: '地图背景-陆地 [4,18]'},
    { value : 'water', label: '地图背景-水系 [4,18]'},
    { value : 'green', label: '地图背景-绿地 [10,18]'},
    { value : 'manmade', label: '地图背景-人造区域-全部 [14,18]'},
    { value : 'subwaystation', label: '地图背景-人造区域-地铁设施 [17,18]'},
    { value : 'education', label: '地图背景-人造区域-教育区域 [14,18]'},
    { value : 'medical', label: '地图背景-人造区域-医疗区域 [15,18]'},
    { value : 'scenicspots', label: '人造区域-景点区域 [14,18]'},
    { value : 'building', label: '建筑物 [15,18]'},
    { value : 'road', label: '道路 [6,18]'},
    { value : 'highway', label: '道路-高速及国道 [6,18]'},
    { value : 'arterial', label: '道路-城市主路 [10,18]'},
    { value : 'local', label: '道路-普通道路 [14,18]'},
    { value : 'railway', label: '道路-铁路 [8,18]'},
    { value : 'subway', label: '道路-地铁 [12,18]'},
    { value : 'poilabel', label: '兴趣点 [12,18]'},
    { value : 'airportlabel', label: '兴趣点-机场'},
    { value : 'scenicspotslabel', label: '兴趣点-旅游景点'},
    { value : 'educationlabel', label: '兴趣点-教育'},
    { value : 'medicallabel', label: '兴趣点-医疗'},
    { value : 'administrative', label: '行政区划 [4,18]'},
    { value : 'districtlabel', label: '行政区划-行政标注 [4,18]'},
    { value : 'continent', label: '行政区划-行政标注-大洲 (18,)'},
    { value : 'country', label: '行政区划-行政标注-国家 3'},
    { value : 'city', label: '行政区划-行政标注-城市 [5,13]'},
    { value : 'district', label: '行政区划-行政标注-区县 [5,13]'},
    { value : 'town', label: '行政区划-行政标注-乡镇 [11,15]'},
    { value : 'boundary', label: '行政区划-边界线 [3,10]'},
];

export const elementTypeOptions = [
    { label: '全部' , value: 'all'},
    { label: '几何' , value: 'geometry'},
    { label: '几何-填充' , value: 'geometry.fill'},
    { label: '几何-填充-顶层填充' , value: 'geometry.topfill'},
    { label: '几何-填充-边缘填充' , value: 'geometry.sidefill'},
    { label: '几何-线粗' , value: 'geometry.stroke'},
    { label: '标注' , value: 'labels'},
    { label: '标注-文本' , value: 'labels.text'},
    { label: '标注-文本填充' , value: 'labels.text.fill'},
    { label: '标注-文本线粗' , value: 'labels.text.stroke'},
    { label: '标注-图标' , value: 'labels.icon'},
];





// 生成压缩style样式字符串
export function generateStyle(style){
    let res = '';
    for( const feature of style){
        const f_list = [];
        for(const key in feature){
            if(typeof feature[key] == 'object'){
                for (const inner_key in feature[key]){
                    f_list.push(processLabel(inner_key) + ':' + feature[key][inner_key]);
                }
            } else {
                f_list.push(processLabel(key) + ':' + processLabel(feature[key]));
            }
        }
        res = res + f_list.join('|') + ',';
    }
    return encodeURIComponent(res);
}

// 压缩规则
function processLabel(name){
    const map = {
        all:'all',
        geometry:'g',
        'geometry.fill':'g.f',
        'geometry.stroke':'g.s',
        labels:'l',
        'labels.text.fill':'l.t.f',
        'labels.text.stroke':'l.t.s',
        'lables.text':'l.t',
        'labels.icon':'l.i',
        featureType:'t',
        elementType:'e',
        visibility:'v',
        color:'c',
        lightness:'l',
        saturation:'s',
        weight:'w',
        zoom:'z',
        hue:'h',
    };
    return map[name] ?? name;
}