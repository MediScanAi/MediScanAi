# 🧠 MediScanAI

**MediScanAI** is a modern, full-stack medical data platform built with **React** , **TypeScript** , **Vite** , **Redux Toolkit** , **Ant Design** , and **Firebase** . It empowers users to track, analyze, and interact with their personal health data — including **blood** , **urine** , **genetic** , and **vitamin** test results — all within a responsive, multilingual, and AI-enhanced interface.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [📸 Screenshots](#-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [🌍 Internationalization (i18n)](#-internationalization-i18n)
- [🎨 Styling](#-styling)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## ✨ Features

- 🔐 **User Authentication** – Secure login, signup, and password reset via Firebase Authentication.
- 📊 **Health Dashboard** – Track metrics like weight, BMI, and blood pressure in a sleek dashboard.
- 🧪 **Test Analysis** – Upload, view, and edit results for:
  - Blood tests
  - Urine tests
  - Vitamin panels
  - Genetic reports
- 🤖 **AI Chatbot** – AI assistant (powered by OpenAI) to analyze test results, import pdf and explain findings.
- 🌐 **Multilingual Support** – Seamless switching between English, Russian, and Armenian via `i18next`.
- 📱 **Responsive UI** – Fully adaptive to mobile, tablet, and desktop devices.
- 📤 **Data Import** – Easily import health data for analyzing or monitoring.
- 🌙 **Dark Mode** – Switch between light and dark themes on the fly.
- ♿ **Accessibility** – Keyboard navigation, screen-reader, voice syntesis and friendly UI.

---

## 📸 Screenshots

> _(Add your screenshots here: dashboard, AI chat, test history, mobile view, etc.)_

---

## 🛠️ Tech Stack

| Layer        | Technology                                                  |
| ------------ | ----------------------------------------------------------- |
| **Frontend** | React, TypeScript, Vite, Redux Toolkit, Ant Design          |
| **Backend**  | Firebase (Auth, Firestore), Cloud Functions with express.js |
| **AI**       | OpenAI API (chat & insights)                                |
| **i18n**     | i18next + JSON translation files                            |
| **Styling**  | CSS Modules, Ant Design, custom styles                      |
| **Testing**  | Jest, React Testing Library                                 |

---

## 🏗️ Project Structure

```
/src
  /api               # Firebase config, OpenAI API
  /app               # Store, hooks, Redux slices
  /components        # Reusable components (forms, UI)
  /pages             # Page-level views (Dashboard, Home, etc.)
  /types             # TypeScript interfaces
  /assets            # Images, icons
  /styles            # Global styles & variables
  /i18n              # Language switcher and setup
public
  /locales           # en/, ru/, hy/ translation files
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js **v18+**
- `yarn` or `npm`

### 📥 Installation

```bash
git clone https://github.com/yourusername/MediScanAI.git
cd MediScanAI
yarn install  # or npm install
```

### 🔑 Set Up Environment

Copy the example:

```bash
cp .env.example .env
```

Then fill in the required fields:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_OPENAI_API_KEY=
```

### ▶️ Run the app

```bash
yarn dev  # or npm run dev
```

Open [http://localhost:5173](http://localhost:5173/) in your browser.

---

## 🌍 Internationalization (i18n)

- Located in: `public/locales/{en, ru, hy}/translation.json`
- Add a language:
  - Create a new folder under `/locales`
  - Add `translation.json` with key-value pairs
- Supported Languages:
  - 🇺🇸 English (`en`)
  - 🇷🇺 Russian (`ru`)
  - 🇦🇲 Armenian (`hy`)

---

## 🎨 Styling

- Primary UI: [Ant Design](https://ant.design/)
- Theming: Custom styles + CSS Modules
- Theme switching: Light / Dark mode supported via state toggle
- Mobile-first: Responsive across all screen sizes

---

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create your branch: `git checkout -b feature/MyFeature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/MyFeature`
5. Open a pull request

---

## 📄 License

This project is licensed under the Custom License.

---

## 📬 Contact

Have questions or suggestions?

📧 Contact: `your-email@example.com`

📌 GitHub Issues: [Submit Here](https://github.com/MediScanAi/MediScanAi/issues)

---

> _MediScanAI – Empowering you to understand and manage your health, every day._
