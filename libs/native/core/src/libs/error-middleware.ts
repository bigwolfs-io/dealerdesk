import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import Toast from 'react-native-toast-message'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')

      if (action.payload?.status === 'FETCH_ERROR') {
        Toast.show({ type: 'error', text1: 'Async Error: URL does not exist', text2: 'Is BASE_URL configured properly?' })
      }
      else {
        Toast.show({ type: 'error', text1: 'Error: ' + action?.payload?.data?.error, text2: action?.payload?.data?.message, })
      }
      console.log(action)
    }


    return next(action)
  }
