import {connect} from 'react-redux';
import {Selector, Container} from '@mcfed/core';
import {withTokenAuth} from '../router/withTokenAuth';
import React from 'react';
import {RFLayout, RFPane} from '../components/layout';
import {RG2PlotChart} from '../components/Chart';
import {Scene} from '../components/Scene';
import BarConfig from './chart/Bar-20210323.json';
import PieConfig from './chart/Pie-20210323.json';
import WaterfallConfig from './chart/Waterfall-20210323.json';
import {
  LineConfig,
  LineChartshaper,
  ColumnConfig,
  MapConfig,
  RadarConfig,
  LiquidConfig
} from './chartConfig';

const {defaultMergeProps} = Container;
const {appSelector} = Selector;
console.log(BarConfig, PieConfig);
export function BasicLayout(props: any) {
  return (
    <RFLayout direction='column'>
      <RFPane style={{height: '80px', flex: 'none'}}>1</RFPane>
      <RFLayout direction='row' style={{position: 'relative'}}>
        <RFLayout
          direction='column'
          style={{
            position: 'absolute',
            zIndex: 99,
            left: 0,
            width: '350px',
            flex: 'none'
          }}>
          <RFPane>
            <Scene title='line'>
              <RG2PlotChart {...LineConfig}></RG2PlotChart>
            </Scene>
          </RFPane>
          <RFPane>
            <Scene title='column'>
              {/* <RG2PlotChart {...BarConfig}></RG2PlotChart> */}
            </Scene>
          </RFPane>
          <RFPane>
            <RG2PlotChart {...WaterfallConfig}></RG2PlotChart>
          </RFPane>
        </RFLayout>
        <RFPane>{/* <RG2PlotChart {...MapConfig}></RG2PlotChart> */}</RFPane>
        <RFLayout
          direction='column'
          style={{
            position: 'absolute',
            zIndex: 99,
            right: 0,
            width: '350px',
            flex: 'none'
          }}>
          <RFPane>
            <RG2PlotChart {...LineChartshaper}></RG2PlotChart>
          </RFPane>
          <RFPane>
            <RG2PlotChart {...PieConfig}></RG2PlotChart>
          </RFPane>
          <RFPane>{/* <RG2PlotChart {...PieConfig}></RG2PlotChart> */}</RFPane>
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
