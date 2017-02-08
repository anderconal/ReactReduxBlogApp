import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';

// Just an example to use in our routes
const Greeting = () => {
    return <div>Ander Conal</div>;
}

export default(
    <Route path="/" component={App}>
        <IndexRoute component={PostsIndex} />
        <Route path="greet" component={Greeting} />
        <Route path="greet2" component={Greeting} />
        <Route path="greet3" component={Greeting} />
    </Route>
);