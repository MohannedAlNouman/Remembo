import {configureStore} from "@reduxjs/toolkit";

import user from "./Reducers/user.js";

const rootReducer = {user};

const store = configureStore({
  reducer: rootReducer
});

export default store;
