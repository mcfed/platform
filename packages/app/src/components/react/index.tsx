import {HtmlComponent, IList, ListItem} from '@antv/component';
import React from 'react';
import ReactDOM from 'react-dom';
import {List, Typography} from 'antd';

export class ReactG2Component extends HtmlComponent {
  renderReact() {
    const items = this.get('items');
    return (
      <List
        bordered
        dataSource={items}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      />
    );
  }
  render() {
    const parent: HTMLElement = this.get('parent');
    const curContainer: HTMLElement = this.get('container');
    this.set('container', curContainer);
    ReactDOM.render(this.renderReact(), curContainer);
  }
}
