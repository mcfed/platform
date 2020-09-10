import routes from '../router';

describe('router测试', () => {
  const props = {
    path: '/test'
  };
  it('routes', () => {
    const result = routes(props);
    expect(result.length).toBe(4);
    expect(result[0].path).toBe('/test');
  });
});
