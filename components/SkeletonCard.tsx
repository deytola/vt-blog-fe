import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import React, { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard: FC = () => {
    return (
        <Card className={"flex flex-col justify-between"}>
            <CardContent>
                <Skeleton className={"h-40 flex-grow mt-4"} />
                <Skeleton className={"h-4 w-1/4 mt-4"} />
                <Skeleton className={"h-4 font-extrabold flex-grow mt-4"} />
                <Skeleton className={"h-4 flex-grow mt-4"} />
                <Skeleton className={"h-4 w-1/2 mt-4"} />
            </CardContent>
        </Card>
    );
};
export default SkeletonCard;
