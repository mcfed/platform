import {G6Event, IG6GraphEvent} from '@antv/g6-core';
import {Edge, Item} from '@antv/g6-pc';

const DEFAULT_TRIGGER = 'click';
const ALLOW_EVENTS = ['click', 'dblclick'];
export default {
  getDefaultCfg(): object {
    return {
      /**
       * 发生收缩/扩展变化时的回调
       */
      trigger: DEFAULT_TRIGGER,
      onChange() {}
    };
  },
  getEvents(): {[key in G6Event]?: string} {
    let trigger: string;
    // 检测输入是否合法
    //@ts-ignore
    if (ALLOW_EVENTS.includes(this.trigger)) {
      //@ts-ignore
      ({trigger} = this);
    } else {
      trigger = DEFAULT_TRIGGER;
      // eslint-disable-next-line no-console
      console.warn(
        "Behavior collapse-expand 的 trigger 参数不合法，请输入 'click' 或 'dblclick'"
      );
    }
    return {
      [`node:${trigger}`]: 'onNodeClick',
      // 支持移动端事件
      touchstart: 'onNodeClick'
    };
  },
  onNodeClick(e: IG6GraphEvent) {
    const {item} = e;
    console.log((item as Item).getType());
    if (!item || item?.getID() == 'node-0') return;
    //隐藏子节点
    function hideChildren(item: Item) {
      //@ts-ignore
      item.getOutEdges().map((eged: Edge) => {
        eged.getTarget().hide();
        eged.hide();
      });
    }
    /**
     * 收展子节点
     * @param item
     */
    function collapseChildren(item: Item) {
      //@ts-ignore
      item.getOutEdges().map((eged: Edge) => {
        // console.log(eged.isVisible(),eged)
        if (eged.isVisible()) {
          eged.getTarget().hide();
          eged.hide();
        } else {
          eged.getTarget().show();
          eged.show();
        }
      });
    }

    //@ts-ignore
    item.getInEdges().map((inEged: Edge) => {
      const rootItem = inEged.getSource();
      // @ts-ignore
      rootItem.getOutEdges().map((eged: Edge) => {
        // console.log(eged.getTarget().getID(),item.getID())
        if (eged.getTarget().getID() !== item.getID()) {
          hideChildren(eged.getTarget());
        } else {
          collapseChildren(eged.getTarget());
        }
      });
    });

    //@ts-ignore
    this.graph?.layout();
  }
};
