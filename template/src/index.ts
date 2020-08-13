import {RouteComponentProps} from 'react-router';

import router from './router';
import saga from './action';
import reducer from './reducer';
import * as model from './model';
import * as container from './container';

export {saga, reducer, router, model, container};
export default (props: RouteComponentProps): any => router(props.match);
