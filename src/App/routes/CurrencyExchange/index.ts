import * as React from 'react';

export default React.lazy(() => {
    import('./store');
    return import('./CurrencyExchange');
});
