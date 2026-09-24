import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const reviewSchema = z.object({
  reviewerName: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
  location: z.string().trim().min(2, "Enter your location").max(100, "Location is too long"),
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().min(3, "Add a short title").max(100, "Title is too long"),
  body: z.string().trim().min(10, "Review must be at least 10 characters").max(1000, "Review is too long"),
});

function createPublicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Review service is not configured");

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const submitCustomerReview = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => reviewSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = createPublicClient();
    const { error } = await supabase.from("customer_reviews").insert({
      reviewer_name: data.reviewerName,
      location: data.location,
      rating: data.rating,
      title: data.title,
      body: data.body,
      approved: false,
    });
    if (error) throw new Error("Your review could not be submitted. Please try again.");
    return { success: true };
  });

export const getApprovedCustomerReviews = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("customer_reviews")
    .select("id, reviewer_name, location, rating, title, body")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) return [];
  return data;
});