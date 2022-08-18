import {createSelector} from 'reselect';
import {IStore} from '@flux/store';

export const selectMessageStore = (state: IStore) => state.message;
export const getErrorType = createSelector(selectMessageStore, (message) => message.type);
export const getError = createSelector(selectMessageStore, (message) => message.error);
export const getWarning = createSelector(selectMessageStore, (message) => message.warning);
export const getSuccess = createSelector(selectMessageStore, (message) => message.success);
export const getInfo = createSelector(selectMessageStore, (message) => message.info);
