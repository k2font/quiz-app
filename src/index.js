import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './Components/App';

// thunk。アクションの代わりに関数を返すことができる。
import thunk from 'redux-thunk';

import './index.css';
import reducer from './Reducers'
import EventsIndex from './Components/events_index';
import EventsNew from './Components/events_new';
import EventsShow from './Components/events_show';
import QuizWindow from './Components/QuizWindow';
import GameMaster from './Components/GameMaster';
import TopPage from './Components/TopPage';
import Login from './Components/Login';
import NickName from './Components/NickName';
import Ranking from './Components/Ranking';
import Answers from './Components/Answers';

import * as serviceWorker from './serviceWorker';

// アプリケーション内部のstateはこのstoreに集約される
const enhancer = process.env.NODE_ENV === 'development' ?
    composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
const store = createStore(reducer, enhancer)
// createStoreの第二引数に組み入れることで、ミドルウェアが組み込まれる

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/keypad" component={App} />
                <Route exact path="/events/new" component={EventsNew} />
                <Route exact path="/events/:id" component={EventsShow} />
                <Route exact path="/events" component={EventsIndex} />
                <Route exact path="/quiz" component={QuizWindow} />
                <Route exact path="/game_master" component={GameMaster} />
                <Route exact path="/top_page" component={TopPage} />
                <Route exact path="/log_in" component={Login} />
                <Route exact path="/" component={Login} />
                <Route exact path="/addname" component={NickName} />
                <Route exact path="/ranking" component={Ranking} />
                <Route exact path="/answers" component={Answers} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
