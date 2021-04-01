export const LineConfig = {
  id: 'u-47e3-c6b',
  type: 'listTop',
  data: [
    {
      series: 'London',
      x: '2019-01',
      y: 814
    },
    {
      series: 'London',
      x: '2019-02',
      y: 932
    },
    {
      series: 'London',
      x: '2019-03',
      y: 165
    },
    {
      series: 'London',
      x: '2019-04',
      y: 60
    },
    {
      series: 'London',
      x: '2019-05',
      y: 185
    },
    {
      series: 'London',
      x: '2019-06',
      y: 371
    },
    {
      series: 'Paris',
      x: '2019-01',
      y: 995
    },
    {
      series: 'Paris',
      x: '2019-02',
      y: 434
    },
    {
      series: 'Paris',
      x: '2019-03',
      y: 589
    },
    {
      series: 'Paris',
      x: '2019-04',
      y: 921
    },
    {
      series: 'Paris',
      x: '2019-05',
      y: 50
    },
    {
      series: 'Paris',
      x: '2019-06',
      y: 511
    }
  ],
  configs: {
    title: {
      visible: true,
      text: '多折线图'
    },
    description: {
      visible: true,
      text: '一个简单的多折线图'
    },

    legend: {
      flipPage: false
    },
    forceFit: false,
    xField: 'x',
    yField: 'y',
    seriesField: 'series',
    color: ['#5B8FF9', '#5AD8A6']
  }
};

export const ColumnConfig = {
  id: 'u-7858-7c5',
  type: 'Column',
  data: [
    {
      x: '家具家电',
      y: 649
    },
    {
      x: '粮油副食',
      y: 119
    },
    {
      x: '美容洗护',
      y: 411
    },
    {
      x: '母婴用品',
      y: 399
    },
    {
      x: '进口食品',
      y: 928
    },
    {
      x: '食品饮料',
      y: 231
    },
    {
      x: '家庭清洁',
      y: 561
    }
  ],
  configs: {
    title: {
      visible: true,
      text: '柱状图'
    },
    description: {
      visible: true,
      text: '一个简单的柱状图'
    },
    legend: {
      flipPage: false
    },
    xAxis: {
      title: {
        visible: false
      }
    },
    yAxis: {
      title: {
        visible: false
      }
    },
    forceFit: false,
    xField: 'x',
    yField: 'y',
    color: ['#5B8FF9']
  }
};

export const PieConfig = {
  id: 'u-efd7-8e1',
  type: 'Pie',
  data: [
    {
      x: '家具家电',
      y: 484
    },
    {
      x: '粮油副食',
      y: 171
    },
    {
      x: '美容洗护',
      y: 18
    },
    {
      x: '母婴用品',
      y: 124
    },
    {
      x: '进口食品',
      y: 365
    }
  ],
  configs: {
    title: {
      visible: true,
      text: '饼图'
    },
    description: {
      visible: true,
      text: '一个简单的饼图'
    },
    legend: {
      flipPage: false
    },
    forceFit: false,
    radius: 1,
    colorField: 'x',
    angleField: 'y',
    color: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A']
  }
};

export const RadarConfig = {
  id: 'u-5510-10b',
  data: [
    {
      x: '防御',
      y: 558
    },
    {
      x: '速度',
      y: 608
    },
    {
      x: '攻击',
      y: 32
    },
    {
      x: '躲闪',
      y: 946
    },
    {
      x: '穿透',
      y: 631
    }
  ],
  type: 'Radar',
  configs: {
    title: {
      visible: true,
      text: '单线雷达图'
    },
    description: {
      visible: true,
      text: '一个简单的单线雷达图'
    },
    radius: 1,
    angleField: 'x',
    radiusField: 'y',
    color: ['#5B8FF9']
  }
};

export const LiquidConfig = {
  id: 'u-49c6-f66',
  data: {},
  type: 'Liquid',
  configs: {
    title: {
      visible: true,
      text: '水波图'
    },
    description: {
      visible: true,
      text: '一个简单的水波图'
    },
    legend: {
      flipPage: false
    },
    forceFit: false,
    width: 560,
    height: 376,
    min: 0,
    max: 10000,
    value: 5639
  }
};

