"use server";

import { api } from "@/convex/_generated/api";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

import { ConvexHttpClient } from "convex/browser";
import { env } from "@/env";

// Initialize a server-side client to interact with Convex
const convex = new ConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL);

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await convex.query(api.user.getUser);

  if (!user) {
    return { error: "Unauthorized" };
  }

  // if (user.isOAuth) {
  //   values.email = undefined;
  //   values.password = undefined;
  //   values.newPassword = undefined;
  // }

  // if (values.email && values.email !== user.email) {
  //   const existingUser = await convex.query(api.user.getUserByEmail, {
  //     email: values.email,
  //   });

  //   if (existingUser && existingUser._id !== user.id) {
  //     return { error: "Email already in use!" };
  //   }

  //   const verificationToken = await generateVerificationToken(values.email);
  //   await sendVerificationEmail(
  //     verificationToken.email,
  //     verificationToken.token,
  //   );

  //   return { success: "Verification Email Sent!" };
  // }

  // if (values.password && values.newPassword && dbUser.password) {
  //   const passwordsMatch = await bcrypt.compare(
  //     values.password,
  //     dbUser.password,
  //   );

  //   if (!passwordsMatch) {
  //     return { error: "Invalid Password!" };
  //   }

  //   const hashedPassword = await bcrypt.hash(values.newPassword, 10);

  //   values.password = hashedPassword;
  //   values.newPassword = undefined;
  // }

  // await convex.mutation(api.user.updateUserById, {
  //   id: user.id,
  //   data: {
  //     ...values,
  //   },
  // });

  return { success: "Settings Updated!" };
};
