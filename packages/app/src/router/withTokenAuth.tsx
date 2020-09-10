import React, {ComponentType} from 'react';

export function withTokenAuth(Component: ComponentType<any>) {
  return class TokenAuthHOC extends React.Component {
    constructor(props: any) {
      super(props);
      const {history, appReducer} = props;
      const user = appReducer?.user;
      // if (!user?.token) {
      //   history.push('/not-login/login');
      // }
    }
    render() {
      return <Component {...this.props} />;
    }
  };
}
