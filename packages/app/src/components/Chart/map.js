import {Scene, PolygonLayer, LineLayer, PointLayer} from '@antv/l7';
import {Mapbox, GaodeMap} from '@antv/l7-maps';

export default class DrawScene {
  constructor(element, data, configs) {
    this.configs = configs;
    this.data = data;
    this.element = element;
    this.dom = this.initDom();
  }
  draw() {
    this.scene = this.initScene();
    return new Promise(resolve => {
      this.scene.on('loaded', async () => {
        await this.initLayer();
        resolve();
      });
    });
  }
  initDom() {
    const container = this.element;
    return container;
  }
  initScene() {
    const {map} = this.configs;
    const {mapType, ...res} = map;
    const mapInstance =
      mapType === 'MapBox' ? new Mapbox(res) : new GaodeMap(res);
    const scene = new Scene({
      id: this.dom,
      map: mapInstance,
      logoVisible: false
    });
    return scene;
  }
  async initLayer() {
    const layerType = this.configs.layerType;
    switch (layerType) {
      case 'PolygonLayer':
        await this.addFillLayer();
        break;
      case 'PointLayer':
        await this.addPointLayer();
        break;
    }
  }

  async fetchAllData() {
    const {data} = this.configs;
    const fillData = await this.fetchData(data[1]);
    const labelData = await this.fetchData(data[3]);
    return {
      fill: fillData,
      label: labelData
    };
  }

  async fetchData(cfg) {
    const response = await fetch(cfg.url);
    let data;
    if (cfg.type === 'csv') {
      data = await response.text();
    } else {
      data = await response.json();
    }
    return data;
  }

  joinData(data, fillData) {
    const {position} = this.configs;
    const layerData = {
      type: 'FeatureCollection',
      features: []
    };
    const dataObj = {};
    data.forEach(element => {
      dataObj[element[position.sourceField]] = element;
    });
    fillData.features.forEach(element => {
      const key1 = element.properties[position.targetField];
      const key2 = element.properties[position.targetField1];
      const item = dataObj[key1] || dataObj[key2];
      if (item) {
        element.properties = {
          ...element.properties,
          ...item
        };
        // @ts-ignore
        layerData.features.push(element);
      }
    });

    return layerData;
  }

  async addFillLayer(data) {
    const res = await this.fetchAllData();
    const fillData = this.joinData(this.data, res.fill);
    const {options, shape, scales, color, stroke} = this.configs;
    const fillLayer = new PolygonLayer(options)
      .source(fillData)
      .shape(shape.values)
      .scale(scales.values)
      .style({
        opacity: color.opacity
      });
    if (color.field) {
      fillLayer.color(color.field, color.values);
    } else {
      fillLayer.color(color.values);
    }
    this.scene.addLayer(fillLayer);
    if (stroke.visible) {
      const lineLayer = new LineLayer()
        .source(fillData)
        .shape('line')
        .color(stroke.color)
        .size(stroke.size)
        .style({
          opacity: stroke.opacity
        });
      this.scene.addLayer(lineLayer);
    }
    this.addLabelLayer(res.label);
  }
  addPointLayer() {
    const {position, options, shape, scales, color, stroke} = this.configs;
    const pointLayer = new PointLayer(options)
      .source(this.data, {
        parser: position.parser
      })
      .shape(shape.values)
      .scale(scales.values)
      .style({
        opacity: color.opacity,
        stroke: stroke.color,
        strokeOpacity: stroke.visible ? stroke.opacity : 0,
        strokeWidth: stroke.size
      });
    if (color.field) {
      pointLayer.color(color.field, color.values);
    } else {
      pointLayer.color(color.values);
    }
    this.scene.addLayer(pointLayer);
    this.addLabelLayer(this.data);
  }

  addLabelLayer(data) {
    const {label} = this.configs;
    if (label.visible && label.field) {
      const labelLayer = new PointLayer()
        .source(data, {
          parser: {
            type: 'json',
            coordinates: 'center'
          }
        })
        .shape(label.field, 'text')
        .color(label.color)
        .size(label.size)
        .style({
          stroke: label.stroke,
          strokeWidth: label.strokeWidth,
          strokeOpacity: label.strokeOpacity,
          textAllowOverlap: label.textAllowOverlap
        });
      this.scene.addLayer(labelLayer);
    }
  }
}
