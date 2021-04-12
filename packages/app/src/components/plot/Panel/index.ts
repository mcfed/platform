import { PanelOptions } from './types';
import { Adaptor, adaptor } from './adaptor';
import { G6Plot } from '../G6Plot';

export class Panel extends G6Plot<PanelOptions> {
  /** 图表类型 */
  public type: string = 'panel';

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<PanelOptions> {
    return adaptor;
  }
}

export type { PanelOptions };