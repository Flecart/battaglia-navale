
import {createAction} from 'typesafe-actions';
import {ErrorType} from '@flux/StoreInterfaces';

export const setInfo = createAction('game/set_info')<{info: string}>();
export const setError = createAction('game/set_error')<{error: string}>();
export const setWarning = createAction('game/set_warning')<{warning: string}>();
export const setSuccess = createAction('game/set_success')<{success: string}>();
export const resetInfo = createAction('game/reset_info')<void>();
export const resetError = createAction('game/reset_error')<void>();
export const resetWarning = createAction('game/reset_warning')<void>();
export const resetSuccess = createAction('game/reset_success')<void>();

export const setErrorType = createAction('game/set_error_type')<{errorType: ErrorType}>();
