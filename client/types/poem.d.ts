type CommentType = {
  user: User ;
  question: string;
  questionReplies: CommentType[];
}

type ReviewType = {
  user: User;
  rating?: number;
  comment: string;
  commentReplies?: ReviewType[];
}

type LinkType = {
  title: string;
  url: string;
}

type BenefitType = {
  title: string;
}

type CategoryType = {
  title: string;
}

type PrerequistesType = {
  title: string;
}

type PoemDataType = {
  title: string;
  description: string;
  content: string;
  poemImage: string;
  imageSection: string;
  imageThumbnail: object;
  link: LinkType[];
  suggestion: string;
  questions: CommentType[];
}

type IQuestionDataType = {
  question: string;
  poemId: string;
  contentId: string;
}

type AnswerDataType = {
    answer: string,
    poemId: string,
    contentId: string,
    questionId: string
}


type PoemsType = {
  _id: string;
  user: User
  bio: string;
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: {
    public_id: string;
    url: string;
  };
  tags: string;
  level: string;
  demoUrl: string;
  benefits: BenefitType[];
  prerequisites: PrerequistesType[];
  reviews:ReviewType[];
  poemData: PoemDataType[];
  rating?: number;
  purchased: number;
};


