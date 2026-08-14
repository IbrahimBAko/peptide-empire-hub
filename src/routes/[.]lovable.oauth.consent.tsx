import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type OAuthResult = {
  client?: { name?: string; redirect_uri?: string } | null;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({
        to: "/login",
        search: { next: location.pathname + location.searchStr },
      });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  errorComponent: ({ error }) => (
    <main className="mx-auto max-w-md px-6 py-24">
      <h1 className="font-display text-2xl">Authorization unavailable</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {String((error as Error)?.message ?? error)}
      </p>
    </main>
  ),
  component: Consent,
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "this application";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl tracking-tight">
        Connect {clientName} to Peptide Empire
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {clientName} will be able to call this site&rsquo;s catalog tools while you are signed in.
        This does not bypass the site&rsquo;s permissions or backend policies.
      </p>
      {details?.client?.redirect_uri && (
        <p className="mt-2 break-all text-xs text-muted-foreground">
          Redirect: {details.client.redirect_uri}
        </p>
      )}
      {details?.scope && (
        <p className="mt-2 text-xs text-muted-foreground">Requested: {details.scope}</p>
      )}
      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="mt-8 flex gap-3">
        <Button disabled={busy} onClick={() => decide(true)}>
          Approve
        </Button>
        <Button variant="outline" disabled={busy} onClick={() => decide(false)}>
          Cancel connection
        </Button>
      </div>
    </main>
  );
}
