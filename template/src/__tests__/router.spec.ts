import routes from '../router';

describe('router测试', () => {
  const props = {
    path: '/test'
  };
  it('routes', () => {
    const result = routes(props);
    expect(result.length).toBe(4);
    expect(result[0].path).toBe('/test');
    expect(result[1].path).toBe('/test/add');
    expect(result[2].path).toBe('/test/:id/edit');
    expect(result[3].path).toBe('/test/:id');
  });
});
