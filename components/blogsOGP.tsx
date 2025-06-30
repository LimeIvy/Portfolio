"use client";

import Link from "next/link";
import useSWR from "swr";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export interface Blog {
  title: string;
  url: string;
  created_at: string;
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch("/api/v2/items");
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const data: Blog[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

function useOgp(url: string) {
  const fetcher = (apiUrl: string) => fetch(apiUrl).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    url ? `/api/ogp?url=${encodeURIComponent(url)}` : null,
    fetcher
  );
  return {
    ogp: data,
    isLoading,
    isError: error,
  };
}

export function BlogCardWithOgp({
  blog,
  variants,
}: {
  blog: Blog;
  variants: Variants;
}) {
  const { ogp, isLoading } = useOgp(blog.url);
  return (
    <motion.div
      key={blog.title}
      className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
      variants={variants}
    >
      <Link
        href={blog.url}
        className="block"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative aspect-video w-full bg-gray-100">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-gray-500">取得中...</p>
            </div>
          ) : ogp?.image ? (
            <Image
              src={ogp.image}
              alt={ogp.title || blog.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-gray-500">No Image</p>
            </div>
          )}
        </div>
      </Link>
      <div className="flex-1 p-4">
        <h2
          className="mb-1 font-bold text-gray-800 line-clamp-2"
          title={ogp?.title || blog.title}
        >
          {ogp?.title || blog.title}
        </h2>
        <p
          className="text-sm text-gray-600 line-clamp-3"
          title={ogp?.description}
        >
          {ogp?.description}
        </p>
      </div>
    </motion.div>
  );
}
