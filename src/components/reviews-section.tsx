import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Star, BadgeCheck, Quote } from "lucide-react";
import { reviews, REVIEW_AVERAGE, REVIEW_COUNT } from "@/lib/reviews";
import { getApprovedCustomerReviews } from "@/lib/reviews.functions";
import { ReviewForm } from "@/components/review-form";

type ApprovedReview = Awaited<ReturnType<typeof getApprovedCustomerReviews>>[number];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < rating ? "text-gold fill-gold" : "text-muted-foreground/40"} />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const fetchApprovedReviews = useServerFn(getApprovedCustomerReviews);
  const [approvedReviews, setApprovedReviews] = useState<ApprovedReview[]>([]);

  useEffect(() => {
    let active = true;
    fetchApprovedReviews()
      .then((result) => {
        if (active) setApprovedReviews(result);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [fetchApprovedReviews]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20" aria-labelledby="reviews-heading">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Client Reviews</p>
        <h2 id="reviews-heading" className="mt-2 font-display text-4xl md:text-5xl">Rated five stars by researchers.</h2>
        <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-card/50 px-5 py-2 backdrop-blur">
          <Stars rating={5} size={16} />
          <span className="font-display text-lg text-gradient-gold">{REVIEW_AVERAGE.toFixed(1)}</span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {REVIEW_COUNT} verified reviews
          </span>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            style={{ animationDelay: `${i * 80}ms` }}
            className="rounded-2xl border border-border bg-[var(--gradient-card)] p-6 hover:border-gold/50 hover:-translate-y-1 transition-all duration-500 animate-fade-up"
          >
            <div className="flex items-center justify-between">
              <Stars rating={r.rating} />
              <Quote className="text-gold/50" size={18} />
            </div>
            <figcaption className="mt-4 font-display text-xl leading-snug">{r.title}</figcaption>
            <blockquote className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.body}</blockquote>
            <div className="mt-5 pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={`${r.name}, ${r.role}`}
                  width={512}
                  height={512}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-gold/40"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-gold">
                    {r.name}
                    {r.verified && <BadgeCheck size={14} aria-label="Verified buyer" />}
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-0.5">
                    {r.role} · {r.location}
                  </div>
                </div>
              </div>
            </div>
          </figure>
        ))}
        {approvedReviews.map((review, index) => (
          <figure
            key={review.id}
            style={{ animationDelay: `${(reviews.length + index) * 80}ms` }}
            className="rounded-2xl border border-border bg-[var(--gradient-card)] p-6 hover:border-gold/50 hover:-translate-y-1 transition-all duration-500 animate-fade-up"
          >
            <div className="flex items-center justify-between">
              <Stars rating={review.rating} />
              <Quote className="text-gold/50" size={18} />
            </div>
            <figcaption className="mt-4 font-display text-xl leading-snug">{review.title}</figcaption>
            <blockquote className="mt-2 text-sm text-muted-foreground leading-relaxed">{review.body}</blockquote>
            <div className="mt-5 border-t border-border pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 font-display text-lg text-gold ring-1 ring-gold/40" aria-hidden="true">
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gold">{review.reviewer_name}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-widest text-muted-foreground">{review.location}</div>
                </div>
              </div>
            </div>
          </figure>
        ))}
      </div>
      <ReviewForm />
    </section>
  );
}