export const MapConfig = {
  id: 'u-12-34',
  type: 'map',
  data: [
    {name: '湖北', confirm: 16678, suspect: 0, heal: 533, dead: 479},
    {name: '广东', confirm: 895, suspect: 0, heal: 37, dead: 0},
    {name: '浙江', confirm: 895, suspect: 0, heal: 65, dead: 0},
    {name: '河南', confirm: 764, suspect: 0, heal: 41, dead: 2},
    {name: '湖南', confirm: 661, suspect: 0, heal: 35, dead: 0},
    {name: '江西', confirm: 548, suspect: 0, heal: 27, dead: 0},
    {name: '安徽', confirm: 530, suspect: 0, heal: 20, dead: 0},
    {name: '重庆', confirm: 376, suspect: 0, heal: 15, dead: 2},
    {name: '江苏', confirm: 341, suspect: 0, heal: 13, dead: 0},
    {name: '山东', confirm: 307, suspect: 0, heal: 13, dead: 0},
    {name: '四川', confirm: 301, suspect: 0, heal: 23, dead: 1},
    {name: '北京', confirm: 253, suspect: 0, heal: 24, dead: 1},
    {name: '上海', confirm: 243, suspect: 0, heal: 15, dead: 1},
    {name: '福建', confirm: 205, suspect: 0, heal: 7, dead: 0},
    {name: '黑龙江', confirm: 190, suspect: 0, heal: 7, dead: 2},
    {name: '陕西', confirm: 165, suspect: 0, heal: 6, dead: 0},
    {name: '广西', confirm: 150, suspect: 0, heal: 10, dead: 0},
    {name: '河北', confirm: 135, suspect: 0, heal: 4, dead: 1},
    {name: '云南', confirm: 124, suspect: 0, heal: 5, dead: 0},
    {name: '海南', confirm: 91, suspect: 0, heal: 4, dead: 1},
    {name: '辽宁', confirm: 81, suspect: 0, heal: 3, dead: 0},
    {name: '山西', confirm: 81, suspect: 0, heal: 4, dead: 0},
    {name: '天津', confirm: 69, suspect: 0, heal: 2, dead: 1},
    {name: '贵州', confirm: 64, suspect: 0, heal: 8, dead: 0},
    {name: '甘肃', confirm: 57, suspect: 0, heal: 4, dead: 0},
    {name: '吉林', confirm: 54, suspect: 0, heal: 1, dead: 0},
    {name: '内蒙古', confirm: 42, suspect: 0, heal: 3, dead: 0},
    {name: '宁夏', confirm: 34, suspect: 0, heal: 1, dead: 0},
    {name: '新疆', confirm: 32, suspect: 0, heal: 0, dead: 0},
    {name: '香港', confirm: 18, suspect: 0, heal: 0, dead: 1},
    {name: '青海', confirm: 17, suspect: 0, heal: 3, dead: 0},
    {name: '台湾', confirm: 11, suspect: 0, heal: 0, dead: 0},
    {name: '澳门', confirm: 10, suspect: 0, heal: 0, dead: 0},
    {name: '西藏', confirm: 1, suspect: 0, heal: 0, dead: 0}
  ],
  configs: {
    map: {
      type: 'Map',
      mapType: 'MapBox',
      pitch: 0,
      style: 'blank',
      center: [104.288144, 31.239692],
      zoom: 3,
      visible: true,
      controlsVisible: true,
      controls: {
        logo: {visible: true, disable: false, position: 'bottomleft'},
        scale: {visible: true, disable: false, position: 'bottomright'},
        zoom: {visible: true, disable: false, position: 'topright'},
        attach: {visible: false, disable: true, position: 'bottomright'}
      }
    },
    type: 'FillDistrict',
    layerType: 'PolygonLayer',
    options: {autoFit: true},
    position: {
      visible: false,
      disable: true,
      type: 'loc',
      loc: null,
      targetField: 'name',
      targetField1: 'code',
      sourceField: 'name'
    },
    shape: {visible: false, field: null, values: 'fill'},
    size: {visible: false},
    colorScheme: {type: 'singlehue', stops: 5, reverse: false, name: 'Blues'},
    scales: {values: {color: {type: 'quantile', field: 'confirm'}}},
    color: {
      visible: true,
      field: 'confirm',
      values: [
        'rgb(239,243,255)',
        'rgb(189,215,231)',
        'rgb(107,174,214)',
        'rgb(49,130,189)',
        'rgb(8,81,156)'
      ],
      scale: 'quantile',
      opacity: 1
    },
    stroke: {
      visible: true,
      field: null,
      color: 'rgb(93,112,146)',
      size: 0.6,
      opacity: 0.77
    },
    label: {
      visible: true,
      field: 'name',
      size: 12,
      opacity: 1,
      color: '#fff',
      stroke: '#fff',
      strokeWidth: 1.2,
      strokeOpacity: 1,
      textAllowOverlap: false
    },
    guojie: {visible: true},
    data: [
      {
        name: 'province_value',
        alias: '属性数据',
        url:
          'https://gw.alipayobjects.com/os/basement_prod/bfb05f5d-3700-4dd4-ac77-b599d5aeaf39.json'
      },
      {
        name: 'province',
        alias: '省级行政区',
        url:
          'https://gw.alipayobjects.com/os/bmw-prod/1981b358-28d8-4a2f-9c74-a857d5925ef1.json'
      },
      {
        name: 'boundaries',
        alias: '国界线、海岸线',
        url:
          'https://gw.alipayobjects.com/os/basement_prod/ba8fa803-a8c3-4c67-b806-fe1c444546bd.json'
      },
      {
        name: 'label',
        alias: '标注点',
        url:
          'https://gw.alipayobjects.com/os/bmw-prod/c4a6aa9d-8923-4193-a695-455fd8f6638c.json'
      },
      {
        name: 'island',
        alias: '岛屿标注',
        url:
          'https://gw.alipayobjects.com/os/basement_prod/ffb777af-c499-4c3a-8226-fe9b1e877793.json'
      }
    ]
  }
};

