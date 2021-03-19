import React, {useLayoutEffect, useRef} from 'react';
import * as G2Plot from '@antv/g2plot';
import DrawScene from '../Chart/map';

interface PG2PloatChat {
  id: string;
  type: string;
  data: any;
  configs: any;
}

export const RG2PlotChart = React.forwardRef((props: PG2PloatChat) => {
  const eleRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(function() {
    //@ts-ignore
    if (props.type == 'map') {
      const mapScene = new DrawScene(eleRef.current, props.data, props.configs);
      mapScene.draw();
    } else {
      //@ts-ignore
      new G2Plot[props.type](eleRef.current, {
        ...props.configs,
        data: props.data
      }).render();
    }
  });

  return <div ref={eleRef}></div>;
});
