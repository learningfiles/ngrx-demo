export interface SharedState {
  showLoading: boolean;
  errorMsg: string;
}

export const initialSharedState: SharedState = { showLoading: false, errorMsg: '' };
