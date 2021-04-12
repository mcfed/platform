import {Graph} from '@antv/g6-pc';
import {PanelOptions} from './types';
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
 * 图适配器
 * @param chart
 * @param options
 */

export function adaptor(params: Params<PanelOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  params.chart.read(params.options.data);
  return params;
}
