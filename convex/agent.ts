import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateAgent = mutation({
  args: {
    name: v.string(),
    agentId: v.string(),
    userId: v.id("userTable"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("AgentTable", {
      name: args.name,
      agentId: args.agentId,
      published: false,
      userId: args.userId,
    });
    return result;
  },
});

export const GetUserAgents = query({
  args: {
    userId: v.id("userTable"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("AgentTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();
    return result;
  },
});
