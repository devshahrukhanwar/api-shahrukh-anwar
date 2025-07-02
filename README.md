# 🚀 Portfolio API – Express.js, Vercel, Neon Postgres, Swagger

[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel&logoColor=white)](https://api-shahrukhanwar.vercel.app)
[![Postgres](https://img.shields.io/badge/Database-Neon%20Postgres-008cff?logo=postgresql&logoColor=white)](https://neon.com/)
![File](https://img.shields.io/badge/Cache-File-ff4c4c?logo=file&logoColor=white)
[![Swagger Docs](https://img.shields.io/badge/API%20Docs-Swagger-85ea2d?logo=swagger&logoColor=black)](https://api-shahrukhanwar.vercel.app/docs)
[![License](https://img.shields.io/github/license/devshahrukhanwar/api-shahrukh-anwar)](LICENSE)

---

## 📝 Overview

A modern, production-ready Node.js/Express API portfolio, designed for ready-to-ship serverless deployment on Vercel.  
Features robust MVC architecture, hot reload, persistent caching, OpenAPI docs, analytics, notifications, and seamless integration with Neon Postgres and Upstash Redis.

> **Perfect for job applications, portfolio showcases, and scalable SaaS backends.**

---

## ✨ Features

- **Express.js** – Fast, minimalist API server
- **Vercel Ready** – Serverless, zero-config deployment
- **MVC Structure** – Clean separation of controllers, models, routes, services, utilities
- **Hot Reload** – Local dev with `nodemon` and `tsc --watch`
- **Caching** – File-based cache for serverless architecture
- **CORS** – Secure, environment-aware CORS for local, preview, and production
- **Database** – `Neon Postgres` (free tier, scalable)
- **Cron Jobs** – Automated temp file cleanup (Vercel + local)
- **OpenAPI/Swagger Docs** – Live, interactive API docs at `/docs`
- **Notifications** – Email (Brevo), Telegram, and more
- **API** – Telegram, Twitter, Medium, Dev.to, Brevo
- **Analytics & Logging** – Custom utilities for request/error logging and analytics
- **Professional Documentation** – All endpoints documented with OpenAPI

---

## 🗂️ Project Structure

```plaintext
.
├── src/
│   ├── config/           # Application wide configs
│   ├── controllers/      # Business logic (Notification, Puppeteer, Social, Utility)
|   ├── middleware/       # Middlewares to secure the routes
|   ├── migrations/       # SQL migrations for Neon Postgres
│   ├── models/           # Data models (Contact, etc.)
│   ├── routes/           # API route definitions
│   ├── services/         # External integrations (email, Telegram, etc.)
│   ├── utility/          # Cache, DB, Logging, Response, Template
│   ├── views/            # For views, email templates
│   ├── swagger.js        # Swagger/OpenAPI config
│   ├── index.js          # Express app entry point
├── .env.example          # Environment variable template
├── vercel.json           # Vercel deployment config
└── README.md
```

---

## 📚 API Documentation

- **Live Swagger UI:** [https://api-shahrukhanwar.vercel.app/docs](https://api-shahrukhanwar.vercel.app/docs)
- **OpenAPI Spec:** All endpoints are fully documented with request/response schemas, tags, and examples.

---

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/devshahrukhanwar/api-shahrukh-anwar.git
cd api-shahrukh-anwar
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

- Copy `.env.example` to `.env` and fill in your secrets.
- Set up Neon Postgres (DB), Brevo (Email), Telegram API (Notifications), Twitter API, Dev.to
- Add your API keys for Twitter, Brevo, Telegram, etc.

### 4. Run Locally

```bash
npm run dev:all
# or
npm run dev
```

- Visit [http://localhost:3000/docs](http://localhost:3000/docs) for API docs.

### 5. Deploy to Vercel (Optional)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/devshahrukhanwar/api-shahrukh-anwar)

---

## 🔒 Environment Variables

See `.env.example` for all required variables:

| Key     | Description                       |
| ------- | --------------------------------- |
| APP_ENV | Environment (local/production)    |
| APP_URL | Main app URL                      |
| API_URL | API base URL                      |
| ...     | (see `.env.example` for all keys) |

---

## 📦 Integrations

- **Database:** [Neon Postgres](https://neon.com)
- **Cache:** [Upstash Redis](https://upstash.com)
- **Email:** [Brevo](https://www.brevo.com/)
- **Social:** Twitter, Dev.to, Medium
- **Notifications:** Telegram, Email

---

## 🧑‍💻 Author & Social

**Shahrukh Anwar**  
[![Portfolio](https://img.shields.io/badge/Portfolio-shahrukhanwar.vercel.app-000?logo=vercel)](https://shahrukhanwar.vercel.app)  
[![Twitter](https://img.shields.io/badge/Twitter-@devshahrukh-1da1f2?logo=twitter&logoColor=white)](https://twitter.com/devshahrukh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Shahrukh%20Anwar-0077b5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/devshahrukh)
[![GitHub](https://img.shields.io/badge/GitHub-devshahrukhanwar-333?logo=github)](https://github.com/devshahrukhanwar)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request.

---

## 📝 License

This project is [MIT](LICENSE) licensed.
