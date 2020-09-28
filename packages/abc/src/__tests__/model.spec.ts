import Model, {namespace} from '../model';

describe('model测试', () => {
  it('namespace|modelName', () => {
    expect(namespace).toBe('test');
    expect(Model.modelName).toBe('test');
  });

  it('初始化', () => {
    const initFieldsSpy = jest.spyOn(Model.prototype, 'initFields');

    new Model({id: 1});

    expect(initFieldsSpy).toHaveBeenCalled();
  });

  it('完整初始化', () => {
    const modal = new Model({
      id: 1
    });

    expect(modal.id).toBe(1);
  });
});
