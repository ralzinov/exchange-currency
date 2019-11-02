import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import CurrencyExchange from './routes/CurrencyExchange';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <CurrencyExchange />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
