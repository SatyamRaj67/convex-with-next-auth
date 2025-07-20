import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Resend from "@auth/core/providers/resend";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google({
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          role: "USER" as const,
        };
      },
    }),
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(),
          email: profile.email,
          name: profile.name || profile.login,
          image: profile.avatar_url,
          role: "USER" as const,
        };
      },
    }),
    Password,
    Resend,
  ],
  callbacks: {
    async createOrUpdateUser(ctx, { existingUserId, ...args }) {
      if (existingUserId) {
        await ctx.db.patch(existingUserId, {
          name: args.profile.name,
          image: args.profile.image,
        });
        return existingUserId;
      } else {
        const newUser = await ctx.db.insert("users", {
          name: args.profile.name!,
          email: args.profile.email!,
          image: args.profile.image,
          role: args.profile.role || "USER",
          emailVerificationTime:
            args.provider.type === "email" ? undefined : Date.now(),
        });
        return newUser;
      }
    },
  },
});
