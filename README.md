# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Deploy with Vercel + Supabase

1. **Create Supabase Project**
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Copy `DATABASE_URL` and `DIRECT_URL` from Settings > Database

2. **Deploy to Vercel**
   - Push your code to GitHub
   - Connect your GitHub repository to Vercel
   - Add the following environment variables in Vercel:
     - `AUTH_SECRET` - Generate with `npx auth secret`
     - `AUTH_URL` - Your Vercel deployment URL
     - `AUTH_DISCORD_ID` & `AUTH_DISCORD_SECRET`
     - `AUTH_GOOGLE_ID` & `AUTH_GOOGLE_SECRET`
     - `DATABASE_URL` & `DIRECT_URL` (from Supabase)

3. **Configure OAuth Providers**
   - **Google**: Add your Vercel URL to authorized redirect URIs
   - **Discord**: Add your Vercel URL to redirect URIs

4. **Deploy**
   - Vercel will automatically run `prisma generate && prisma db push && next build`
   - Your database schema will be automatically applied to Supabase
