import React, {useLayoutEffect, useRef} from 'react';
import * as G2Plot from '@antv/g2plot';
import DrawScene from './map';
import {ListTop} from '../html';
import {Editor, defaultConfigs} from '@antv/g2plot-schemas';
import {isEqual} from '@antv/util';
import DataSet from '@antv/data-set';

interface PG2PloatChart {
  id: string;
  data: any;
  fetch?: any;
  ds?: DataSet;
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

export const RG2PlotChart = React.forwardRef((props: PG2PloatChart) => {
  const eleRef = useRef<HTMLDivElement>(null);
  const chartType = props.configs.type || props.type;
  // console.log(props.data)
  const {xAxis, yAxis, height, width, label, ...config} = shake(
    props.configs,
    //@ts-ignore
    defaultConfigs[chartType]
  );
  useLayoutEffect(function() {
    //@ts-ignore
    if (chartType == 'map') {
      new DrawScene(eleRef.current, props.data, config).draw();
    } else if (chartType == 'listTop') {
      // console.log(chartType)
      new ListTop({
        id: props.id,
        container: eleRef.current as HTMLElement,
        items: props.data
      }).render();
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
