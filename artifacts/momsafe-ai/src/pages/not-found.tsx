import { PageTransition } from "@/components/ui/page-transition";
import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <PageTransition className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center max-w-md bg-white p-12 rounded-3xl border border-border/50 premium-shadow">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">404</h1>
        <p className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The module you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    </PageTransition>
  );
}
