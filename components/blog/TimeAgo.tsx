import { parseISO, formatDistanceToNow } from "date-fns";
import { FC } from "react";

type Props = {
    timestamp: string;
};

const TimeAgo: FC<Props> = ({ timestamp }) => {
    let timeAgo: string = "";
    if (timestamp) {
        const date: Date = parseISO(timestamp);
        const timePeriod: string = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }

    return (
        <span title={timestamp} className={"text-[#6C757D] text-sm"}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
};
export default TimeAgo;
