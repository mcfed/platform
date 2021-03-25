import DataSet from '@antv/data-set';
import './fetch';

describe('connector fetch', () => {
  it('new DataSet', done => {
    const dv = new DataSet.DataView().source(
      'http://192.168.200.178:3000/mock/173/usercenter/app',
      {
        //@ts-ignore
        type: 'fetch'
      }
    );
    console.log(dv.rows);
    done();
  });
});
