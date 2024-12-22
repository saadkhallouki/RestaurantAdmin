// src/app/interceptors/token.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  // Exclude all URLs that start with "/public"
  const isPublicRequest = req.url.startsWith('http://localhost:8080/public');

  // If the URL is public, forward the request without adding the Authorization header
  if (isPublicRequest) {
    return next(req);
  }

  // Otherwise, add the Authorization header if the token exists
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq); // Pass the modified or original request to the next handler
};
