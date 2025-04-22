"use client";

import Link from "next/link";
import { products } from "@/utils/products";
import { blogs } from "@/utils/blogs";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { GrGrow } from "react-icons/gr";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const aboutRef = useRef(null);
  const blogsRef = useRef(null);
  const productsRef = useRef(null);

  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 });
  const isBlogsInView = useInView(blogsRef, { once: true, amount: 0.2 });
  const isProductsInView = useInView(productsRef, { once: true, amount: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div>
      {/* header */}
      <header className="sticky top-0 z-10 flex items-center justify-between py-5">
        <div>
          <button className="ml-6 cursor-pointer text-2xl font-bold text-gray-700">
            <Link href="/" className="hover:shadow-lg p-3 rounded-lg hover:text-gray-900">
              Koki&apos;s Portforio
            </Link>
          </button>
        </div>
        <div className="mr-10 flex items-center justify-between gap-6">
          <button className="cursor-pointer text-2xl font-semibold text-gray-600 hover:text-gray-800">
            <Link
              href="#about"
              className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gray-600 after:transition-all after:duration-400 hover:after:w-full"
            >
              About
            </Link>
          </button>
          <button className="cursor-pointer text-2xl font-semibold text-gray-600 hover:text-gray-800">
            <Link
              href="#blogs"
              className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gray-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              Blogs
            </Link>
          </button>
          <button className="cursor-pointer text-2xl font-semibold text-gray-600 hover:text-gray-800">
            <Link
              href="#products"
              className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gray-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              Products
            </Link>
          </button>
        </div>
      </header>
      {/* main */}
      <main className="flex min-h-screen flex-col justify-between pt-20">
        {/* about */}
        <div id="about" className="mb-20" ref={aboutRef}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isAboutInView ? "show" : "hidden"}
            className="ml-5 text-7xl text-gray-600"
          >
            About
          </motion.div>
        </div>

        {/* blog */}
        <div id="blogs" className="mb-20" ref={blogsRef}>
          <motion.h1
            className="mb-6 ml-5 text-7xl text-gray-600"
            variants={fadeIn}
            initial="hidden"
            animate={isBlogsInView ? "show" : "hidden"}
          >
            Blogs
          </motion.h1>
          <motion.div
            className="relative grid grid-cols-3 gap-7 px-4"
            variants={container}
            initial="hidden"
            animate={isBlogsInView ? "show" : "hidden"}
          >
            {blogs.length === 0 ? (
              <motion.div
                className="col-span-3 flex items-center justify-center py-10"
                variants={item}
              >
                <p className="text-5xl font-light text-gray-400">
                  Coming soon...
                </p>
              </motion.div>
            ) : (
              blogs.map((blog) => (
                <motion.div
                  key={blog.name}
                  className="group relative aspect-square overflow-hidden rounded-xl border-1 bg-gray-200"
                  variants={item}
                >
                  <Link
                    href={blog.url}
                    className="relative z-5 block h-full w-full"
                  >
                    <div className="bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center bg-black p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-60">
                      <h2 className="mb-2 text-xl font-bold text-white">
                        {blog.name}
                      </h2>
                      <p className="line-clamp-3 text-center text-sm text-white sm:line-clamp-5">
                        {blog.content}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {/* products */}
        <div id="products" className="mb-20" ref={productsRef}>
          <motion.h1
            className="mb-15 ml-5 text-7xl text-gray-600"
            variants={fadeIn}
            initial="hidden"
            animate={isProductsInView ? "show" : "hidden"}
          >
            Products
          </motion.h1>
          <motion.div
            className="relative grid grid-cols-3 gap-10 px-10"
            variants={container}
            initial="hidden"
            animate={isProductsInView ? "show" : "hidden"}
          >
            {products.map((product) => (
              <motion.div
                key={product.name}
                className="group relative aspect-square overflow-hidden rounded-xl border-1 bg-gray-200"
                variants={item}
              >
                <Link
                  href={product.url}
                  target="_blank"
                  className="relative z-5 block h-full w-full"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center bg-black p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-60">
                    <h2 className="mb-2 text-xl font-bold text-white">
                      {product.name}
                    </h2>
                    <p className="line-clamp-3 text-center text-sm text-white sm:line-clamp-5">
                      {product.content}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* footer */}
      <footer className="flex h-20 items-center justify-between px-10">
        <h1 className="text-2xl text-gray-600">© 2025 Matsubara</h1>

        <div className="flex gap-5">
        <a
            href="/grow"
            className="text-gray-600 hover:text-gray-900"
          >
            <GrGrow size={30} />
          </a>
          <a
            href="https://x.com/Lime_Ivy1221"
            target="_blank"
            className="text-gray-600 hover:text-gray-900"
          >
            <FaXTwitter size={32} />
          </a>
          <a
            href="https://github.com/LimeIvy"
            target="_blank"
            className="text-gray-600 hover:text-gray-900"
          >
            <FaGithub size={32} />
          </a>
        </div>
      </footer>
    </div>
  );
}
