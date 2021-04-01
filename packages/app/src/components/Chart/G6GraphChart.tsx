import React, {useLayoutEffect, useRef} from 'react';
// import {DataSet} from '@antv/data-set'

interface PG6GraphChart {
  id: string;
  data: any;
  fetch?: any;
  //   ds?: typeof DataSet;
  type?: string;
  configs: any;
}

export const RG2PlotChart = React.forwardRef((props: PG6GraphChart) => {
  const eleRef = useRef<HTMLDivElement>(null);
  const graph = props.type;

  useLayoutEffect(function() {
    // new graph(eleRef.current).render();
  });

  return <div ref={eleRef}></div>;
});
