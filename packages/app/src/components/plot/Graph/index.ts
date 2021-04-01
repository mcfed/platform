import { TemplateOptions } from './types';
import { Adaptor, adaptor } from './adaptor';
import { G6Plot } from '../G6Plot';

export class Template extends G6Plot<TemplateOptions> {
  /** 图表类型 */
  public type: string = 'template';

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<TemplateOptions> {
    return adaptor;
  }
}

export type { TemplateOptions };