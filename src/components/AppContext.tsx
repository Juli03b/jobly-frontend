import React from "react";
import { UserProps, UserTokenProps } from "../interfaces";
interface AppContextProps {
    user: UserProps | undefined;
    userToken: UserTokenProps | undefined;
    token?: string | undefined;
    signIn: Function;
    signUp: Function;
    patchUser: Function;
    applyToJob: Function;
    isApplied: Function;
}

export default React.createContext<AppContextProps>({
    user: undefined,
    userToken: undefined,
    signIn: Function,
    signUp: Function,
    patchUser: Function,
    applyToJob: Function,
    isApplied: Function
});