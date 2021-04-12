import {Graph, NodeConfig} from '@antv/g6-pc';
import {TemplateOptions} from './types';
import iconLoader from '@antv/graphin-icons';
import Graphin, {Behaviors, GraphinContext} from '@antv/graphin';
import {EdgeConfig, IG6GraphEvent} from '@antv/g6';
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
 * 图适配器
 * @param chart
 * @param options
 */

export function adaptor(params: Params<TemplateOptions>) {
  params.chart.read(params.options.data);
  // params.chart.on('node:selected1',function(e:IG6GraphEvent){
  //   console.log(e)
  // })
  // console.log(params.chart)
  params.chart.node((node: NodeConfig) => {
    // console.log(node)
    console.log(node.type);
    if (node.id === 'node-0') {
      node.type = 'circle-node';
    }

    if (node.parent == 'node-0') {
      node.visible = true;
    } else {
      node.visible = false;
    }

    return node;
  });
  params.chart.edge((edge: EdgeConfig) => {
    // console.log(edge)
    if (edge.source !== 'node-0') {
      edge.visible = false;
    } else {
      edge.visible = true;
    }
    return edge;
  });

  return params;
}
