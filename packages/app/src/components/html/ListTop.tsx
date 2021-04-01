import {HtmlComponent, IList, ListItem} from '@antv/component';
import React from 'react';
import ReactDOM from 'react-dom';
import {List, Typography} from 'antd';
import {createDom, modifyCSS} from '@antv/dom-util';
import {isElement} from '@antv/util';

export class ListTop extends HtmlComponent {
  // getItems(): ListItem[] {
  //     throw new Error('Method not implemented.');
  // }
  // setItems(items: ListItem[]) {
  //     throw new Error('Method not implemented.');
  // }
  // updateItem(item: ListItem, cfg: object) {
  //     throw new Error('Method not implemented.');
  // }
  // clearItems() {
  //     throw new Error('Method not implemented.');
  // }
  // setItemState(item: ListItem, state: string, value: boolean) {
  //     throw new Error('Method not implemented.');
  // }
  // getItemsByState(state: any): ListItem[] {
  //     throw new Error('Method not implemented.');
  // }
  // hasState(item: ListItem, state: string): boolean {
  //     throw new Error('Method not implemented.');
  // }
  // clearItemsState(state: string) {
  //     throw new Error('Method not implemented.');
  // }

  renderReact() {
    const items = this.get('items');
    return (
      <List
        bordered
        dataSource={items}
        renderItem={(item: any) => (
          <List.Item>
            <Typography.Text mark>[{item.series}]</Typography.Text>
            {item.y}-{item.x}
          </List.Item>
        )}
      />
    );
  }

  render() {
    const parent: HTMLElement = this.get('parent');
    const curContainer: HTMLElement = this.get('container');
    // if (curContainer && curContainer.parentNode === parent) {
    //   parent.replaceChild(node, curContainer);
    // } else {
    // //   parent.appendChild(node);
    // }
    this.set('container', curContainer);
    ReactDOM.render(this.renderReact(), curContainer);
  }
}
