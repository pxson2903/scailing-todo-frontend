import displayErrorMessage from '@/utils/displayErrorMessage';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.data.message) {
        displayErrorMessage(`${action.payload.data.message}`);
      } else {
        displayErrorMessage(`Something went wrong`);
      }
    }

    return next(action);
  };
