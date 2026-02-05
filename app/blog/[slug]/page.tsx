import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

const blogPosts: Record<string, BlogPost> = {
  "benefits-of-solar-energy": {
    slug: "benefits-of-solar-energy",
    title: "Top 10 Benefits of Switching to Solar Energy",
    content: `
      <p>Solar energy has become one of the most popular renewable energy sources in recent years, and for good reason. Here are the top 10 benefits of making the switch to solar power:</p>
      
      <h2>1. Significant Cost Savings</h2>
      <p>One of the most compelling reasons to switch to solar energy is the potential for significant cost savings. By generating your own electricity, you can reduce or even eliminate your monthly electricity bills. Over time, the savings can be substantial, often paying for the initial investment within 5-10 years.</p>
      
      <h2>2. Environmentally Friendly</h2>
      <p>Solar energy is a clean, renewable resource that produces no harmful emissions. By switching to solar, you're reducing your carbon footprint and contributing to a healthier planet for future generations.</p>
      
      <h2>3. Energy Independence</h2>
      <p>With solar panels, you're less dependent on the grid and utility companies. This means protection against rising electricity rates and power outages, especially if you have battery storage.</p>
      
      <h2>4. Increased Property Value</h2>
      <p>Homes with solar panel systems typically sell for more than homes without them. Studies show that solar installations can increase property values by 3-4% on average.</p>
      
      <h2>5. Low Maintenance</h2>
      <p>Solar panels require minimal maintenance. With no moving parts, they're durable and can last 25-30 years or more with just occasional cleaning and inspections.</p>
      
      <h2>6. Government Incentives</h2>
      <p>Many governments offer tax credits, rebates, and other incentives to encourage solar adoption, making the initial investment more affordable.</p>
      
      <h2>7. Reliable Energy Source</h2>
      <p>The sun is a reliable energy source that's available every day. Even on cloudy days, modern solar panels can generate electricity efficiently.</p>
      
      <h2>8. Job Creation</h2>
      <p>The solar industry creates jobs in manufacturing, installation, and maintenance, contributing to local economic growth.</p>
      
      <h2>9. Technology Advancement</h2>
      <p>Solar technology continues to improve, with panels becoming more efficient and affordable each year. Early adopters benefit from these advancements.</p>
      
      <h2>10. Long-Term Investment</h2>
      <p>Solar panels are a long-term investment that provides returns for decades. With warranties typically lasting 20-25 years, you can enjoy free electricity for years to come.</p>
      
      <p>Ready to experience these benefits? Contact SolarPower today for a free consultation and quote!</p>
    `,
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Solar Energy",
    author: "SolarPower Team",
  },
  "off-grid-vs-on-grid": {
    slug: "off-grid-vs-on-grid",
    title: "Off-Grid vs On-Grid Solar Systems: Which is Right for You?",
    content: `
      <p>When considering solar energy for your home or business, one of the most important decisions is choosing between an off-grid or on-grid system. Each has its advantages and considerations.</p>
      
      <h2>On-Grid Solar Systems</h2>
      <p>On-grid (grid-tied) systems are connected to the public electricity grid. They're the most common type of solar installation and offer several benefits:</p>
      <ul>
        <li>Lower upfront costs</li>
        <li>Net metering - sell excess energy back to the grid</li>
        <li>No need for battery storage</li>
        <li>Reliable backup from the grid</li>
      </ul>
      
      <h2>Off-Grid Solar Systems</h2>
      <p>Off-grid systems operate independently from the utility grid and require battery storage:</p>
      <ul>
        <li>Complete energy independence</li>
        <li>Ideal for remote locations</li>
        <li>No monthly electricity bills</li>
        <li>Requires battery storage (higher cost)</li>
      </ul>
      
      <h2>Which Should You Choose?</h2>
      <p>The best choice depends on your location, energy needs, and budget. Our experts can help you determine the right system for your specific situation.</p>
    `,
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Solar Systems",
    author: "SolarPower Team",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = blogPosts[params.slug];
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: `${post.title} - SolarPower Blog`,
    description: post.content.replace(/<[^>]*>/g, "").substring(0, 160),
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <article className="pt-32 pb-24">
        {/* Banner Image Placeholder */}
        <div className="h-[400px] w-full bg-gray-100 relative mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=2696&auto=format&fit=crop')` }}
          />
          {/* Overlay if needed */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#FF6600] hover:text-[#FF8533] mb-8 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>

          <div className="mb-4">
            <span className="px-4 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-bold uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-black tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-gray-500 mb-12 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {post.readTime}
            </div>
            <div>By <span className="text-black font-semibold">{post.author}</span></div>
          </div>

          <div
            className="prose prose-lg prose-headings:font-bold prose-headings:text-black prose-p:text-gray-600 prose-li:text-gray-600 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      <Footer />
    </main>
  );
}

