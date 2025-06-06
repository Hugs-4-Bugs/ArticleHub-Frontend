# 📰 ArticleHub Frontend

**ArticleHub** is a premium blog-based Angular frontend designed for viewing, filtering, and managing published articles. This project is built using Angular 16 with Angular Material and Flex Layout for responsive UI.

A sleek, theme-switchable article management system built using Angular v16, Angular Material, and Flex Layout. This is the frontend of the complete ArticleHub project.

💡 This works with the backend repo:

**👉 ArticleHub-Backend:** https://github.com/Hugs-4-Bugs/ArticleHub-Application

---

## 🚀 Features

* 🗂️ View articles by category, title, and status
* 🔍 Live article filtering with search input
* 🌙 Dynamic theming using Angular Material palettes
* 📄 Dialog popup to view full article content
* ⚙️ Componentized structure (cards, dialogs, services)
* 🧠 Smart UI: hover effects, smooth transitions, and responsive layout
* 🎨 Light/Dark Theme Toggle


---

## 🧱 Tech Stack

* **Angular** v16.2.12
* **Angular CLI** v16.0.2
* **Angular Material** v16.2.14
* **Flex Layout** v15.0.0-beta.42
* **TypeScript** v5.0.4
* **Node.js** v18.16.0 (⚠️ CLI requires ≥ v18.19)
* **RxJS** v7.8.1

---

## 📦 Module Overview
🧩 AdminModule
/components → Dashboard layout, sidebar

/dialog → ViewArticleComponent (used in dialogs)

/article → Handles all article operations

🧩 SharedModule
Shared services, pipes, directives

Reusable theme service

---


## 🔧 Setup Guide (for Mac users)

### 1. 📥 Clone the Repository

```bash
git clone https://github.com/hugs-4-bugs/articlehub-frontend.git
cd articlehub-frontend
```

---

### 2. 🧑‍💻 Set Up Node and Angular

* Ensure you have Node.js **v18.19+** (you currently have v18.16.0).
* You can install Node with:

```bash
brew install node@18
```

* If you're using `nvm`, run:

```bash
nvm install 18.19.0
nvm use 18.19.0
```

---

### 3. 📦 Install Dependencies

```bash
npm install
```

or if you're using `npx` for all commands:

```bash
npx npm install
```

---

### 4. 🌐 Run the Application

```bash
npx ng serve
```

Then visit `http://localhost:4200` in your browser.

---

### 💡 Important Commands

npx ng serve             # Run dev server
npx ng build             # Build app
npx ng generate component xyz
npx ng generate module xyz
npx ng generate service xyz



## 🗃️ Environment Configuration

If needed, create an `.env` file (optional) or configure environment details via `src/environments/environment.ts`.

Example:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

---

## 🧩 Modules Breakdown

### 📁 Article Module

* Displays list of articles in card format
* Search/filter via category, title
* Uses `mat-card`, `mat-form-field`, and custom `filter` logic

### 🧾 Dialog Module

* Displays full article content in a popup
* Supports rich HTML with `innerHTML` binding and custom pipe to sanitize HTML

### 🎨 Theme Service

* Handles toggling between themes (`primary`, `accent`, `warn`)
* Used in `mat-toolbar` and other colored components

---


