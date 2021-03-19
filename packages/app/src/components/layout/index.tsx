import React, {CSSProperties, ReactNode} from 'react';
import './index.css';

export interface PLayout {
  className?: string;
  direction?: 'column' | 'row';
  children: ReactNode;
  style?: CSSProperties;
}
const DLayout: PLayout = {
  className: '',
  direction: 'row',
  children: null
};

export function RFLayout(props: PLayout = DLayout) {
  return (
    <div
      className={['flex-layout', props.className].join(' ')}
      style={{...props.style, flexDirection: props.direction}}>
      {props.children}
    </div>
  );
}

export interface PPane {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function RFPane(props: PPane) {
  return (
    <div
      className={['flex-pane', props.className].join(' ')}
      style={props.style}>
      {props.children}
    </div>
  );
}
