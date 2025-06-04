# 📰 ArticleHub Frontend

**ArticleHub** is a premium blog-based Angular frontend designed for viewing, filtering, and managing published articles. This project is built using Angular 16 with Angular Material and Flex Layout for responsive UI.

A sleek, theme-switchable article management system built using Angular v16, Angular Material, and Flex Layout. This is the frontend of the complete ArticleHub project.

💡 This works with the backend repo:
👉 ArticleHub-Backend: https://github.com/Hugs-4-Bugs/ArticleHub-Application

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
