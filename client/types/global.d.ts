type onboardingSwiperDataType = {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    image: any;
}

type Photo = {
    public_id: string;
    url: string
}

type User = {
    id: string;
    username: string;
    email: string;
    password?: string;
    photo?: any;
    poems: any;
    createdAt: Date;
    updatedAt: Date;
}

type BannerDataType = {
    bannerImageUrl: any;
}