## 🧩 Folder Structure Overview
```
ArticleHub Frontend
└── hugs-4-bugs-articlehub-frontend/
    ├── README.md
    ├── angular.json
    ├── package.json
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.spec.json
    ├── .editorconfig
    └── src/
        ├── index.html
        ├── main.ts
        ├── styles.scss
        ├── app/
        │   ├── app-routing.module.ts
        │   ├── app.component.html
        │   ├── app.component.scss
        │   ├── app.component.spec.ts
        │   ├── app.component.ts
        │   ├── app.module.ts
        │   ├── admin/
        │   │   ├── admin-routing.module.ts
        │   │   ├── admin.module.ts
        │   │   ├── dashboard/
        │   │   │   ├── dashboard.component.html
        │   │   │   ├── dashboard.component.scss
        │   │   │   ├── dashboard.component.spec.ts
        │   │   │   └── dashboard.component.ts
        │   │   ├── dialog/
        │   │   │   ├── article/
        │   │   │   │   ├── article.component.html
        │   │   │   │   ├── article.component.scss
        │   │   │   │   ├── article.component.spec.ts
        │   │   │   │   └── article.component.ts
        │   │   │   ├── category/
        │   │   │   │   ├── category.component.html
        │   │   │   │   ├── category.component.scss
        │   │   │   │   ├── category.component.spec.ts
        │   │   │   │   └── category.component.ts
        │   │   │   ├── confirmation/
        │   │   │   │   ├── confirmation.component.html
        │   │   │   │   ├── confirmation.component.scss
        │   │   │   │   ├── confirmation.component.spec.ts
        │   │   │   │   └── confirmation.component.ts
        │   │   │   ├── users/
        │   │   │   │   ├── users.component.html
        │   │   │   │   ├── users.component.scss
        │   │   │   │   ├── users.component.spec.ts
        │   │   │   │   └── users.component.ts
        │   │   │   └── view-article/
        │   │   │       ├── view-article.component.html
        │   │   │       ├── view-article.component.scss
        │   │   │       ├── view-article.component.spec.ts
        │   │   │       └── view-article.component.ts
        │   │   ├── help-details/
        │   │   │   ├── help-details.component.html
        │   │   │   ├── help-details.component.scss
        │   │   │   ├── help-details.component.spec.ts
        │   │   │   └── help-details.component.ts
        │   │   ├── layout/
        │   │   │   ├── layout.component.html
        │   │   │   ├── layout.component.scss
        │   │   │   ├── layout.component.spec.ts
        │   │   │   └── layout.component.ts
        │   │   ├── manage-article/
        │   │   │   ├── manage-article.component.html
        │   │   │   ├── manage-article.component.scss
        │   │   │   ├── manage-article.component.spec.ts
        │   │   │   └── manage-article.component.ts
        │   │   ├── manage-category/
        │   │   │   ├── manage-category.component.html
        │   │   │   ├── manage-category.component.scss
        │   │   │   ├── manage-category.component.spec.ts
        │   │   │   └── manage-category.component.ts
        │   │   └── manage-users/
        │   │       ├── manage-users.component.html
        │   │       ├── manage-users.component.scss
        │   │       ├── manage-users.component.spec.ts
        │   │       └── manage-users.component.ts
        │   ├── article-details/
        │   │   ├── article-details.component.html
        │   │   ├── article-details.component.scss
        │   │   ├── article-details.component.spec.ts
        │   │   └── article-details.component.ts
        │   ├── home/
        │   │   ├── home.component.html
        │   │   ├── home.component.scss
        │   │   ├── home.component.spec.ts
        │   │   └── home.component.ts
        │   ├── login/
        │   │   ├── login.component.html
        │   │   ├── login.component.scss
        │   │   ├── login.component.spec.ts
        │   │   └── login.component.ts
        │   ├── pipe/
        │   │   ├── sanitize-html.pipe.spec.ts
        │   │   └── sanitize-html.pipe.ts
        │   ├── services/
        │   │   ├── app-user.service.spec.ts
        │   │   ├── app-user.service.ts
        │   │   ├── article.service.spec.ts
        │   │   ├── article.service.ts
        │   │   ├── auth.interceptor.spec.ts
        │   │   ├── auth.interceptor.ts
        │   │   ├── category.service.spec.ts
        │   │   ├── category.service.ts
        │   │   ├── router-guard.service.spec.ts
        │   │   ├── router-guard.service.ts
        │   │   ├── snackbar.service.spec.ts
        │   │   ├── snackbar.service.ts
        │   │   ├── theme.service.spec.ts
        │   │   ├── theme.service.ts
        │   │   ├── token.interceptor.spec.ts
        │   │   └── token.interceptor.ts
        │   └── shared/
        │       ├── global-constants.ts
        │       ├── material-module.ts
        │       └── shared.module.ts
        ├── assets/
        │   └── .gitkeep
        └── environments/
            ├── environment.development.ts
            └── environment.ts

```
---



## 🧩 Paid & Unpaid Article Access Flow — Download & Payment Logic Design

``` 
User Visits Article Page
│
├── Is Article `contentType == UNPAID`?
│     │
│     └── YES
│         │
│         ├── Allow Full Access: View + Screenshot + Copy + Record
│         │
│         └── Show Download Options:
│               ├── [1] Download This Article (PDF/DOCX)
│               └── [2] Download All Articles from Same Category (PDF/DOCX)
│
└── NO → Article is PAID
      │
      ├── Show Tag: ⚠ PAID CONTENT
      ├── Show Info Icon (!)
      │     └── On Click: Show Description of 2 Payment Tiers
      │            ├── ₹10 - View Only (No screenshot, record, copy, download)
      │            └── ₹50 - Full Access (View + Download + Copy + Screenshot)
      │
      └── Ask User to Make Payment
            │
            ├── ₹10 Payment Done?
            │     └── YES → Allow View Only
            │               ├── Block Screenshot
            │               ├── Block Screen Record
            │               └── Block Copy
            │
            └── ₹50 Payment Done?
                  └── YES → Allow:
                            ├── View + Screenshot + Copy + Record
                            └── Show Download Option:
                                  └── [1] Download This Article Only (PDF/DOCX)
```

### 💰 Payment Options for Paid Articles:

