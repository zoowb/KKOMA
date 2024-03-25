export interface ProductSm {
  id: number;
  thumbnail_image: string;
  title: string;
  price: number;
}

export interface Product {
  id: number;
  thumbnailImage: string;
  title: string;
  dealPlace: string;
  price: number;
  status: 'SALE' | 'PROGRESS' | 'SOLD';
  elapsedMinutes: number;
}

interface DetailParams {
  "id": number,
  "productImages": string[],
  "title": string,
  "description": string,
  "categoryName": string,
  "price": number,
  "status": "SALE",
  "dealPlace": string,
  "elapsedMinutes": number,
  "memberSummary": {
    "profileImage": string,
    "nickname": string,
    "preferredPlace": string
  },
  "wishCount": number,
  "offerCount": number,
  "viewCount": number,
}