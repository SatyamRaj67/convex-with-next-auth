import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createPasswordResetToken = mutation({
  args: {
    email: v.string(),
    token: v.string(),
    expires: v.number(), // timestamp
  },
  handler: async (ctx, { email, token, expires }) => {
    try {
      const tokenId = await ctx.db.insert("passwordResetTokens", {
        email,
        token,
        expires,
      });
      const passwordResetToken = await ctx.db.get(tokenId);
      return passwordResetToken;
    } catch {
      return null;
    }
  },
});

export const getPasswordResetTokenByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    try {
      const passwordResetToken = await ctx.db
        .query("passwordResetTokens")
        .filter((q) => q.eq(q.field("email"), email))
        .first();
      return passwordResetToken;
    } catch {
      return null;
    }
  },
});

export const getPasswordResetTokenByToken = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    try {
      const passwordResetToken = await ctx.db
        .query("passwordResetTokens")
        .filter((q) => q.eq(q.field("token"), token))
        .unique();
      return passwordResetToken;
    } catch {
      return null;
    }
  },
});

export const deletePasswordResetTokenById = mutation({
  args: { id: v.id("passwordResetTokens") },
  handler: async (ctx, { id }) => {
    try {
      const passwordResetToken = await ctx.db.get(id);
      await ctx.db.delete(id);
      return passwordResetToken;
    } catch {
      return null;
    }
  },
});