export const LineChartshaper = {
  id: 'u-f644-808',
  data: [
    {
      x: '2019-01',
      y: 133
    },
    {
      x: '2019-02',
      y: 575
    },
    {
      x: '2019-03',
      y: 307
    },
    {
      x: '2019-04',
      y: 318
    }
  ],
  configs: {
    renderer: 'canvas',
    title: {
      visible: true,
      text: '单折线图'
    },
    description: {
      visible: true,
      text: '一个简单的单折线图'
    },
    padding: 'auto',
    legend: {
      visible: true,
      position: 'top-left',
      wordSpacing: 4,
      flipPage: false
    },
    tooltip: {
      visible: true,
      shared: true,
      crosshairs: {
        type: 'y'
      }
    },
    xAxis: {
      visible: true,
      autoHideLabel: false,
      autoRotateLabel: false,
      autoRotateTitle: false,
      grid: {
        visible: false
      },
      line: {
        visible: true
      },
      tickLine: {
        visible: true
      },
      label: {
        visible: true
      },
      title: {
        visible: false,
        offset: 12
      }
    },
    yAxis: {
      visible: true,
      autoHideLabel: false,
      autoRotateLabel: false,
      autoRotateTitle: true,
      grid: {
        visible: true
      },
      line: {
        visible: false
      },
      tickLine: {
        visible: false
      },
      label: {
        visible: true
      },
      title: {
        visible: false,
        offset: 12
      }
    },
    label: {
      visible: true,
      type: 'point'
    },
    connectNulls: false,
    smooth: true,
    lineSize: 5,
    lineStyle: {
      lineJoin: 'round',
      lineCap: 'round'
    },
    point: {
      visible: true,
      size: 3,
      shape: 'square',
      style: {
        stroke: '#fff'
      }
    },
    type: 'Line',
    forceFit: false,
    animation: false,
    width: 741,
    height: 331,
    data: {
      styles: {
        Default: {
          color: '#b448a7'
        }
      }
    },
    xField: 'x',
    yField: 'y'
  },
  selection: [1, 1]
};
