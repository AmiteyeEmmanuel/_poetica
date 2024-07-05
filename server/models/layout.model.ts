import mongoose, { Schema, Model } from "mongoose";
import { BannerImage, Category, FAQItem, Layout } from "../interface/layout.interface";


// Define the schemas
const FaqSchema = new Schema<FAQItem>({
    question: { type: String },
    answer: { type: String },
  });
  
  const CategorySchema = new Schema<Category>({
    title: { type: String },
  });
  
  export const BannerImageSchema = new Schema<BannerImage>({
    public_id: { type: String },
    url: { type: String },
  });
  
  export const LayoutSchema = new Schema<Layout>({
    type: { type: String },
    faq: [FaqSchema] ,
    categories: [CategorySchema] ,
    banner: {
      image: BannerImageSchema,
      title: { type: String},
      subtitle: { type: String },
    },
  });


  const LayoutModel: Model<Layout> = mongoose.model<Layout>(
    "Layout",
    LayoutSchema
  );
  
  
  export default LayoutModel;
  