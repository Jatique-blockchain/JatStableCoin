import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export function CardSkeleton() {
    return (
        <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
                <CardTitle><div className="h-6 w-[150px] bg-secondary/50 animate-pulse rounded"></div></CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="h-10 w-[100px] bg-secondary/50 animate-pulse rounded"></div>
                    <div className="h-6 w-6 bg-secondary/50 animate-pulse rounded-full"></div>
                </div>
                <div className="h-4 w-[120px] bg-secondary/50 animate-pulse rounded mt-2"></div>
            </CardContent>
            <CardFooter>
                <div className="h-10 w-[120px] bg-secondary/50 animate-pulse rounded"></div>
            </CardFooter>
        </Card>
    );
}

export function CardSkeletonWithSelect() {
    return (
        <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
                <CardTitle><div className="h-6 w-[150px] bg-secondary/50 animate-pulse rounded"></div></CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-[100px] bg-secondary/50 animate-pulse rounded"></div>
                        <div className="h-10 w-[100px] bg-secondary/50 animate-pulse rounded"></div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="h-10 w-[120px] bg-secondary/50 animate-pulse rounded"></div>
            </CardFooter>
        </Card>
    );
}
