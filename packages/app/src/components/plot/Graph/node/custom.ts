import G6, { IGroup, IShape, ModelConfig } from "@antv/g6";

G6.registerNode(
    'circle-node',
    {
        //@ts-ignore
        draw(cfg: ModelConfig, group: IGroup): IShape {
            
            const triShape = group.addShape('circle',{
                attrs:{
                    size: [40]
                }
            })
           
            if (cfg.label) {
                // 如果有文本
                // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
                // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
                // style.text = cfg.label;
                const label = group.addShape('text', {
                    // attrs: style
                    attrs: {
                        x: 60, // 居中
                        y: 5,
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
            return triShape;
        },
    },
    'single-node',
);
