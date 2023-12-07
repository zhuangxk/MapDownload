import { getKeys } from '/@/utils/mapKey.js';


// const testStyle = 't:land|e:g|v:on|c:#0569d6ff,t:water|e:g|v:on|c:#113549ff,t:green|e:g|v:on|c:#0569d6ff,t:building|e:g|v:on,t:building|e:undefined|c:#0569d6ff,t:building|e:undefined|c:#0569d6ff,t:building|e:g.s|c:#dadada00,t:subwaystation|e:g|v:on|c:#0569d6B2,t:education|e:g|v:on|c:#0569d6ff,t:medical|e:g|v:on|c:#0569d6ff,t:scenicspots|e:g|v:on|c:#0569d6ff,t:highway|e:g|v:on|w:4,t:highway|e:g.f|c:#39d6feff,t:highway|e:g.s|c:#fed66900,t:highway|e:l|v:on,t:highway|e:l.t.f|c:#2dc4bbff,t:highway|e:l.t.s|c:#ffffff00,t:highway|e:l.i|v:on,t:arterial|e:g|v:on|w:2,t:arterial|e:g.f|c:#39d6feff,t:arterial|e:g.s|c:#ffeebb00,t:arterial|e:l|v:on,t:arterial|e:l.t.f|c:#2dc4bbff,t:arterial|e:l.t.s|c:#ffffff00,t:local|e:g|v:on|w:1,t:local|e:g.f|c:#39d6feff,t:local|e:g.s|c:#ffffff00,t:local|e:l|v:on,t:local|e:l.t.f|c:#2dc4bbff,t:local|e:l.t.s|c:#ffffffff,t:railway|e:g|v:off,t:subway|e:g|v:off|w:1,t:subway|e:g.f|c:#d8d8d8ff,t:subway|e:g.s|c:#ffffff00,t:subway|e:l|v:on,t:subway|e:l.t.f|c:#979c9aff,t:subway|e:l.t.s|c:#ffffffff,t:continent|e:l|v:on,t:continent|e:l.i|v:on,t:continent|e:l.t.f|c:#2dc4bbff,t:continent|e:l.t.s|c:#ffffff00,t:city|e:l.i|v:off,t:city|e:l|v:on,t:city|e:l.t.f|c:#2dc4bbff,t:city|e:l.t.s|c:#ffffff00,t:town|e:l.i|v:on,t:town|e:l|v:off,t:town|e:l.t.f|c:#454d50ff,t:town|e:l.t.s|c:#ffffffff,t:road|e:g.f|c:#39d6feff,t:poi|e:l|v:on,t:label|e:l|v:off,t:road|e:g|v:on,t:road|e:l|v:on,t:road|e:g.s|c:#39d6fe00,t:district|e:l|v:on,t:poi|e:l.i|v:off,t:poi|e:l.t.f|c:#2dc4bbff,t:poi|e:l.t.s|c:#ffffff00,t:manmade|e:g|c:#0569d6ff,t:label|e:l.t.s|c:#ffffffff,t:entertainment|e:g|c:#0569d6ff,t:shopping|e:g|c:#0569d6ff,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:subwaylabel|e:l|v:off,t:subwaylabel|e:l.i|v:off,t:tertiarywaysign|e:l|v:off,t:tertiarywaysign|e:l.i|v:off,t:provincialwaysign|e:l|v:off,t:provincialwaysign|e:l.i|v:off,t:nationalwaysign|e:l|v:off,t:nationalwaysign|e:l.i|v:off,t:highwaysign|e:l|v:off,t:highwaysign|e:l.i|v:off,t:village|e:l|v:off,t:district|e:l.t.f|c:#2dc4bbff,t:district|e:l.t.s|c:#ffffff00,t:country|e:l.t.f|c:#2dc4bbff,t:country|e:l.t.s|c:#ffffff00,t:water|e:l.t.f|c:#2dc4bbff,t:water|e:l.t.s|c:#ffffff00,t:cityhighway|e:g.f|c:#39d6feff,t:cityhighway|e:g.s|c:#ffffff00,t:tertiaryway|e:g.f|c:#39d6feff,t:tertiaryway|e:g.s|c:#ffffff10,t:provincialway|e:g.f|c:#39d6feff,t:provincialway|e:g.s|c:#ffffff00,t:nationalway|e:g.f|c:#39d6feff,t:nationalway|e:g.s|c:#ffffff00,t:nationalway|e:l.t.s|c:#ffffff00,t:nationalway|e:l.t.f|c:#2dc4bbff,t:provincialway|e:l.t.f|c:#2dc4bbff,t:provincialway|e:l.t.s|c:#ffffff00,t:cityhighway|e:l.t.f|c:#2dc4bbff,t:cityhighway|e:l.t.s|c:#ffffff00,t:estate|e:g|c:#0569d6ff,t:tertiaryway|e:l.t.f|c:#2dc4bbff,t:tertiaryway|e:l.t.s|c:#ffffff00,t:fourlevelway|e:l.t.f|c:#2dc4bbff,t:fourlevelway|e:l.t.s|c:#ffffff00,t:scenicspotsway|e:g.f|c:#39d6feff,t:scenicspotsway|e:g.s|c:#ffffff00,t:universityway|e:g.f|c:#39d6feff,t:universityway|e:g.s|c:#ffffff00,t:vacationway|e:g.f|c:#39d6feff,t:vacationway|e:g.s|c:#ffffff00,t:fourlevelway|e:g|v:on,t:fourlevelway|e:g.f|c:#39d6feff,t:fourlevelway|e:g.s|c:#ffffff00,t:transportationlabel|e:l|v:on,t:transportationlabel|e:l.i|v:off,t:transportationlabel|e:l.t.f|c:#2dc4bbff,t:transportationlabel|e:l.t.s|c:#ffffff00,t:educationlabel|e:l|v:on,t:educationlabel|e:l.i|v:off,t:educationlabel|e:l.t.f|c:#2dc4bbff,t:educationlabel|e:l.t.s|c:#ffffff00,t:transportation|e:g|c:#113549ff,t:airportlabel|e:l.t.f|c:#2dc4bbff,t:airportlabel|e:l.t.s|c:#ffffff00,t:scenicspotslabel|e:l.t.f|c:#2dc4bbff,t:scenicspotslabel|e:l.t.s|c:#ffffff00,t:medicallabel|e:l.t.f|c:#2dc4bbff,t:medicallabel|e:l.t.s|c:#ffffff00,t:medicallabel|e:l.i|v:off,t:scenicspotslabel|e:l.i|v:off,t:airportlabel|e:l.i|v:off,t:entertainmentlabel|e:l.i|v:off,t:entertainmentlabel|e:l.t.f|c:#2dc4bbff,t:entertainmentlabel|e:l.t.s|c:#ffffff00,t:estatelabel|e:l.i|v:off,t:estatelabel|e:l.t.f|c:#2dc4bbff,t:estatelabel|e:l.t.s|c:#ffffff00,t:businesstowerlabel|e:l.t.f|c:#2dc4bbff,t:businesstowerlabel|e:l.t.s|c:#ffffff00,t:businesstowerlabel|e:l.i|v:off,t:companylabel|e:l.t.f|c:#2dc4bbff,t:companylabel|e:l.t.s|c:#ffffff00,t:companylabel|e:l.i|v:off,t:governmentlabel|e:l.i|v:off,t:governmentlabel|e:l.t.f|c:#2dc4bbff,t:governmentlabel|e:l.t.s|c:#ffffff00,t:restaurantlabel|e:l.t.f|c:#2dc4bbff,t:restaurantlabel|e:l.t.s|c:#ffffff00,t:restaurantlabel|e:l.i|v:off,t:hotellabel|e:l.i|v:off,t:hotellabel|e:l.t.f|c:#2dc4bbff,t:hotellabel|e:l.t.s|c:#ffffff00,t:shoppinglabel|e:l.t.f|c:#2dc4bbff,t:shoppinglabel|e:l.t.s|c:#ffffff00,t:shoppinglabel|e:l.i|v:off,t:lifeservicelabel|e:l.t.f|c:#2dc4bbff,t:lifeservicelabel|e:l.t.s|c:#ffffff00,t:lifeservicelabel|e:l.i|v:off,t:carservicelabel|e:l.t.f|c:#2dc4bbff,t:carservicelabel|e:l.t.s|c:#ffffff00,t:carservicelabel|e:l.i|v:off,t:financelabel|e:l.t.f|c:#2dc4bbff,t:financelabel|e:l.t.s|c:#ffffff00,t:financelabel|e:l.i|v:off,t:otherlabel|e:l.t.f|c:#2dc4bbff,t:otherlabel|e:l.t.s|c:#ffffff00,t:otherlabel|e:l.i|v:off,t:manmade|e:l.t.f|c:#2dc4bbff,t:manmade|e:l.t.s|c:#ffffff00,t:transportation|e:l.t.f|c:#2dc4bbff,t:transportation|e:l.t.s|c:#ffffff00,t:education|e:l.t.f|c:#2dc4bbff,t:education|e:l.t.s|c:#ffffff00,t:medical|e:l.t.f|c:#2dc4bbff,t:medical|e:l.t.s|c:#ffffff00,t:scenicspots|e:l.t.f|c:#2dc4bbff,t:scenicspots|e:l.t.s|c:#ffffff00,t:OCEAN|e:l.t.f|c:#05296bff,t:OCEAN|e:g|c:#05296bff,t:WATEROTHER|e:g|c:#05296bff,t:LANDDOMESTIC|e:g|c:#0569d6ff,t:LANDABROAD|e:g|c:#0569d6ff,t:scenicspotslabel|e:l|v:off,t:entertainmentlabel|e:l|v:off,t:companylabel|e:l|v:off,t:restaurantlabel|e:l|v:off,t:hotellabel|e:l|v:off,t:shoppinglabel|e:l|v:off,t:lifeservicelabel|e:l|v:off,t:carservicelabel|e:l|v:off,t:cityhighway|e:l|v:on,t:road|e:l.t.f|c:#2dc4bbff';
// const enCodeStyle = encodeURIComponent(testStyle);

