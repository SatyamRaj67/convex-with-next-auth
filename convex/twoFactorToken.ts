import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTwoFactorTokenByToken = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    try {
      const twoFactorToken = await ctx.db
        .query("twoFactorTokens")
        .filter((q) => q.eq(q.field("token"), token))
        .unique();
      return twoFactorToken;
    } catch {
      return null;
    }
  },
});

export const getTwoFactorTokenByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    try {
      const twoFactorToken = await ctx.db
        .query("twoFactorTokens")
        .filter((q) => q.eq(q.field("email"), email))
        .first();
      return twoFactorToken;
    } catch {
      return null;
    }
  },
});

export const createTwoFactorToken = mutation({
  args: {
    email: v.string(),
    token: v.string(),
    expires: v.number(), // timestamp
  },
  handler: async (ctx, { email, token, expires }) => {
    try {
      const tokenId = await ctx.db.insert("twoFactorTokens", {
        email,
        token,
        expires,
      });
      const twoFactorToken = await ctx.db.get(tokenId);
      return twoFactorToken;
    } catch {
      return null;
    }
  },
});

export const deleteTwoFactorTokenById = mutation({
  args: { id: v.id("twoFactorTokens") },
  handler: async (ctx, { id }) => {
    try {
      const twoFactorToken = await ctx.db.get(id);
      await ctx.db.delete(id);
      return twoFactorToken;
    } catch {
      return null;
    }
  },
});
