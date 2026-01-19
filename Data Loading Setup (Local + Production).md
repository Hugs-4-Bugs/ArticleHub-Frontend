# 🌐 Data Loading Setup (Local + Production)

This document explains how **API data is loaded correctly in both local and production (Vercel)** environments in this Angular project.

---

## 1️⃣ Environment Files (MOST IMPORTANT)

### 📁 Location

```
src/environments/
```

### ✅ environment.ts (LOCAL)

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### ✅ environment.production.ts (PRODUCTION)

```ts
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-domain.com/api'
};
```

⚠️ **Rule**

* Local run → `environment.ts`
* Vercel / production build → `environment.production.ts`

Angular **automatically switches** based on build mode.

---

## 2️⃣ Angular File Replacement (VERIFY)

### 📁 angular.json

Ensure this exists **exactly** under `build.configurations.production`:

```json
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.production.ts"
  }
]
```

If this is missing → **production will still call localhost** ❌

---

## 3️⃣ API Service Pattern (MANDATORY)

### 📁 Location

```
src/app/services/
```

### ✅ Correct Service Example

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getArticles() {
    return this.http.get(`${this.baseUrl}/articles`);
  }
}
```

⚠️ **Never hardcode URLs**

```ts
❌ http://localhost:8080
❌ https://prod-url
```

---

## 4️⃣ Token Interceptor (If Auth Used)

### 📁 Location

```
src/app/services/token.interceptor.ts
```

### ✅ Correct Setup

```ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
```

⚠️ `catchError` **must be imported from**

```
rxjs/operators
```

---

## 5️⃣ Register Interceptor

### 📁 app.module.ts

```ts
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
]
```

---

## 6️⃣ CORS (BACKEND SIDE – REQUIRED)

Your backend **must allow Vercel domain**.

### ✅ Example (Spring Boot)

```java
@CrossOrigin(
  origins = {
    "http://localhost:4200",
    "https://articlehub.vercel.app"
  }
)
```

Without this → production API calls will fail silently.

---

## 7️⃣ Production Build Command (VERCEL)

### 📁 package.json

```json
"scripts": {
  "vercel-build": "ng build --configuration production"
}
```

Vercel always uses **production environment file**.

---

## 8️⃣ Verify Production Output

After build:

```
dist/temp-articlehub/
 ├── index.html
 ├── main.*.js
 ├── polyfills.*.js
 ├── runtime.*.js
 └── assets/
```

If data loads locally but not in prod:

* Open DevTools → Network tab
* Check API request URL
* It **must NOT be localhost**

---

## 9️⃣ Common Mistakes Checklist ❌

* ❌ Hardcoded API URL
* ❌ Missing fileReplacements
* ❌ Wrong interceptor import
* ❌ CORS not enabled
* ❌ Using dev build in production

---

## ✅ Final Rule (Remember This)

> **Environment decides API**
>
> **Build decides environment**
>
> **Vercel always = production**

---
