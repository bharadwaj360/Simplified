const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  };
  
  let state = { ...INITIAL_STATE };
  
  // Listeners
  const listeners = [];
  
  function addListener(callback) {
    listeners.push(callback);
  }
  
  function notifyListeners() {
    listeners.forEach((listener) => listener(state));
  }
  
  // Reducer function
  function authReducer(state, action) {
    switch (action.type) {
      case "LOGIN_START":
        return {
          ...state,
          user: null,
          loading: true,
          error: null,
        };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          user: null,
          loading: false,
          error: action.payload,
        };
      case "LOGOUT":
        return {
          ...state,
          user: null,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  }
  
  function dispatch(action) {
    state = authReducer(state, action);
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
    notifyListeners();
  }
  
  function loginUser(userData) {
    dispatch({ type: "LOGIN_START" });
    setTimeout(() => {
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      console.log("Login successful!");
    }, 1000);
  }
  
  function logoutUser() {
    dispatch({ type: "LOGOUT" });
    console.log("Logged out successfully!");
  }
  
  const authContext = {
    state,
    dispatch,
    addListener,
    loginUser,
    logoutUser,
  };
  
  export default authContext;