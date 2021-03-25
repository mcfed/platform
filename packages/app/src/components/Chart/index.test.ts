import DataSet from '@antv/data-set';
import '../connector/fetch';

describe('data', () => {
  it('new DataSet', () => {
    // const dv = new DataSet.DataView().source("http://192.168.200.178:3000/mock/173/usercenter/app", {
    //     //@ts-ignore
    //     type: 'fetch',
    // });
    const data = [
      {gender: 'female', height: 161.2, weight: 51.6},
      {gender: 'female', height: 167.5, weight: 59},
      {gender: 'female', height: 159.5, weight: 49.2},
      {gender: 'female', height: 157, weight: 63},
      {gender: 'female', height: 155.8, weight: 53.6},
      {gender: 'female', height: 170, weight: 59},
      {gender: 'female', height: 159.1, weight: 47.6},
      {gender: 'female', height: 166, weight: 69.8},
      {gender: 'female', height: 176.2, weight: 66.8},
      {gender: 'female', height: 160.2, weight: 75.2},
      {gender: 'female', height: 172.5, weight: 55.2},
      {gender: 'female', height: 170.9, weight: 54.2},
      {gender: 'female', height: 172.9, weight: 62.5}
    ];
    const ds = new DataSet();

    const dv = ds.createView().source(data);
    //   const imageMask = new Image();
    //   imageMask.crossOrigin = '';
    //   imageMask.src = 'https://zos.alipayobjects.com/rmsportal/EEFqYWuloqIHRnh.jpg';
    //   imageMask.onload = () => {
    //     dv.transform({
    //       type: 'tag-cloud',
    //       imageMask,
    //     });
    //   };
    //   dv.transform({
    //     type: 'tag-cloud',
    //     fields: ['gender', 'height'], // 参与标签云layout的字段集（前者为文本内容，后者为权重值）
    //     font: 'serif', // 标签字体
    //     size: [500, 500], // 画布size，[ width, height ]
    //     padding: 0,
    //     spiral: 'rectangular', // 标签螺旋排布规律函数 'archimedean' || 'rectangular' || {function}
    //     fontSize(d) {
    //       return d.height;
    //     }, // 计算标签字体大小的回调函数，d为一行数据
    //     // timeInterval: Infinity, // 最大迭代时间，默认为无限大
    //     // imageMask:  imageMask ,
    //   });
    // console.log(dv.nodes)
    // dv.transform({
    //     type: 'diagram.arc',
    //     y: 0,
    //     thickness: 0.05, // 节点高度，区间 (0, 1)
    //     weight: false, // 是否带权重，无权重为弧长链接图，带权重为和弦图
    //     marginRatio: 0.1, // 空隙比例，区间[0, 1)
    //     id: (node) => node.id, // 获取节点id
    //     source: (edge) => edge.source, // 获取边起始点id
    //     target: (edge) => edge.target, // 获取边结束点id
    //     sourceWeight: (edge) => edge.value, // 获取边起始点权重
    //     targetWeight: (edge) => edge.value1, // 获取边结束点权重
    //     sortBy: null, // 排序，可以按照id，权重（'weight'）或者边数量（'frequency'）排序，也可以自定排序函数
    //   });

    console.log(dv.root);
  });
});
