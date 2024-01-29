/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "dummyimage.com",
            "images.pexels.com",
            "myimage.url.com",
            "myimage.url.co",
            "loremflickr.com",
            "vt-blog-bucket.s3.us-east-2.amazonaws.com",
        ],
    },
};

module.exports = nextConfig;
