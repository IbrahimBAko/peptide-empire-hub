import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Star } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitCustomerReview } from "@/lib/reviews.functions";

type FormValues = {
  reviewerName: string;
  location: string;
  rating: number;
  title: string;
  body: string;
};

const initialValues: FormValues = {
  reviewerName: "",
  location: "",
  rating: 5,
  title: "",
  body: "",
};

export function ReviewForm() {
  const submitReview = useServerFn(submitCustomerReview);
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await submitReview({ data: values });
      setSubmitted(true);
      setValues(initialValues);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Your review could not be submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto mt-14 max-w-2xl rounded-lg border border-gold/30 bg-card/50 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto text-gold" size={34} />
        <h3 className="mt-4 font-display text-2xl">Thank you for your review.</h3>
        <p className="mt-2 text-sm text-muted-foreground">It has been received and will appear after approval.</p>
        <Button type="button" variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Leave another review
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-14 max-w-2xl border-t border-border/70 pt-12">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Share your experience</p>
        <h3 className="mt-2 font-display text-3xl">Leave a review</h3>
      </div>
      <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="review-name">Name</Label>
            <Input id="review-name" required minLength={2} maxLength={80} autoComplete="name" value={values.reviewerName} onChange={(event) => setValues((current) => ({ ...current, reviewerName: event.target.value }))} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="review-location">Location</Label>
            <Input id="review-location" required minLength={2} maxLength={100} autoComplete="address-level2" placeholder="City, Country" value={values.location} onChange={(event) => setValues((current) => ({ ...current, location: event.target.value }))} />
          </div>
        </div>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">Rating</legend>
          <div className="flex items-center gap-1" aria-label={`${values.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, index) => {
              const rating = index + 1;
              return (
                <Button key={rating} type="button" variant="ghost" size="icon" aria-label={`${rating} star${rating === 1 ? "" : "s"}`} aria-pressed={values.rating === rating} onClick={() => setValues((current) => ({ ...current, rating }))}>
                  <Star className={rating <= values.rating ? "fill-gold text-gold" : "text-muted-foreground/50"} />
                </Button>
              );
            })}
          </div>
        </fieldset>
        <div className="grid gap-2">
          <Label htmlFor="review-title">Review title</Label>
          <Input id="review-title" required minLength={3} maxLength={100} value={values.title} onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="review-body">Your review</Label>
          <Textarea id="review-body" required minLength={10} maxLength={1000} rows={5} value={values.body} onChange={(event) => setValues((current) => ({ ...current, body: event.target.value }))} />
          <span className="text-right text-xs text-muted-foreground">{values.body.length}/1000</span>
        </div>
        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">Reviews are checked before they are published.</p>
          <Button type="submit" disabled={submitting} className="min-w-36 bg-gradient-to-r from-gold to-gold-bright text-primary-foreground">
            {submitting ? <><Loader2 className="animate-spin" /> Submitting</> : "Submit review"}
          </Button>
        </div>
      </form>
    </div>
  );
}