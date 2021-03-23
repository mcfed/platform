import React, {useLayoutEffect, useRef} from 'react';
import * as G2Plot from '@antv/g2plot';
import DrawScene from '../Chart/map';
import {Editor, defaultConfigs} from '@antv/g2plot-schemas';
import {isEqual} from '@antv/util';
interface PG2PloatChat {
  id: string;
  data: any;
  type?: string;
  configs: any;
}

/**
 * 去除掉所有默认的配置
 * @param configs - 配置
 * @param defaultCfgs - 默认配置
 */
function shake(configs: any, defaultCfgs: any) {
  const result: any = {};
  if (!defaultCfgs) return configs;
  for (const [key, value] of Object.entries(configs)) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      const newValue = shake(value, defaultCfgs[key]);
      if (Object.keys(newValue).length !== 0) result[key] = newValue;
    } else if (Array.isArray(value)) {
      if (!isEqual(configs[key], defaultCfgs[key])) {
        result[key] = value;
      }
    } else {
      if (configs[key] !== defaultCfgs[key]) {
        result[key] = value;
      }
    }
  }
  return result;
}

export const RG2PlotChart = React.forwardRef((props: PG2PloatChat) => {
  const eleRef = useRef<HTMLDivElement>(null);
  const chartType = props.configs.type || props.type;
  //@ts-ignore
  const {xAxis, yAxis, height, width, label, ...config} = shake(
    props.configs,
    defaultConfigs[chartType]
  );
  console.log(config);
  useLayoutEffect(function() {
    //@ts-ignore
    if (chartType == 'map') {
      const mapScene = new DrawScene(eleRef.current, props.data, config);
      mapScene.draw();
    } else {
      //@ts-ignore
      new G2Plot[chartType](eleRef.current, {
        ...config,
        data: props.data
      }).render();
    }
  });

  return <div ref={eleRef}></div>;
});
