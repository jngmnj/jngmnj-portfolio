export default function ProjectsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-t-2xl">
            {/* Image skeleton */}
            <div className="h-48 w-full bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />

            {/* Category Badge skeleton - absolute positioned */}
            <div className="absolute top-4 left-4">
              <div className="h-7 w-20 rounded-full bg-white/90" />
            </div>
          </div>

          {/* Project Content */}
          <div className="p-6">
            {/* Title skeleton */}
            <div className="mb-2">
              <div className="h-7 w-3/4 rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
            </div>

            {/* Description skeleton */}
            <div className="mb-4 space-y-2">
              <div className="h-4 w-full rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
              <div className="h-4 w-11/12 rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
              <div className="h-4 w-4/5 rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
            </div>

            {/* Technologies skeleton */}
            <div className="mb-4 flex flex-wrap gap-2">
              <div className="h-6 w-16 rounded-full bg-gray-200" />
              <div className="h-6 w-20 rounded-full bg-gray-200" />
              <div className="h-6 w-24 rounded-full bg-gray-200" />
              <div className="h-6 w-20 rounded-full bg-gray-200" />
            </div>

            {/* Action Buttons skeleton */}
            <div className="flex items-center justify-end gap-2">
              {/* Demo button skeleton */}
              <div className="h-9 w-24 rounded-full bg-gray-200" />
              {/* GitHub button skeleton */}
              <div className="h-9 w-9 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

