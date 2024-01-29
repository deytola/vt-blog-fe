import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { BlogType } from "@/types/blog.types";

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
                transition={{ duration: 1 }}>
                <figure className="w-full relative h-60 overflow-hidden rounded-md mb-2">
                    <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        className="object-cover rounded-md hover:scale-105 duration-300"
                    />
                </figure>
                <p className="text-[#6C757D] text-sm">
                    {dayjs(data.created_at).format("DD.MM.YYYY")}
                </p>
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
