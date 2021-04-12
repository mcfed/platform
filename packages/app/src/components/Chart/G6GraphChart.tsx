import React, {useLayoutEffect, useRef} from 'react';
import {G6Plot} from '../plot/G6Plot';
import {adaptor} from '../plot/Graph/adaptor';
import {Template} from '../plot/Graph/index';

interface PG6GraphChart {
  id: string;
  data: any;
  type?: string;
  configs: any;
}

export const RG6GraphChart = React.forwardRef((props: PG6GraphChart) => {
  const eleRef = useRef<HTMLDivElement>(null);
  const {xAxis, yAxis, height, width, label, ...config} = props.configs;
  const chartType = props.configs.type || props.type;
  // console.log(props.data)
  useLayoutEffect(function() {
    //@ts-ignore
    new Template(eleRef.current, {...config, data: props.data}).render();
    //TODO: 统一注册到G6Plot接入 adaptor 模式使用
    // new G6Plot(eleRef.current,config,adaptor,{}).render()
  });

  return <div ref={eleRef}></div>;
});
