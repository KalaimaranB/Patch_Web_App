# Patch Web Application

Patch Web Application is a modern, responsive dashboard designed for monitoring medical devices and tracking patient dosage records. It provides an intuitive interface for caregivers to track device statuses, view dosage history, and manage medical data in real-time.

**[📖 Documentation](https://kalaimaranb.github.io/Patch_Web_App/)** &nbsp;|&nbsp; **[🚀 Open App](https://patch-web-app.vercel.app/login)**

## Features

- **Caregiver Dashboard**: A comprehensive overview displaying the latest dosage activity, daily and weekly dose metrics, and active device status.
- **Device Management**: Monitor your connected medical devices, firmware versions, and connection states.
- **Dosage History**: Detailed logs of administered and attempted doses, displaying timestamps and success/failure statuses.
- **Secure Authentication**: User authentication and session management powered by Supabase.
- **Modern & Responsive UI**: Beautifully designed and highly responsive, built using Next.js, Tailwind CSS, Tremor, and Lucide React.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Tremor](https://www.tremor.so/) for metrics and cards, [Lucide React](https://lucide.dev/) for iconography
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL & Auth)

## Project Structure

```
PatchApplication/
├── patch-app/
│   ├── src/
│   │   ├── app/          # Next.js app router (pages and layouts for dashboard, login, etc.)
│   │   ├── components/   # Reusable UI, charts, and dashboard widgets
│   │   ├── lib/          # Helper functions and Supabase server/client configuration
│   │   └── types/        # TypeScript type definitions
│   ├── public/           # Static assets
│   └── package.json      # Dependencies and scripts
└── README.md             # Project documentation
```

## Getting Started

Follow these instructions to run the application locally:

### Prerequisites
- Node.js (v20 or higher recommended)
- A Supabase account and project

### Installation

1. Navigate to the application directory:
   ```bash
   cd patch-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   Ensure your `.env.local` file is populated with your Supabase credentials. It should look something like this:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

In the `patch-app` directory, you can run:
- `npm run dev` - Runs the app in development mode.
- `npm run build` - Builds the app for production.
- `npm start` - Starts the production server.
- `npm run lint` - Lints the codebase.
