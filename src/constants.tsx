import { UserCreateProps, UserPatchProps, UserSignInProps } from "./interfaces";

export const NO_USER_MSG = "Login or sign up to view jobs and companies";
export const IMG_NOT_FOUND = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
export const BACKGROUND_IMG = "https://digitaladdictsblog.com/wp-content/uploads/2018/01/Digital-Addicts-superior-spy-apps-catch-a-cheater-smartphone.jpg";
export const SIGN_IN_INITIAL_STATE: UserSignInProps = {
    username: "",
    password: ""
}
export const SIGN_UP_INITIAL_STATE: UserCreateProps = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
}
export const PATCH_INITIAL_STATE: UserPatchProps = {
    password: "",
    firstName: "",
    lastName: "",
    email: "",
}