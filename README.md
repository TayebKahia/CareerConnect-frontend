# CareerConnect Frontend 🚀

**Modern UI for the CareerConnect Career Guidance Platform**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 📖 Overview

The CareerConnect Frontend provides an intuitive and responsive user interface for our AI-powered career guidance platform. It offers seamless access to job matching tools through an elegant, user-friendly experience.

---

## 🎯 Key Features

### 👤 Job Seeker Features

- **Job Matching Portal**
  - Personalized job recommendations
  - Skills-based matching visualization
  - Save and track application progress


### 👔 HR Portal Features

- **Resume Screening Dashboard**
  - AI-powered candidate evaluation
  - Skills-job matching scores
  - Automated shortlisting based on requirements


### 🖥️ Technical Highlights

- Responsive design for all devices
- Accessibility-focused UI components
- Optimized data visualization for skills and job matches
- Clean, modern UI with customizable themes

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## 📂 Project Structure

```
├── components/               # Reusable UI components
│   ├── Animations/           # Animation components
│   ├── ScrollFloat/          # Scroll effects 
│   ├── TextPressure/         # Text animation components
│   └── ...                   # Various UI components (NavBar, Footer, etc.)
├── context/                  # React context definitions
├── hooks/                    # Custom React hooks
├── public/                   # Static assets
├── src/                      # Source code
│   ├── app/                  # Next.js app router pages
│   │   ├── careermatcher/    # Career matching functionality
│   │   ├── cv_comparison/    # CV comparison feature
│   │   ├── cv-details/       # CV details pages
│   │   └── cv-ranking/       # CV ranking pages
│   ├── blocks/               # UI building blocks
│   └── lib/                  # Utility functions
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies
└── tsconfig.json             # TypeScript configuration
```

---

## 📝 Development Guidelines

- Follow the component-based architecture
- Write meaningful tests for all components
- Use TypeScript for type safety

---

## 🔄 Workflow

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Write tests
5. Submit a pull request

---

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.