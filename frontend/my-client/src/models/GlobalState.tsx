import { IUser } from 'common-atom/interfaces/user.interface';

export default interface GlobalState {
    [x: string]: any;
    isLoading: boolean;
    user: IUser | null;
    error: string; // HTTP ERROR CODE
    isDarkMode: boolean;
}
