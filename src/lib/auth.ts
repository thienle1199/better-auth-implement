import { db } from "@/db/drizzle";
import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/send-email";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    plugins: [nextCookies()],
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    socialProviders: {
      google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }
    },
    trustedOrigins: [`${process.env.BETTER_AUTH_URL}/signup`, `${process.env.BETTER_AUTH_URL}/signin`, `${process.env.BETTER_AUTH_URL}`],
    
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: true,
      sendResetPassword: async ({user, url}) => {
        await sendEmail({
          sendTo: user.email,
          subject: "Reset your password",
          text: `Click the link to reset your password: ${url}`,
        });
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url }) => {
          await sendEmail({
              sendTo: user.email,
              subject: 'Verify your email address',
              text: `Click the link to verify your email: ${url}`
          })
      },
    },
});
