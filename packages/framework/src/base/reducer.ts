export default class BaseReducer {
  /**
   * fetchPage list
   * @param payload
   */
  /**
   * 保存list页面分页信息容错
   */
  savePage(payload: {pageSize: number; currentPage: number; total: number}) {
    const {pageSize, currentPage, total} = payload || {};
    return {
      page: {
        total,
        pageSize,
        current: currentPage
      }
    };
  }

  /**
   * 保存list页面分页信息
   * @param payload
   */
  saveList(payload: {total: number; currentPage: number}) {
    return {
      // items:payload.items,
      page: {
        total: payload?.total,
        current: payload?.currentPage
      }
    };
  }

  /**
   * 保存item
   * @param payload
   */
  saveItem(payload: any) {
    return {};
  }

  /**
   * 默认 getReducer
   * @param payload a
   */

  getReducer(payload: any) {}
}
