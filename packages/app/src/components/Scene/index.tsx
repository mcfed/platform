import {Spin} from 'antd';
import React, {ReactNode} from 'react';

type CScene = (props: PScene) => JSX.Element;

interface PScene {
  title?: string;
  prefix?: string;
  loading?: boolean;
  data?: any;
  className?: string;
  children: ReactNode;
  renderFooter?: () => ReactNode;
}

export const Scene: CScene = (props: PScene) => {
  const prefixClassName = props.prefix || 'scene';

  function header() {
    return (
      <div className={[prefixClassName, 'header'].join('_')}>
        <div className={[prefixClassName, 'title'].join('_')}>
          <h3>{props.title}</h3>
          <div>more</div>
        </div>
      </div>
    );
  }

  function footer() {
    return (
      <div className={[prefixClassName, 'footer'].join('_')}>
        {props.renderFooter}
      </div>
    );
  }
  return (
    <div className={[prefixClassName, props.className].join(' ')}>
      {props.title ? header() : null}
      <div className={[prefixClassName, 'body'].join('_')}>
        {props.loading == true ? <Spin></Spin> : props.children}
      </div>
      {props.renderFooter ? footer() : null}
    </div>
  );
};
