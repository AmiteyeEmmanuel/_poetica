import { Document, Schema, Model } from "mongoose";

// Define the interfaces
export interface FAQItem extends Document {
  question: string;
  answer: string;
}

export interface Category extends Document {
  title: string;
}

export interface BannerImage extends Document {
  public_id: string;
  url: string;
}

export interface Layout extends Document {
  type: string;
  faq: FAQItem[];
  categories: Category[];
  banner: {
    image: BannerImage;
    title: string;
    subtitle: string;
  };
}


