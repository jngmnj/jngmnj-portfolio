export default function ProjectsSkeleton() {
  return (
    <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-3xl border border-gray-200 bg-white"
        >
          {/* Project Image */}
          <div className="m-2 aspect-video rounded-2xl bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />

          {/* Project Content */}
          <div className="px-4 pt-2 pb-4 sm:px-5 sm:pb-5">
            {/* Category skeleton */}
            <div className="mb-2 h-3 w-24 rounded bg-gray-100" />

            {/* Title skeleton */}
            <div className="mb-2 h-6 w-4/5 rounded-lg bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />

            {/* Description skeleton */}
            <div className="mb-3 space-y-2">
              <div className="h-3.5 w-full rounded bg-gray-100" />
              <div className="h-3.5 w-3/4 rounded bg-gray-100" />
            </div>

            {/* Technologies skeleton */}
            <div className="mb-4 flex flex-wrap gap-1.5">
              <div className="h-6 w-16 rounded-lg bg-gray-50" />
              <div className="h-6 w-20 rounded-lg bg-gray-50" />
              <div className="h-6 w-14 rounded-lg bg-gray-50" />
            </div>

            {/* Action Buttons skeleton */}
            <div className="flex justify-end pt-1">
              <div className="flex items-center gap-1.5 rounded-2xl bg-gray-50 px-2 py-1">
                <div className="size-8 rounded-xl bg-white" />
                <div className="size-8 rounded-xl bg-white" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
