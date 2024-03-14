const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        validationErrors: action.payload.validationErrors,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };

    default:
      return state;
  }
};

export default AuthReducer;
