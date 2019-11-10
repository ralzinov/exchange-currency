import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import {Loading} from '../components/Loading';
import {Content} from '../components/Content';
import {Header} from '../components/Header';

import CurrencyExchange from './routes/CurrencyExchange';
import NoRoute from './routes/NoRoute/NoRoute';
import Wallet from './routes/Wallet';
import initStore from './store';

const store = initStore();

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Header>
                {/*<Link to="/">Exchange</Link>*/}
                {/*<Link to="/exchange">Wallet</Link>*/}
            </Header>
            <Content>
                <React.Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route exact path="/">
                            <CurrencyExchange/>
                        </Route>
                        <Route exact path="/wallets">
                            <Wallet/>
                        </Route>
                        <Route component={NoRoute}/>
                    </Switch>
                </React.Suspense>
            </Content>
        </BrowserRouter>
    </Provider>
);

export default App;
