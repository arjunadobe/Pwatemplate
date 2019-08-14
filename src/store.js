import { createStore } from 'redux';

import middleware from 'parentSrc/middleware';
import errorHandler from 'parentSrc/middleware/errorHandler';
import reducer from 'parentSrc/reducers';
import composeEnhancers from 'parentSrc/util/composeEnhancers';

export default createStore(reducer, composeEnhancers(middleware, errorHandler));
