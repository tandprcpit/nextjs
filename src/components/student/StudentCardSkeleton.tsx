// StudentCardSkeleton.tsx
import { Card } from "@/components/ui/card";

export default function StudentCardSkeleton() {
  return (
    <Card className="w-64 bg-white shadow-lg mt-20 rounded-lg relative">
      <div className="h-24 bg-gray-100" /> 
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[120px] h-[120px] rounded-lg bg-gray-200 animate-pulse" />
      </div>
      <div className="pt-4 pb-4 px-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mt-2 mb-1 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto mb-3 animate-pulse" /> 
        <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto mb-2 animate-pulse" /> 
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2 animate-pulse" />
        <div className="flex space-x-4 mb-4 justify-center">
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" /> {/* Changed to a lighter gray */}
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" /> {/* Changed to a lighter gray */}
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" /> {/* Changed to a lighter gray */}
        </div>
        <div className="w-full h-10 bg-gray-200 rounded animate-pulse" /> {/* Changed to a lighter gray */}
      </div>
    </Card>
  );
}
