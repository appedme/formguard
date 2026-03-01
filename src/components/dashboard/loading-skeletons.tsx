import { Skeleton } from "@/components/ui/skeleton";

export function IntegrationsLoadingSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="border border-border/40 rounded-2xl overflow-hidden"
        >
          {/* Card Header */}
          <div className="p-6 border-b border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          {/* Card Body */}
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="p-4 rounded-xl border border-border/40 space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-64" />
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SettingsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="border border-border/40 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-border/40 space-y-1">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-56" />
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-3 w-72" />
            </div>
            {i === 3 && (
              <div className="flex items-center justify-between p-4 border border-border/40 rounded-lg">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  );
}

export function SubmissionsLoadingSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32 rounded-xl" />
      </div>
      <div className="border border-border/40 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border/40 grid grid-cols-4 gap-4">
          {["Date", "Email", "Message", "Status"].map((h) => (
            <Skeleton key={h} className="h-3 w-16" />
          ))}
        </div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 border-b border-border/20 last:border-0 grid grid-cols-4 gap-4 items-center">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-border/40 rounded-2xl p-6">
            <Skeleton className="h-3 w-20 mb-3" />
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>
      <div className="border border-border/40 rounded-2xl p-6">
        <Skeleton className="h-4 w-36 mb-6" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function GenericPageLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-border/40 rounded-2xl p-6 space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-10 w-32 rounded-xl mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
