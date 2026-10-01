import { useEffect, useState } from "react";
import { testimonials as seedTestimonials } from "../data/mockData";
import { getPublishedTestimonials } from "../services/testimonialService";
import type { Testimonial } from "../types";

const seedPublished = seedTestimonials.filter((t) => t.status === "published");

export function usePublishedTestimonials(): Testimonial[] {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(seedPublished);
  useEffect(() => {
    let active = true;
    getPublishedTestimonials().then((t) => active && setTestimonials(t));
    return () => {
      active = false;
    };
  }, []);
  return testimonials;
}
