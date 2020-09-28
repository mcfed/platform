import Api from '../api';

jest.autoMockOff();

describe('Api单元测试', () => {
  const api = new Api();
  it('', () => {});
  // beforeEach(() => {
  //   fetchMock.resetMocks();
  // });
  // it('fetchConfig', async () => {
  //   const mockResult = {data: 'test'};
  //   fetchMock.mockResponse(JSON.stringify(mockResult));
  //   const result = await api.fetchPage({});
  //   expect(fetchMock.mock.calls[0][0]).toEqual(`/api_prefix`);
  //   expect(fetchMock.mock.calls[0][1]?.method).toEqual('GET');
  //   expect(result).toEqual(mockResult);
  // });
});
