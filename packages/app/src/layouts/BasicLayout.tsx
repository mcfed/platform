import {connect} from 'react-redux';
import {Selector, Container} from '@mcfed/core';
import {withTokenAuth} from '../router/withTokenAuth';
import React from 'react';
import {RFLayout, RFPane} from '../components/layout';
import {RG2PlotChart} from '../components/chart';
import {Scene} from '../components/scene';
import BarConfig from './chart/Bar-20210323.json';
import PieConfig from './chart/Pie-20210323.json';
import WaterfallConfig from './chart/Waterfall-20210323.json';
import ScatterConfig from './chart/Scatter-20210323.json';
import GroupColumnConfig from './chart/GroupColumn-20210324.json';
import {
  LineConfig,
  LineChartshaper,
  ColumnConfig,
  MapConfig,
  RadarConfig,
  LiquidConfig
} from './chartConfig';
import {RG6GraphChart} from '../components/chart/G6GraphChart';
import G6, { Item } from '@antv/g6';

const {defaultMergeProps} = Container;
const {appSelector} = Selector;
console.log(BarConfig, PieConfig);
const G6Configs = {
  modes: {
    default: [
      'drag-canvas',
      // 'zoom-canvas',
      'node-collapse'
    ],
  },
  defaultEdge: {
    type: 'line',
    style: {
      endArrow: {
        path: G6.Arrow.vee(15, 15, 15), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
        d: 15
      },
      fill: '#0f0',
      label: {
        // value: icons['safety certificate'],
        // fontFamily: fontFamily,
        fontSize: 20,
        fill: '#0f0'
      },
      keyshape: {
        stroke: '#0f0', // 样式属性，元素的描边色
        lineWidth: 1,
        lineDash: [5, 4]
        // lineWidth: 4,
      }
    }
  },
  defaultNode: {
    type: 'rect',
    position: 'left',
    style: {
      background: {
        fill: '#ffffff',
        stroke: 'green',
        padding: [3, 2, 3, 2],
        radius: 2,
        lineWidth: 3,
      },
    },
  },
  layout: {
    type: 'graphin-force',
    linkDistance:80,
    animation:false
    // direction: 'RL',
  }
};
export function BasicLayout(props: any) {
  const data = {
    nodes: [
      {
        id: 'node-0',
        parent:'node-0',
        label: '应用名称',
        size:[50]
      },
      {
        id: 'node-1',
        parent:'node-0',
        label: '命令空间',
        type: 'rect',
      },
      {
        id: 'node-1-1',
        parent:'node-1',
        label: '授权空间',
        type: 'rect',
      },
      {
        id: 'node-1-2',
        parent:'node-1',
        label: '非授权空间',
      },
      {
        id: 'node-2',
        parent:'node-0',
        label: '文件空间',
        type:"star"
      },
      {
        id: 'node-2-1',
        parent:'node-2',
        label: '授权空间',
      },
      {
        id: 'node-2-2',
        parent:'node-2',
        label: '非授权空间',
      },
      {
        id: 'node-3',
        parent:'node-0',
        label: '执行空间',
      },
      {
        id: 'node-3-1',
        parent:'node-3',
        label: '授权空间',
      },
      {
        id: 'node-3-2',
        parent:'node-3',
        label: '非授权空间',
      },
    ],
    edges: [
      {
        source: 'node-0',
        target: 'node-1',
      },
      {
        source: 'node-1',
        target: 'node-1-1',
      },
      {
        source: 'node-1',
        target: 'node-1-2',
      },
      {
        source: 'node-0',
        target: 'node-2',
      },
      {
        source: 'node-2',
        target: 'node-2-1',
      },
      {
        source: 'node-2',
        target: 'node-2-2',
      },
      {
        source: 'node-0',
        target: 'node-3',
      },
      {
        source: 'node-3',
        target: 'node-3-1',
      },
      {
        source: 'node-3',
        target: 'node-3-2',
      },
    ]
  };
  const treeData={
    id: 'node-0',
    label: 'node-0',
    type: 'graphin-circle',
    children:[{
      id: 'node-1',
      label: 'node-1',
      type: 'graphin-circle',
    },
    {
      id: 'node-2',
      label: 'node-2',
      type: 'graphin-circle',
    },
    {
      id: 'node-3',
      label: 'node-3',
      type: 'graphin-circle',
      
    }]
  }
  return (
    <RFLayout direction='column'>
      <RFPane style={{height: '80px', flex: 'none'}}>header</RFPane>
      <RFLayout direction='row' style={{position: 'relative'}}>
        <RFLayout
          direction='column'
          style={{
            position: 'absolute',
            zIndex: 99,
            left: 0,
            top: 0,
            bottom: 0,
            width: '350px',
            flex: 'none'
          }}>
          <RFPane>
            <Scene title='line1'>
              <RG2PlotChart {...LineConfig}></RG2PlotChart>
            </Scene>
          </RFPane>
          <RFPane>
            <Scene title='line'>
              <RG2PlotChart {...LineConfig} type='listTop'></RG2PlotChart>
            </Scene>
          </RFPane>
          <RFPane>
            <Scene title='bar'>
              <RG2PlotChart {...BarConfig}></RG2PlotChart>
            </Scene>
          </RFPane>
        </RFLayout>
        <RFPane
          style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
          <Scene title='g6'>
            <RG6GraphChart
              type='Graph'
              data={data}
              id='sdf'
              configs={G6Configs}></RG6GraphChart>
          </Scene>
        </RFPane>
        <RFLayout
          direction='column'
          style={{
            position: 'absolute',
            zIndex: 99,
            right: 0,
            top: 0,
            bottom: 0,
            width: '350px',
            flex: 'none'
          }}>
          <RFPane>
            <Scene title='g6'>
              <RG6GraphChart
                type='TreeGraph'
                data={data}
                id='sdf'
                configs={treeData}></RG6GraphChart>
            </Scene>
          </RFPane>
          <RFPane>
            <Scene title='pie'>
              <RG2PlotChart {...PieConfig}></RG2PlotChart>
            </Scene>
          </RFPane>
          <RFPane>
            <Scene title='scatter'>
              <RG2PlotChart {...ScatterConfig}></RG2PlotChart>
            </Scene>
          </RFPane>
        </RFLayout>
      </RFLayout>
    </RFLayout>
  );
}

const mapStateToProps = (state: any, props: any) => {
  return {
    appReducer: appSelector(state)
  };
};

const dispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    actions: {}
  };
};

const BasicLayoutContainer = connect(
  mapStateToProps,
  dispatchToProps,
  defaultMergeProps
)(withTokenAuth(BasicLayout));

export default BasicLayoutContainer;
