import {configureStore} from '@reduxjs/toolkit';

import basketReducer from '../reducers/basketReducer';
import badgeReducer from '../reducers/badgeReducer';
import favoriteReducer from '../reducers/favoriteReducer';

export const store = configureStore({
    reducer: {
        basket: basketReducer,
        badge: badgeReducer,
        favorite: favoriteReducer,
    }
})
