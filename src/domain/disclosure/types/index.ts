export interface Disclosure {
  id: string;
  dataDate: string;
  korName: string;
  details: {
    secName: string[];
    secCode: string[];
    categoryId: string[];
  };
  analysisDetails: {
    topicKor: string;
    summarizeTinyKor: string;
    summarizeLongKor: string;
  };
  categoryName?: string;
}

export interface DisclosurePage {
  data: Disclosure[];
  nextPage: number | null;
}
