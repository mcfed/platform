import {RouteComponentProps} from 'react-router';

import router from './router';
import saga from './action';
import reducer from './reducer';
import * as model from './model';
import * as container from './container';
import * as i18n from './i18n';

export {saga, reducer, router, model, container, i18n};
export default (props: RouteComponentProps): any => router(props.match);
