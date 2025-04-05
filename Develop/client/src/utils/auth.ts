import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) { //if token does not exist, then it will return null
      return null;
    }
    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded;
    }
    catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decoded: JwtPayload = jwtDecode(token);
    if (!decoded) {
      return false;
    } 
    if (token && decoded) {
      return true;
  }
}
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) {
        return decoded.exp ? decoded.exp * 1000 < Date.now() : true;
      }
      return false;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
  }

  getToken(): string | null {
    // TODO: return the token
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');

  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login');
    

  }
}

export default new AuthService();
