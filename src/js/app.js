import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import Admin from './containers/admin/admin';
import Expl from './containers/exploitation/Expl';
import Transp from './containers/transport/Transp';
import Err404 from './containers/Err404';

import listReducers from './reducers/listReducers';
import order from './reducers/transport/_currentOrder';

// создаём хранилище всех данных в приложении
// передаём ей reducer
const history = createHistory({
    forceRefresh: true
});
const middleware = routerMiddleware(history);
const store = createStore(listReducers,composeWithDevTools(applyMiddleware(thunk,middleware)));
// подписка на изменение
// store.subscribe(()=>{
//         store.getState();
// });

ReactDOM.render(
    // Передаём наш store - будет доступен каждому child компоненту
    <Provider store={store}>
        <Router > 
            <Switch>
                <Route exact path='/' component={Index} />
                <Route exact path='/admin' component={Admin} />
                <Route exact path='/expl' component={Expl} />
                <Route exact path='/transp' component={Transp} />
                <Route exact path='/404' component={Err404} />
            </Switch>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
);


// Подписка на изменение store
    // store.subscribe(()=>{
    //     store.getState();
    // });
