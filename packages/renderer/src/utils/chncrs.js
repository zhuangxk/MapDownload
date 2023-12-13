const GPS = {
        PI : Math.PI,
        x_pi : Math.PI * 3000.0 / 180.0,
        delta : function (lat, lon) {
            // Krasovsky 1940
            //
            // a = 6378245.0, 1/f = 298.3
            // b = a * (1 - f)
            // ee = (a^2 - b^2) / a^2;
            const a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
            const ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
            let dLat = this.transformLat(lon - 105.0, lat - 35.0);
            let dLon = this.transformLon(lon - 105.0, lat - 35.0);
            const radLat = lat / 180.0 * this.PI;
            let magic = Math.sin(radLat);
            magic = 1 - ee * magic * magic;
            const sqrtMagic = Math.sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
            dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
            return {'lat':dLat, 'lon':dLon};
        },
    
        //WGS-84 to GCJ-02
        wgs84_gcj02 : function (wgsLon, wgsLat) {
            if (this.outOfChina(wgsLat, wgsLon))
                return [wgsLon, wgsLat];
    
            const d = this.delta(wgsLat, wgsLon);
            return [wgsLon + d.lon, wgsLat + d.lat];
        },
        //GCJ-02 to WGS-84
        gcj02_wgs84 : function (gcjLon, gcjLat) {
            if (this.outOfChina(gcjLat, gcjLon))
                return [gcjLon, gcjLat];
    
            const d = this.delta(gcjLat, gcjLon);
            return [gcjLon - d.lon, gcjLat - d.lat];
        },
        //GCJ-02 to WGS-84 exactly
        gcj02_wgs84_precise : function (gcjLon, gcjLat) {
            const initDelta = 0.01;
            const threshold = 0.000000001;
            let dLat = initDelta, dLon = initDelta;
            let mLat = gcjLat - dLat, mLon = gcjLon - dLon;
            let pLat = gcjLat + dLat, pLon = gcjLon + dLon;
            let wgsLat, wgsLon, i = 0;
            while (1) {
                wgsLat = (mLat + pLat) / 2;
                wgsLon = (mLon + pLon) / 2;
                const tmp = this.gcj_encrypt(wgsLat, wgsLon);
                dLat = tmp.lat - gcjLat;
                dLon = tmp.lon - gcjLon;
                if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
                    break;
    
                if (dLat > 0) pLat = wgsLat; else mLat = wgsLat;
                if (dLon > 0) pLon = wgsLon; else mLon = wgsLon;
    
                if (++i > 10000) break;
            }
            return [wgsLon, wgsLat];
        },
        //GCJ-02 to BD-09
        gcj02_bd09ll : function (gcjLon, gcjLat) {
            const x = gcjLon, y = gcjLat;
            const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
            const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
            const bdLon = z * Math.cos(theta) + 0.0065;
            const bdLat = z * Math.sin(theta) + 0.006;
            return [bdLon, bdLat];
        },
        //BD-09 to GCJ-02
        bd09ll_gcj02 : function (bdLon, bdLat) {
            const x = bdLon - 0.0065, y = bdLat - 0.006;
            const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
            const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
            const gcjLon = z * Math.cos(theta);
            const gcjLat = z * Math.sin(theta);
            return [gcjLon, gcjLat];
        },
        
        wgs84_bd09ll : function (wgsLon, wgsLat) {
            const c = this.wgs84_gcj02(wgsLon, wgsLat);
            return this.gcj02_bd09ll(c[0], c[1]);
        },
    
        bd09ll_wgs84 : function (wgsLon, wgsLat) {
            const c = this.bd09ll_gcj02(wgsLon, wgsLat);
            return this.gcj02_wgs84(c[0], c[1]);
        },
         
        outOfChina : function (lat, lon) {
            if (lon < 72.004 || lon > 137.8347)
                return true;
            if (lat < 0.8293 || lat > 55.8271)
                return true;
            return false;
        },
        transformLat : function (x, y) {
            let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
            return ret;
        },
        transformLon : function (x, y) {
            let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
            return ret;
        },
    };
    
    const ProjectionTransform = {
        crs : {
            'bd09ll'    : '+proj=longlat +datum=BD09',
            'gcj02'     : '+proj=longlat +datum=GCJ02',
            'wgs84'     : '+proj=longlat +datum=WGS84 +no_defs',
        },
    
        /**
         * transform geojson's coordinates
         * @param  {Object | Array} source a coordinate [x,y] or a geoJSON object to convert
         * @param  {String | CRS Object} fromCRS    crs converted from
         * @param  {String | CRS Object} toCRS      crs converted to
         * @return {Object} result geoJSON object
         */
        transform:function(source, fromCRS, toCRS) {
            if (!source) {
                return null;
            }
            if (!fromCRS || !toCRS) {
                throw new Error('must provide a valid fromCRS and toCRS.');
            }
            if (this._isCoord(source)) {
                return this._transformCoordinate(source, fromCRS, toCRS);
            } else if (this._isArray(source)) {
                const result = [];
                for (let i = 0; i < source.length; i++) {
                    result.push(this.transform(source[i], fromCRS, toCRS));
                }
                return result;
            }
            return this._transformGeoJSON(source, fromCRS, toCRS);
        },
    
        _transformGeoJSON:function(geoJSON, fromCRS, toCRS) {
            if (geoJSON['type'] === 'Feature') {
                const geometry = this.transform(geoJSON['geometry'], fromCRS, toCRS);
                const result = this._extend({}, geoJSON);
                result['geometry'] = geometry;
                return result;
            } else if (geoJSON['type'] === 'FeatureCollection') {
                const features = geoJSON['features'];
                const result = this._extend({}, geoJSON);
                const convertedFea = [];
                for (let i = 0; i < features.length; i++) {
                    convertedFea.push(this.transform(features[i], fromCRS, toCRS));
                }
                result['features'] = convertedFea;
                return result;
            } else if (geoJSON['type'] === 'GeometryCollection') {
                const geometries = geoJSON['geometries'];
                const result = this._extend({}, geoJSON);
                const convertedGeo = [];
                for (let i = 0; i < geometries.length; i++) {
                    convertedGeo.push(this.transform(geometries[i], fromCRS, toCRS));
                }
                result['geometries'] = convertedGeo;
                return result;
            }
            const result = this._extend({}, geoJSON);
            const coordinates = this._transformCoordinate(geoJSON['coordinates'], fromCRS, toCRS);
            result['coordinates'] = coordinates;
            return result;
        },
    
        _transformCoordinate:function(coordinates, fromCRS, toCRS) {
            let f = fromCRS,
                t = toCRS;
            if (fromCRS['type'] === 'proj4') {
                f = this._toCRS(fromCRS['properties']['proj']);
            }
            if (toCRS['type'] === 'proj4') {
                t = this._toCRS(toCRS['properties']['proj']);
            }
            f = f.toLowerCase();
            t = t.toLowerCase();
            if (f === 'epsg:4326') {
                f = 'wgs84';
            }
            if (t === 'epsg:4326') {
                t = 'wgs84';
            }
            if (f === t) {
                return coordinates;
            }
            const m = f+'_'+t;
            return this._eachCoordinate(coordinates, function(c) {
                return GPS[m](parseFloat(c[0]), parseFloat(c[1]));
            }, this);
        },
    
        _extend:function(src, dst) {
            for (const p in dst) {
                if (dst.hasOwnProperty(p)) {
                    src[p] = dst[p];
                }
            }
            return src;
        },
    
        _toCRS:function(proj) {
            for (const p in this.crs) {
                if (proj === this.crs[p]) {
                    return p;
                }
            }
            return null;
        },
    
        _eachCoordinate:function(coordinates, fn, context) {
            if (this._isCoord(coordinates)) {
                return fn.call(context, coordinates);
            }
            const result = [];
            for (const i=0,len=coordinates.length;i<len;i++) {
                const p = coordinates[i];
                if (p == null) {
                    continue;
                }
                if (this._isCoord(p)) {
                    const pp = fn.call(context,p);
                    result.push(pp);
                } else if (this._isArray(p)) {
                    result.push(this._eachCoordinate(p, fn, context));
                }
            }
            return result;
        },
    
        _isCoord:function(coordinate) {
            if (this._isArray(coordinate) && this._isNumber(coordinate[0]) && this._isNumber(coordinate[1])) {
                return true;
            }
            return false;
        },
    
        _isNumber:function(val) {
            return (typeof val === 'number') && !isNaN(val);
        },
    
        _isArray:function(obj) {
            if (!obj) {return false;}
            return typeof obj == 'array' || (obj.constructor !== null && obj.constructor == Array);
        },
    
        _isString:function(_str) {
            if (_str == null) {return false;}
            return typeof _str == 'string' || (_str.constructor!==null && _str.constructor == String);
        },
    };
    
    
export const CRSTransform = ProjectionTransform;
