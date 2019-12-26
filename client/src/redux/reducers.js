import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import siteAudit from './site/reducer';


const reducers = combineReducers({
  menu,
  settings,
  authUser,
  siteAudit
});

export default reducers;