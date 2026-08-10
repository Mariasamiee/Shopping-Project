import { Star } from "lucide-react";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import { ProgressBar } from "@/pages/components/ui/atoms/ProgressBar";

export interface RatingBreakdownItem {
    star: number;
    count: number;
}

export interface RatingSummaryProps {
    averageRating: number;
    totalReviews: number;
    breakdown: RatingBreakdownItem[];
}

function StarsRow({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={20}
                    className={
                        star <= Math.round(rating)
                            ? "fill-primary-500 text-primary-500"
                            : "text-neutral-400 fill-neutral-400"
                    } />
            ))}
        </div>
    )
}

export function RatingSummary({ averageRating, totalReviews, breakdown }: RatingSummaryProps) {
    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <div className="flex items-center gap-3">
                <Typography variant="h2">{averageRating.toFixed(1)}</Typography>

                <StarsRow rating={averageRating} />
            </div>

            <div className="flex flex-col gap-2">
                {breakdown.map((item) => (
                    <div key={item.star} className="flex items-center gap-2">
                        <Typography variant="caption" color="muted" className="w-4">
                            {item.count}
                        </Typography>

                        <ProgressBar value={item.count} max={totalReviews} className="flex-1" />

                        <Typography variant="caption" color="muted" className="w-4">
                            {item.star}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}