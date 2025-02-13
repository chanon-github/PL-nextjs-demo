import { configureStore } from '@reduxjs/toolkit';
import isCollapseReducer from './isCollapseReducer';
import userReducer from './reducers/userReducer'; // Import your user reducer

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignoredActions: ['REFRESH_JOB'],  #Ignore these action types
        // ignoredActionPaths: ['payload.date'] , # Ignore these field paths in all actions
        // ignoredPaths: ['isCollapse.refreshJobAt'], #Ignore these paths in the state
      },
    }),
  reducer: {
    isCollapse: isCollapseReducer,
    user:userReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
