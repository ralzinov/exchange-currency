import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import Loading from '../components/Loading';
import Content from '../components/Content';
import Header from '../components/Header';

import CurrencyExchange from './routes/CurrencyExchange';
import Wallet from './routes/Wallet';

const App = () => {
    return (
        <BrowserRouter>
            <Header>
                {/*<Link to="/">Wallet</Link>*/}
                {/*<Link to="/">Exchange</Link>*/}
            </Header>
            <Content>
                <React.Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route exact path="/">
                            <CurrencyExchange/>
                        </Route>
                        <Route exact path="/wallet">
                            <Wallet/>
                        </Route>
                    </Switch>
                </React.Suspense>
            </Content>
        </BrowserRouter>
    );
};

export default App;
