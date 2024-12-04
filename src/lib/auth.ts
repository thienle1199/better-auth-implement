import { db } from "@/db/drizzle";
import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/send-email";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),

    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: true,
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
