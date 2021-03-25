import {isString, deepMix} from '@antv/util';
import DataSet from '@antv/data-set';
import {View} from '@antv/data-set/lib/view';
import {resolve} from 'dns';
import {rejects} from 'assert';

DataSet.registerConnector('fetch', async (data: string) => {
  // let view: View | undefined;

  //   const promise = new Promise((resolve,rejects)=>resolve({a:1}))
  //  const adb =  await promise
  //  console.log(adb)
  // return deepMix([], []);

  // return await new Promise((resolve,rejects)=>resolve({a:1}))
  return [{a: 1}];
});
