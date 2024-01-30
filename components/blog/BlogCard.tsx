import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlogType } from "@/types/blog.types";
import TimeAgo from "@/components/blog/TimeAgo";

type Props = {
    data: BlogType;
};

const BlogCard: FC<Props> = ({ data }) => {
    return (
        <Link href={`/${data.slug}`}>
            <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative">
                <figure className="w-full relative h-60 overflow-hidden rounded-md mb-2">
                    {/* Overlay div with category */}
                    <div className="absolute m-4 rounded top-0 right-0 p-2 bg-black bg-opacity-50 text-white z-10">
                        <span className="text-xs">{data.category}</span>
                    </div>
                    <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        priority
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 1000px"
                        className="object-cover rounded-md hover:scale-105 duration-300"
                    />
                </figure>
                <TimeAgo timestamp={data.created_at} />
                <h3
                    className="text-black text-lg font-semibold w-full truncate my-1"
                    title={data.title}>
                    {data.title}
                </h3>
                <p className="text-[#6C757D] text-sm">{data.content.slice(0, 110)}...</p>
            </motion.div>
        </Link>
    );
};

export default BlogCard;
