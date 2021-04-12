import { Options } from "@antv/g2plot/lib/types";

/** 配置类型定义 */
export interface PanelOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
}