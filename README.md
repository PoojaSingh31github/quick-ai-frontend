---

## ✅ `quick-ai-client/README.md`

# ⚡ Quick AI - Frontend

This is the frontend of **Quick AI**, a multi-tool generative AI web app. It enables users to generate articles, remove image backgrounds, analyze resumes, and more — all with a clean and modern UI.

---

## ✨ Features

- 🧠 Article, blog, and resume generation using AI
- 📷 Background removal via AI
- 🔒 Clerk authentication
- ❤️ Like/dislike & public creations
- 📄 Markdown rendering
- ☁️ Connected to Cloudinary for image hosting

---

## 🛠️ Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **Clerk for Auth**
- **Axios for API calls**
- **Lucide Icons**
- **React Router v7**
- **React Markdown**
- **React Hot Toast**

---

## 🧩 Folder Structure
```
quick-ai-client/
│
├── public/                        # Static assets
│
├── src/
│   ├── assets/                    # Images, SVGs, etc.
│
│   ├── components/                # Reusable UI Components
│   │   ├── AITools.jsx
│   │   ├── CreationItem.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Plan.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Testimonial.jsx
│   │   └── Tag.jsx
│
│   ├── pages/                     # Main page views
│   │   ├── BlogTitles.jsx
│   │   ├── Community.jsx
│   │   ├── Dashboard.jsx
│   │   ├── GenerateImages.jsx
│   │   ├── Home.jsx
│   │   ├── Layout.jsx
│   │   ├── RemoveBackground.jsx
│   │   ├── RemoveObject.jsx
│   │   ├── ReviewResume.jsx
│   │   └── WriteArticle.jsx
│
│   ├── App.jsx                    # Root component
│   ├── index.css                  # Global styles
│   └── main.jsx                   # App entry point
│
├── .env                           # Environment variables
├── .gitignore
├── README.md                      # This file!
├── index.html
├── eslint.config.js
├── tailwind.config.js
├── vite.config.js
├── package.json
└── package-lock.json


```

---

## 🧪 Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev


