# 🚀 Convex with Next Auth

Welcome to **Convex with Next Auth**, a modern, real-time starter template for building full-stack applications. This project provides a robust foundation by integrating the real-time backend of Convex with the comprehensive authentication features of NextAuth.js.

## ✨ Features

-   **Real-time Database**: Powered by Convex for seamless, real-time data synchronization across clients.
-   **Full-stack Authentication**: Secure and flexible authentication using NextAuth.js, supporting both credentials (email/password) and OAuth providers (Google, GitHub).
-   **Two-Factor Authentication (2FA)**: Enhanced security for user accounts.
-   **Email Verification & Password Reset**: Complete email-based workflows for user management.
-   **Modern UI**: Beautiful and responsive components from Shadcn/UI, styled with Tailwind CSS.
-   **Type-Safe**: End-to-end type safety with TypeScript.
-   **High-Performance Toolkit**: Utilizes Bun for lightning-fast dependency management and script execution.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Database**: [Convex](https://convex.dev/)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
-   **UI**: [Shadcn/UI](https://ui.shadcn.com/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Runtime/Package Manager**: [Bun](httpss://bun.sh/)
-   **Schema Validation**: [Zod](https://zod.dev/)

## 🏁 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

-   [Bun](httpss://bun.sh/docs/installation) installed on your machine.
-   A [Convex](https://convex.dev/) account.
-   OAuth credentials from [Google](https://console.cloud.google.com/) and [GitHub](https://github.com/settings/developers).

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/convex-with-next-auth.git
cd convex-with-next-auth
```

### 2. Install Dependencies

Use Bun to install all the necessary packages.

```bash
bun install
```

### 3. Set Up Convex

Link your local project to your Convex backend. The CLI will guide you through logging in and creating a new project.

```bash
bun convex dev
```

This command will create a `.env.local` file with your `NEXT_PUBLIC_CONVEX_URL`. Keep this command running in a separate terminal to get real-time updates.

### 4. Push the Database Schema

In another terminal, push your backend schema and functions to Convex.

```bash
bun convex push
```

### 5. Configure Environment Variables

Your `.env.local` file needs a few more secrets for authentication to work.

```env
# .env.local

# Convex URL (already added by `bun convex dev`)
NEXT_PUBLIC_CONVEX_URL="https://your-project.convex.cloud"

# NextAuth.js
AUTH_SECRET="your-super-secret-auth-secret" # Generate one: `openssl rand -base64 32`
AUTH_URL="http://localhost:3000"

# OAuth Providers
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# Email (e.g., using Resend)
RESEND_API_KEY="your-resend-api-key"
```

### 6. Run the Development Server

You're all set! Start the Next.js development server.

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the