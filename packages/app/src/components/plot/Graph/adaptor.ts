import {flow} from '@antv/g2plot';
import {View} from '@antv/g2';
import {Graph} from '@antv/g6-pc';
import {TemplateOptions} from './types';
import iconLoader from '@antv/graphin-icons';
import Graphin, {Behaviors, GraphinContext} from '@antv/graphin';
const {fontFamily, glyphs} = iconLoader();
const icons = Graphin.registerFontFamily(iconLoader);

export declare type Params<O> = {
  readonly chart: Graph;
  readonly options: O;
  /** 一些存储一些扩展信息，用户上游 adaptor 向下游传递临时数据 */
  readonly ext?: Record<string, any>;
};

export declare type Adaptor<O> = (params: Params<O>) => void;

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<TemplateOptions>): Params<TemplateOptions> {
  const {chart, options} = params;
  const {data, xField, yField} = options;

  //   chart.data(data);

  //   chart.interval().position(`${xField}*${yField}`);

  return params;
}

/**
 * meta 配置
 * @param params
 */
// export function meta(params: Params<TemplateOptions>): Params<TemplateOptions> {
//   const { options } = params;
//   const { xAxis, yAxis, xField, yField } = options;

//   return flow(
//     // scale({
//     //     //@ts-ignore
//     //   [xField]: xAxis,
//     //   //@ts-ignore
//     //   [yField]: yAxis,
//     // })
//   )(params);
// }
/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TemplateOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  console.log(params.chart.layout);
  const data = {
    nodes: [
      {
        id: 'node-0',
        label: 'node-0',
        type: 'graphin-circle',
        comboId: undefined,
        style: {
          keyshape: {},
          halo: {},
          label: {
            value: 'oracle',
            position: 'botton',
            offset: [0, 5],
            fill: 'green'
          },
          icon: {
            type: 'font', // 指定图标为Font类型
            fontFamily: fontFamily, // 指定FontFamily
            value: icons.database
          }
        }
      },
      {
        id: 'node-1',
        label: 'node-1',
        type: 'graphin-circle',
        comboId: undefined,
        style: {
          keyshape: {},
          halo: {},
          label: {
            value: '占用CPU：10%',
            position: 'botton',
            offset: [0, 5],
            fill: '#0f0'
          },
          icon: {
            type: 'font', // 指定图标为Font类型
            fontFamily: fontFamily, // 指定FontFamily
            value: icons.database
          }
        }
      },
      {
        id: 'node-2',
        label: 'node-2',
        type: 'graphin-circle',
        comboId: undefined,
        style: {
          keyshape: {},
          halo: {},
          label: {
            value: '占用IP：192.168.1.18',
            position: 'botton',
            offset: [0, 5],
            fill: '#0f0'
          },
          icon: {
            type: 'font', // 指定图标为Font类型
            fontFamily: fontFamily, // 指定FontFamily
            value: icons.database
          }
        }
      },
      {
        id: 'node-3',
        label: 'node-3',
        type: 'graphin-circle',
        comboId: undefined,
        style: {
          keyshape: {},
          halo: {},
          label: {
            value: '\\app\\product',
            position: 'botton',
            offset: [0, 5],
            fill: '#0f0'
          },
          icon: {
            type: 'font', // 指定图标为Font类型
            fontFamily: fontFamily, // 指定FontFamily
            value: icons.database
          }
        }
      },
      {
        id: 'node-4',
        label: 'node-4',
        type: 'graphin-circle',
        comboId: undefined,
        style: {
          keyshape: {},
          halo: {},
          label: {
            value: '*.dbf',
            position: 'botton',
            offset: [0, 5],
            fill: '#0f0'
          },
          icon: {
            type: 'font', // 指定图标为Font类型
            fontFamily: fontFamily, // 指定FontFamily
            value: icons.database
          }
        }
      },
      {
        id: 'node-5',
        label: 'node-5',
        type: 'graphin-circle',
        comboId: undefined,
        style: {
          keyshape: {},
          halo: {},
          label: {
            value: 'HIS系统',
            position: 'botton',
            offset: [0, 5],
            fill: '#0f0'
          },
          icon: {
            type: 'font', // 指定图标为Font类型
            fontFamily: fontFamily, // 指定FontFamily
            value: icons.database
          }
        }
      },
      {
        id: 'node-6',
        label: 'node-6',
        type: 'graphin-circle',
        comboId: undefined,
        style: {
          keyshape: {},
          halo: {},
          label: {
            value: 'aaa.exe',
            position: 'botton',
            offset: [0, 5],
            fill: '#0f0'
          },
          icon: {
            type: 'font', // 指定图标为Font类型
            fontFamily: fontFamily, // 指定FontFamily
            value: icons.database
          }
        }
      }
    ],
    edges: [
      {
        source: 'node-0',
        target: 'node-1',
        style: {
          fill: '#0f0',
          label: {
            value: icons['safety certificate'],
            fontFamily: fontFamily,
            fontSize: 20,
            fill: '#0f0'
          },
          keyshape: {
            stroke: '#0f0', // 样式属性，元素的描边色
            lineWidth: 1,
            lineDash: [5, 4]
            // lineWidth: 4,
          }
        }
      },
      {
        source: 'node-0',
        target: 'node-2',
        style: {
          label: {
            value: icons['safety certificate'],
            fontFamily: fontFamily,
            fontSize: 20,
            fill: '#0f0'
          },
          keyshape: {
            stroke: '#0f0', // 样式属性，元素的描边色
            lineWidth: 1,
            lineDash: [5, 4]
            // lineWidth: 4,
          }
        }
      },
      {
        source: 'node-0',
        target: 'node-3',
        style: {
          label: {
            value: icons['close'],
            fontFamily: fontFamily,
            fontSize: 20,
            fill: '#f00'
          },
          keyshape: {
            stroke: '#f00', // 样式属性，元素的描边色
            lineWidth: 1,
            lineDash: [5, 4]
            // lineWidth: 4,
          }
        }
      },
      {
        source: 'node-0',
        target: 'node-4',
        type: 'arrow',
        style: {
          label: {
            value: icons['close'],
            fontFamily: fontFamily,
            fontSize: 20,
            fill: '#f00'
          },
          keyshape: {
            stroke: '#f00', // 样式属性，元素的描边色
            lineWidth: 1,
            lineDash: [5, 4]
            // lineWidth: 4,
          }
        }
      },
      {
        source: 'node-0',
        target: 'node-5',
        style: {
          label: {
            value: icons['close'],
            fontFamily: fontFamily,
            fontSize: 20,
            fill: '#f00'
          },
          keyshape: {
            stroke: '#f00', // 样式属性，元素的描边色
            lineWidth: 1,
            lineDash: [5, 4]
            // lineWidth: 4,
          }
        }
      },
      {
        source: 'node-6',
        target: 'node-0',
        style: {
          label: {
            value: icons['close'],
            fontFamily: fontFamily,
            fontSize: 20,
            fill: '#f00'
          },
          keyshape: {
            stroke: '#f00', // 样式属性，元素的描边色
            lineWidth: 1,
            lineDash: [5, 4]
            // lineWidth: 4,
          }
        }
      }
    ]
  };
  params.chart.read(data);
  return flow()(params);
  // geometry,
  // meta,
  // interaction,
  // animation,
  // theme
  // ... 其他的 adaptor flow
}