| Tier | Price       | Access Rights                                                                               |
| ---- | ----------- | ------------------------------------------------------------------------------------------- |
| ₹10  | View-only   | ❌ Screenshot<br>❌ Screen Record<br>❌ Copy<br>❌ Download                                     |
| ₹50  | Full access | ✅ Screenshot<br>✅ Screen Record<br>✅ Copy<br>✅ Download (PDF/DOCX only for current article) |


 **⚠️ Only ₹50 users get download access for paid articles.**



### 📥 Download Feature Logic:

| User          | Content Type | Download Options                      |
| ------------- | ------------ | ------------------------------------- |
| Any           | UNPAID       | ✅ This article<br>✅ All from category |
| ₹50 Paid User | PAID         | ✅ This article only                   |
| ₹10 Paid User | PAID         | ❌ No download                         |


### ❓ Info Icon for Payment Tiers:

An icon (!) beside paid articles explains both payment tiers.

Tooltip/dialog shows:

    ₹10: Limited view
    ₹50: Full access + download


---

## 💡 Helpful Commands (with `npx` for old Angular CLI usage)

| Task                        | Command                           |
| --------------------------- | --------------------------------- |
| Install Angular CLI locally | `npm install @angular/cli@16.0.2` |
| Create a component          | `npx ng generate component xyz`   |
| Create a service            | `npx ng generate service xyz`     |
| Run project locally         | `npx ng serve`                    |
| Build the project           | `npx ng build`                    |
| Check Angular version       | `npx ng version`                  |

---

## 🛡️ Auth / Backend Integration (Already implemented on backend)

* This frontend assumes article data is served via REST API (Spring Boot).
* `DialogData` is injected via `MAT_DIALOG_DATA` for individual article views.
* Use `HttpClient` (if integrated) to connect to backend later.

```
Login → JWT Token stored → TokenInterceptor adds token to all secured routes automatically.

Protected routes like /addArticle require valid token.
```


---


## 🧾 Notes

This frontend is tightly coupled with the backend. Ensure backend is up before testing protected routes.

Always check BASE_URL in environment.ts before running.

All data fetching & mutation happen via REST APIs.

This project was designed to support low-resource environments, hence legacy Angular.

---

## Snapshots:

<img width="1440" alt="Screenshot 2025-06-06 at 5 31 28 PM" src="https://github.com/user-attachments/assets/80edba56-8865-48d7-99d0-2657396a5345" />

<img width="1440" alt="Screenshot 2025-06-06 at 5 31 44 PM" src="https://github.com/user-attachments/assets/32b15263-b189-4ffb-80e8-7635b899d690" />

<img width="1440" alt="Screenshot 2025-06-06 at 5 32 00 PM" src="https://github.com/user-attachments/assets/694c2234-66fa-447e-b581-324ce62b0561" />

<img width="1440" alt="Screenshot 2025-06-06 at 5 32 14 PM" src="https://github.com/user-attachments/assets/de45df78-6902-40b2-9e32-77748f945a82" />

<img width="1440" alt="Screenshot 2025-06-06 at 5 32 35 PM" src="https://github.com/user-attachments/assets/945991cf-0acf-47d4-94f3-c4bae345e47d" />

<img width="1440" alt="Screenshot 2025-06-06 at 5 33 48 PM" src="https://github.com/user-attachments/assets/a7a3b059-2546-4206-970f-1c94d5937042" />

<img width="1440" alt="Screenshot 2025-06-06 at 5 34 03 PM" src="https://github.com/user-attachments/assets/c0d2dfcb-8a72-40a6-b598-fea0a5e53d24" />

<img width="1440" alt="Screenshot 2025-06-06 at 5 34 26 PM" src="https://github.com/user-attachments/assets/39e25433-bded-4b03-9c71-cf5847790d6b" />

<img width="1440" alt="Screenshot 2025-06-06 at 5 35 02 PM" src="https://github.com/user-attachments/assets/a9d63d9d-5701-4693-b899-64faf950b336" />

<img width="1440" alt="Screenshot 2025-06-06 at 5 35 23 PM" src="https://github.com/user-attachments/assets/3390a8e6-d7fd-423e-9f6a-6b132eb06a16" />


---

## 👨‍💻 Developed By

#### 👨‍💻 Developer - **[Prabhat Kumar](https://prabhatkr.vercel.app/)**  
#### 🚀 Founder & CEO of - **[QuantumFusion Solutions](https://quantumfusion-solutions.vercel.app/)**


--- 
### 📎 Backend Repo
👉 https://github.com/Hugs-4-Bugs/ArticleHub-Application.git

(Developed in Spring Boot by Prabhat Kumar)

---
### 🏁 License
This project is open-source and free to use.
License: MIT
