// link layout
import config from '~/config/config.js';

// Layout Upload
import {HeaderOnly} from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Notication from '~/pages/Notication';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.notication, component: Notication },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null},
    { path: config.routes.live, component: Live, layout: null},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };