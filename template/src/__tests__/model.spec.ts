import Model, {namespace} from '../model';

describe('model测试', () => {
  it('namespace|modelName', () => {
    expect(namespace).toBe('Demo');
    expect(Model.modelName).toBe('Demo');
  });

  it('初始化', () => {
    const initFieldsSpy = jest.spyOn(Model.prototype, 'initFields');

    new Model({id: 1});

    expect(initFieldsSpy).toHaveBeenCalled();
  });

  it('完整初始化', () => {
    const modal = new Model({
      id: 1,
      name: 'name',
      nickname: 'nickname',
      title: 'title'
    });

    expect(modal.id).toBe(1);
    expect(modal.name).toBe('name');
    expect(modal.nickname).toBe('nickname');
    expect(modal.title).toBe('title');
  });
});
