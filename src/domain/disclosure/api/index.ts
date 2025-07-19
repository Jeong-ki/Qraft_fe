import { DisclosurePage } from '../types';

export const getDisclosure = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam: number;
  queryKey: any[];
}): Promise<DisclosurePage> => {
  const [, filters] = queryKey;

  const query = new URLSearchParams({
    exchange: filters.exchange,
    keyword: filters.keyword,
    startDate: filters.startDate.toISOString(),
    endDate: filters.endDate.toISOString(),
    page: pageParam.toString(),
  });

  const response = await fetch(`/api/disclosure?${query.toString()}`);

  if (!response.ok) {
    throw new Error('공시 데이터를 불러오는 데 실패했습니다.');
  }

  return response.json();
};
