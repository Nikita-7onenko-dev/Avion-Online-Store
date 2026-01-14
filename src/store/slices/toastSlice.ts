import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { ToastType } from "@/types/ToastType";

type InitialStateType = {
  visible: ToastType[];
  queue: ToastType[];
}

type ToastPayloadType = Omit<ToastType, 'id'>

const initialState: InitialStateType = {
  visible: [],
  queue: []
}

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    _internalPushToastToVisible(state, action: PayloadAction<ToastType>) {
      const toast = action.payload
      state.visible.push(toast);
    },

    _internalPushToastToQueue(state, action: PayloadAction<ToastType>) {
      const toast = action.payload;
      state.queue.push(toast);
    },

    _internalDeleteVisibleToast(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.visible = state.visible.filter(toast => toast.id !== id);
    },

    _internalShiftQueue(state) {
      const toast = state.queue.shift();
      if(toast) state.visible.push(toast);
    }
  }
})

export const toastsSliceReducer = toastsSlice.reducer;

const {
  _internalPushToastToVisible,
  _internalPushToastToQueue,
  _internalDeleteVisibleToast,
  _internalShiftQueue
} = toastsSlice.actions;

export const showToastThunk = (toastPayload: ToastPayloadType) => (dispatch: AppDispatch, getState: () => RootState ) => {
  const state = getState().toasts;
  const toast = { ...toastPayload, id: nanoid() }

  if(state.visible.length < 3) {
    dispatch(_internalPushToastToVisible(toast))
  } else {
    dispatch(_internalPushToastToQueue(toast));
  }
}

export const deleteToastThunk = (id: string) => (dispatch: AppDispatch) => {
  dispatch(_internalDeleteVisibleToast(id));
  dispatch(_internalProcessQueueThunk());
}

const _internalProcessQueueThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState().toasts;

  if(state.queue.length > 0 && state.visible.length < 3) {
    dispatch(_internalShiftQueue());
  }
}