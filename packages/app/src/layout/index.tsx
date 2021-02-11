import React, {ReactNode} from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from '@blueprintjs/core';

import '@blueprintjs/core/lib/css/blueprint.css';

interface PLayout {
  direction: 'column' | 'row';
  children: ReactNode;
}

export function RCLayout(props: PLayout) {
  return (
    <div className='flex-layout' style={{flexDirection: props.direction}}>
      {props.children}
    </div>
  );
}

interface PHeader {
  alignRight: Boolean;
}

export function RCHeader(props: PHeader) {
  return (
    <Navbar>
      <NavbarGroup align={props.alignRight ? Alignment.RIGHT : Alignment.LEFT}>
        <NavbarHeading>Blueprint</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon='home' text='Home' />
        <Button className={Classes.MINIMAL} icon='document' text='Files' />
      </NavbarGroup>
    </Navbar>
  );
}

export function BasicLayout() {
  return (
    <RCLayout direction='row'>
      <RCHeader alignRight={true}></RCHeader>
    </RCLayout>
  );
}
