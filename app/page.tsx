"use client";

import Link from "next/link";
import { fetchBlogs, Blog, BlogCardWithOgp } from "@/components/blogsOGP";
import { products } from "@/data/products";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SiHono, SiPrisma } from "react-icons/si";
import { FaReact, FaGitAlt, FaDocker } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { RiSupabaseFill } from "react-icons/ri";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

// スキルデータ
const skills = [
  { name: "React", icon: FaReact, level: 2 },
  { name: "Next.js", icon: SiNextdotjs, level: 4 },
  { name: "TypeScript", icon: SiTypescript, level: 3 },
  { name: "Hono ", icon: SiHono, level: 3 },
  { name: "TailwindCSS", icon: SiTailwindcss, level: 4 },
  { name: "Git", icon: FaGitAlt, level: 2 },
  { name: "Docker", icon: FaDocker, level: 1 },
  { name: "Supabase", icon: RiSupabaseFill, level: 3 },
  { name: "prisma", icon: SiPrisma, level: 3 },
];

export default function Home() {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const blogsRef = useRef(null);
  const productsRef = useRef(null);

  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 });
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
  const isBlogsInView = useInView(blogsRef, { once: true, amount: 0.2 });
  const isProductsInView = useInView(productsRef, { once: true, amount: 0.2 });

  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const loadBlogs = async () => {
      const fetchedBlogs = await fetchBlogs();
      setBlogs(fetchedBlogs);
    };
    loadBlogs();
  }, []);

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

  // 星評価を表示するコンポーネント
  const StarRating = ({ level }: { level: number }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-2xl ${i < level ? "text-yellow-400" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* header */}
      <header className="sticky top-0 z-10 flex items-center justify-between py-5">
        <div>
          <button className="ml-6 cursor-pointer text-2xl font-bold text-gray-700">
            <Link
              href="/"
              className="relative inline-block px-2 py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gray-600 after:transition-all after:duration-800 hover:after:w-full"
            >
              Koki&apos;s Portfolio
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
              href="#skills"
              className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gray-600 after:transition-all after:duration-400 hover:after:w-full"
            >
              Skills
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
        <div id="about" className="mb-30 scroll-mt-24" ref={aboutRef}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isAboutInView ? "show" : "hidden"}
            className="ml-5 text-7xl text-gray-600"
          >
            About
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isAboutInView ? "show" : "hidden"}
            className="mx-8 mt-15 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="rounded-4xl bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-700">学歴</h2>
              <p className="text-gray-600 mb-1">2023年3月 愛知県立豊明高等学校 卒業</p>
              <p className="text-gray-600 mb-1">2023年4月 中京大学工学部情報工学科 入学</p>
              <p className="text-gray-600">2027年3月 中京大学工学部情報工学科 卒業予定</p>
            </div>

            <div className="rounded-4xl bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-700">実績</h2>
              <p className="text-gray-600 mb-1">
                ・2025年3月 SysHack2025 最優秀賞 & 企業賞(TechTrain様)
              </p>
              <p className="text-gray-600 mb-1">
                ・2025年4月 中京大学プログラミングサークル 「Terminal」設立
              </p>
              <p className="text-gray-600">
                ・2025年5月 技育博 企業賞(サイバーエージェント様)
              </p>
            </div>

            <div className="rounded-4xl bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-700">趣味</h2>
              <p className="text-gray-600 mb-1">・PCゲーム</p>
              <p className="text-gray-600">・個人開発</p>
            </div>

            <div className="rounded-4xl bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-700">
                技術スタック
              </h2>
              <p className="text-gray-600 mb-1">・Next.js</p>
              <p className="text-gray-600 mb-1">・TailwindCSS</p>
              <p className="text-gray-600 mb-1">・Supabase</p>
              <p className="text-gray-600">・Prisma</p>
            </div>
          </motion.div>
        </div>

        {/* skills */}
        <div id="skills" className="mb-30 scroll-mt-24" ref={skillsRef}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isSkillsInView ? "show" : "hidden"}
            className="ml-5 text-7xl text-gray-600"
          >
            Skills
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10"
            variants={container}
            initial="hidden"
            animate={isSkillsInView ? "show" : "hidden"}
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center rounded-lg p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                variants={item}
              >
                <skill.icon className="mb-4 text-6xl text-blue-600" />
                <h3 className="mb-2 text-xl font-bold">{skill.name}</h3>
                <StarRating level={skill.level} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* blog */}
        <div id="blogs" className="mb-30 scroll-mt-24" ref={blogsRef}>
          <motion.h1
            className="mb-6 ml-5 text-7xl text-gray-600"
            variants={fadeIn}
            initial="hidden"
            animate={isBlogsInView ? "show" : "hidden"}
          >
            <p className="text-7xl text-gray-600 mb-10">Blogs</p>
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
                  Loading blogs...
                </p>
              </motion.div>
            ) : (
              blogs.map((blog) => (
                <BlogCardWithOgp key={blog.title} blog={blog} variants={item} />
              ))
            )}
          </motion.div>
        </div>

        {/* products */}
        <div id="products" className="mb-30 scroll-mt-24" ref={productsRef}>
          <motion.h1
            className="mb-15 ml-5 text-7xl text-gray-600"
            variants={fadeIn}
            initial="hidden"
            animate={isProductsInView ? "show" : "hidden"}
          >
            <p className="text-7xl text-gray-600">Products</p>
          </motion.h1>
          <motion.div
            className="px-10"
            variants={container}
            initial="hidden"
            animate={isProductsInView ? "show" : "hidden"}
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnMouseEnter: true,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem key={product.name} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <motion.div
                        className="group relative aspect-square overflow-hidden"
                        variants={item}
                      >
                        <Link
                          href={product.url}
                          target="_blank"
                          className="relative z-50 block h-full w-full"
                          style={{
                            backgroundImage: `url(${product.image})`,
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <h2 className="mb-2 text-xl font-bold text-white">
                              {product.name}
                            </h2>
                            <p className="line-clamp-3 text-center text-sm text-white sm:line-clamp-5">
                              {product.content}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </div>
      </main>

      {/* footer */}
      <footer className="flex h-20 items-center justify-between px-10">
        <h1 className="text-2xl text-gray-600">
          © 2025. Koki&apos;s Portfolio
        </h1>

        <div className="flex gap-5">
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
