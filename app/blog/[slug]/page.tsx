import BlogPostPage from "@/pages/BlogPostPage";

interface BlogParams {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPost({ params }: BlogParams) {
  const { slug } = await params;
  return <BlogPostPage />;
}
