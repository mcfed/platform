import {Decorator} from '@mcfed/core';
import {PK} from '@mcfed/crud';

const {param, loading} = Decorator;

export default class BaseAction {
  constructor(
    public readonly reducer: any,
    public readonly api: any,
    public middleware: any
  ) {}

  @param()
  @loading()
  async fetchPage(params: any) {
    const data = await this.api.fetchPage(params);
    if (data?.code === 200) {
      this.reducer.savePage(data.data);
    } else {
      this.middleware.showError(data.msg);
    }
  }

  @loading()
  async fetchItem(id: PK) {
    const data = await this.api.fetchItem(id);
    if (data?.code === 200) {
      this.reducer.saveItem(data.data);
    } else {
      this.middleware.showError(data.msg);
    }
  }

  @loading()
  async fetchDelete(ids: PK) {
    const data = await this.api.fetchDelete(ids);
    if (data?.code === 200) {
      this.middleware.showSuccess('请求成功！');
      this.middleware.refreshPage({fn: this.fetchPage, scope: this});
    } else {
      this.middleware.showError(data.msg);
    }
  }

  @loading()
  async fetchSave(params: any) {
    const data = await this.api.fetchSave(params);
    if (data?.code === 200) {
      this.middleware.showSuccess('请求成功！');
      this.middleware.goBack();
      this.middleware.refreshPage({fn: this.fetchPage, scope: this});
    } else {
      this.middleware.showError(data.msg);
    }
  }

  @loading()
  async fetchUpdate(params: any) {
    const data = await this.api.fetchUpdate(params);
    if (data?.code === 200) {
      this.middleware.showSuccess('请求成功！');
      this.middleware.goBack();
      this.middleware.refreshPage({fn: this.fetchPage, scope: this});
    } else {
      this.middleware.showError(data.msg);
    }
  }
}
