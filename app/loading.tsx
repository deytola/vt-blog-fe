import { FC } from "react";
import { BeatLoader } from "react-spinners";

const Loading: FC = () => {
    return (
        <div className="flex items-center justify-center h-96">
            <BeatLoader loading={true} color="#111827" size={12} />
        </div>
    );
};

export default Loading;
