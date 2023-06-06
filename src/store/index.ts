import { configureStore } from '@reduxjs/toolkit';
import  contactReducer from './contact';


//Creation of Store which hold respectove reducers
const store =  configureStore({
    reducer:{
        contacts: contactReducer,
    }
});


export type RootState =  ReturnType<typeof store.getState>;
export  type  AppDispatch = typeof store.dispatch;

export default store;