class Auth {
    //  SOURCE - https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
    static authenticateToken(token, firstname) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userFirstName', firstname);
    }
  
    static isUserAuthenticated() {
      return sessionStorage.getItem('token') !== null;
    }
  
    static deauthenticateUser() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userFirstName');
    }
  
    static getToken() {
      return sessionStorage.getItem('token');
    }

    static getUserName() {
      return sessionStorage.getItem('userFirstName');
    }
  
  }
  
  export default Auth;