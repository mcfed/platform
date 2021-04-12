import G6, { IGroup, IShape, ModelConfig } from "@antv/g6";

G6.registerNode(
    'circle-node',
    {
        //@ts-ignore
        draw(cfg: ModelConfig, group: IGroup): IShape {
            const {size} = cfg
            const rect = group.addShape('rect', {
                attrs: {
                //@ts-ignore
                  width: size[0],
                //@ts-ignore
                  height: size[0],
              
                //   fill: '#9EC9FF',
                  stroke: '#5B8FF9',
                  lineWidth: 1,
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'triangle-shape',
                draggable: true,
            });
            const circle = group.addShape('circle', {
                attrs: {
                    //@ts-ignore
                  r:size[0]/2,
                    //@ts-ignore
                  x: size[0]/2,
                  //@ts-ignore
                  y: size[0]/2,
                //   fill: '#9EC9FF',
                  stroke: '#5B8FF9',
                  lineWidth: 1,
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'circle-shape',
                draggable: true,
            });
            const outCircle = group.addShape('circle', {
                attrs: {
                    //@ts-ignore
                  r:size[0]/2+20,
                    //@ts-ignore
                  x: size[0]/2,
                  //@ts-ignore
                  y: size[0]/2,
                //   fill: '#9EC9FF',
                  stroke: '#5B8FF9',
                  lineWidth: 1,
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'circle-shape',
                draggable: true,
            });
            if (cfg.label) {
                // 如果有文本
                // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
                // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
                // style.text = cfg.label;
                const label = group.addShape('text', {
                    // attrs: style
                    attrs: {
                        textAlign: 'center',
                        textBaseline: 'bottom',
                        text: cfg.label,
                        fill: '#000',
                    },
                    // must be assigned in G6 3.3 and later versions. it can be any value you want
                    name: 'text-shape',
                    // 设置 draggable 以允许响应鼠标的图拽事件
                    draggable: true,
                });
            }
            return rect;
        },
    },
    'single-node',
);


