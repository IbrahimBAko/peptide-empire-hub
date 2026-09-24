# Reviewer photos and client review submissions

## What will change
- Replace the six current reviewer portraits with the six uploaded photos, matched in upload order to the six existing reviews.
- Add a compact “Leave a review” form directly beneath the existing reviews.
- Collect the client’s name, location, rating, review title, and review text.
- Show a clear confirmation after submission and state that the review will appear after approval.

## Approval and safety
- Store new reviews as pending in Lovable Cloud.
- Do not display pending submissions publicly.
- Validate every field in the browser and again before saving, with strict length limits.
- Keep the existing six reviews, styling, navigation, ordering links, SEO, and all unrelated site behavior unchanged.

## Technical details
- Upload the six supplied photos to the project’s media service and reference those files from the existing review records.
- Add a public review-submission function and a locked-down reviews table that permits anonymous submissions but no anonymous reads or edits.
- Load only approved reviews for public display, while retaining the current curated reviews.
- Verify submission behavior, confirmation messaging, image rendering, and mobile/desktop layout.
