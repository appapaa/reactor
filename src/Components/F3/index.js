import React, {Component} from 'react';

import Loadable from 'react-loadable';
import Loading from '../Loading';

const F1 = Loadable({
    loader: () => import('../F1'),
    loading: Loading
});

class Plugin extends Component {
    render() {
        debugger;
        // console.log(F1);
        return <F1/>;
    }
}

Plugin.displayName = 'F3';
export default Plugin;
