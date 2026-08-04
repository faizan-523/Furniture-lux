import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <BestSellers />
      <Testimonials />
      <Newsletter />
      <CTA />
    </div>
  );
}