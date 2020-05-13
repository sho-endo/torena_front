import 'reactn';
import { SnackbarSeverity } from './constants';

declare module 'reactn/default' {
  export interface State {
    isLoading: boolean;
    isLoggedIn: boolean;
    isOpenSnackbar: boolean;
    snackbarSeverity: SnackbarSeverity;
    snackbarMessage: string;
  }
}
