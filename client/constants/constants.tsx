import { book, books, poetryBook } from "@/assets";

export const onboardingSwiperData: onboardingSwiperDataType[] = [
    {
      id: 1,
      title: 'Create Poetry',
      description: 'Unleash your creativity by writing and sharing your own poems.',
      shortDescription: 'Write and share your poems.',
      image: poetryBook
    },
    {
      id: 2,
      title: 'Explore Works',
      description: 'Discover and enjoy poems from other passionate writers.',
      shortDescription: 'Discover and enjoy poems.',
      image: books
    },
    {
      id: 3,
      title: 'Buy & Support',
      description: 'Support your favorite poets by purchasing their works.',
      shortDescription: 'Purchase and support poets.',
      image: book
    }
  ];
  