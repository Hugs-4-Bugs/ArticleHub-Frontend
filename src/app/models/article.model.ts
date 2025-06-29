export interface Article {
    id: number;
    title: string;
    content: string;
    category: string;
    publication_date: string;
    paid: boolean | string;
    limitedPrice?: number;
    fullPrice?: number;
    // Add more fields as needed
  }
  