export default function getParams() {
  const { mapboxKey, tdtKey } = getKeys();

  const params = {
    TDT: {
      Normal: {
        url: 'http://t0.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=' + tdtKey,
      },
      Normal_Label: {
        url: 'http://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=' + tdtKey,
      },
      Satellite: {
        url: 'http://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=' + tdtKey,
      },
      Satellite_Label: {
        url: 'http://t0.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=' + tdtKey,
      },

      Terrain: {
        url: 'http://t0.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=' + tdtKey,
      },

      Terrain_Label: {
        url: 'http://t0.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk=' + tdtKey,
      },
    },
    GEOQ: {
      Colour: {
        url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
      },
      Gray: {
        url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
      },
      Midnightblue: {
        url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      },
    },
    Google: {
      Normal: {
        url: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=m&x={x}&y={y}&z={z}',
      },
      Satellite: {
        url: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
      },
      Satellite_Label: {
        url: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s,m&gl=CN&x={x}&y={y}&z={z}',
      },

    },
    Amap: {
      Normal: {
        url: 'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      },
      Satellite: {
        url: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      },
      Satellite_Label: {
        url: 'http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
      },
      NormalEn: {
        url: 'http://webrd01.is.autonavi.com/appmaptile?lang=en&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      },
    },
    Tencent: {
      Normal: {
        url: 'http://rt0.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0',
      },
      Satellite: {
        url: 'http://p0.map.gtimg.com/sateTiles/{z}/{m}/{n}/{x}_{y}.jpg',
      },
      Satellite_Label: {
        url: 'http://rt3.map.gtimg.com/tile?z={z}&x={x}&y={y}&type=vector&styleid=3&version=117',
      },
      Terrain: {
        url: 'http://p0.map.gtimg.com/demTiles/{z}/{m}/{n}/{x}_{y}.jpg',
      },
      Terrain_Label: {
        url: 'http://rt3.map.gtimg.com/tile?z={z}&x={x}&y={y}&type=vector&styleid=3&version=117',
      },
    },
    Osm: {
      Normal: {
        url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      },
      Bike: {
        url: 'https://c.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
      },
      Transport: {
        url: 'https://c.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
      },
      Humanitarian: {
        url: 'https://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      },
    },
    CartoDb: {
      Dark: {
        url: 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      },
      Light: {
        url: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      },
    },
    Mapbox: {
      Streets: {
        url: 'http://a.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + mapboxKey,
      },
      Dark: {
        url: 'http://a.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=' + mapboxKey,
      },
      LightDark: {
        url: 'http://a.tiles.mapbox.com/v3/spatialdev.map-c9z2cyef/{z}/{x}/{y}.png',
      },
      Satellite: {
        url: 'http://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=' + mapboxKey,
      },
      Light: {
        url: 'http://a.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=' + mapboxKey,
      },
      Emerald: {
        url: 'http://a.tiles.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png?access_token=' + mapboxKey,
      },
      White: {
        url: 'http://a.tiles.mapbox.com/v4/examples.map-h67hf2ic/{z}/{x}/{y}.png?access_token=' + mapboxKey,
      },
      Red: {
        url: 'http://a.tiles.mapbox.com/v4/examples.map-h68a1pf7,examples.npr-stations/{z}/{x}/{y}.png?access_token=' + mapboxKey,
      },
      Outdoors: {
        url: 'http://a.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=' + mapboxKey,
      },
      StreetsSatellite: {
        url: 'http://a.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=' + mapboxKey,
      },
      Comic: {
        url: 'http://a.tiles.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?access_token=' + mapboxKey,
      },
      Building: {
        url: 'https://b.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png',
      },
    },
    Baidu: {
      custom: {
        url: 'http://mapapip2.bdimg.com/customimage/tile?qt=customimage&x={x}&y={y}&z={z}&udt=20231115&scale=1',

        // url: 'http://mapapip2.bdimg.com/customimage/tile?qt=customimage&x={x}&y={y}&z={z}&udt=20231115&scale=1&ak=1XjLLEhZhQNUzd93EjU5nOGQ&styles=' + enCodeStyle,
        // url: 'http://mapapip2.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=a92be96767fbdbb9f0f3ef3b56d9ea4f&ak=oMklbnk5GuXtxfvwX0145Baw4XG7jbDs',
        // url: 'http://mapapip2.bdimg.com/customimage/tile?qt=customimage&x={x}&y={y}&z={z}&udt=20231115&scale=1&ak=1XjLLEhZhQNUzd93EjU5nOGQ&styles=t%3Abackground%7Ce%3Ag.f%7Cc%3A%230FFFFff&v=3.0&seckey=i%2BOPD9rauW0%2Fgc2z7Cw4xSV0rjtrJ3K073mUAnXxp0o%3D%2C-1&timeStamp=1700813086996&sign=f3ae64b4bbfd',
      },
      Normal: {
        // url: 'http://api0.map.bdimg.com/customimage/tile?&x=3&y=1&z=5&scale=1&customid=normal',
        url: 'https://gss{s}.bdstatic.com/8bo_dTSlRsgBo1vgoIiO_jowehsv/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20170927',
      },
      Satellite: {
        url: 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
      },
      midnight: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=midnight',
      },
      light: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=light',
      },
      dark: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=dark',
      },
      redalert: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=redalert',
      },
      googlelite: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=googlelite',
      },
      grassgreen: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=grassgreen',
      },
      pink: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=pink',
      },
      darkgreen: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=darkgreen',
      },
      bluish: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=bluish',
      },
      grayscale: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=grayscale',
      },
      hardedge: {
        url: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=hardedge',
      },
    },
  };

  return params;
}

