import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CardItem {
    title: string;
    category?: string;
    description: string;
    link?: string;
    linkText?: string;
    image?: string;
}

interface CardGridProps {
    title?: string;
    description?: string;
    items: CardItem[];
    layout?: "vertical" | "horizontal"; // New prop to control layout
}

export default function CardGrid({ title, description, items, layout = "vertical" }: CardGridProps) {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-6 md:px-12">
                {title && (
                    <div className="mb-20 max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-medium text-tesla-black mb-6 tracking-tight">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-tesla-gray-600 text-lg leading-relaxed max-w-2xl">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className={`grid gap-12 md:gap-16 ${layout === "horizontal" /* Increased gap for rhythm */
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    }`}>
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }} /* Soft vertical drift */
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className={`group flex flex-col ${layout === "horizontal" ? "md:flex-row md:items-center gap-10 md:gap-20" : "gap-8 pt-5"
                                }`}
                        >
                            {/* Image Container */}
                            {item.image && (
                                <div className={`relative overflow-hidden bg-tesla-gray-100 ${layout === "horizontal"
                                    ? "w-full md:w-1/2 aspect-[4/3] rounded-[2px]" /* Softened corners */
                                    : "w-full aspect-[4/3] rounded-[2px]"
                                    }`}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-102" /* Subtle scale, slow duration */
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className={`flex flex-col justify-center ${layout === "horizontal" ? "w-full md:w-1/2 md:pr-12" : ""
                                }`}>
                                {item.category && (
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#FF6600] mb-3">
                                        {item.category}
                                    </span>
                                )}

                                <h3 className="text-2xl font-medium text-tesla-black mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-tesla-gray-600 leading-relaxed mb-6 text-base">
                                    {item.description}
                                </p>

                                {item.link && (
                                    <div>
                                        <Link
                                            href={item.link}
                                            className="inline-flex items-center text-sm font-bold text-tesla-black hover:text-[#FF6600] transition-colors uppercase tracking-wider border-b-2 border-transparent hover:border-[#FF6600] pb-1"
                                        >
                                            {item.linkText || "Learn More"}
                                            {/* Tesla typically keeps links very clean, removed arrow for stricter minimalism or keep it very subtle */}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
