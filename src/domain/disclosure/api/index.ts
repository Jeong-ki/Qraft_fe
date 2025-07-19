import { DisclosurePage } from '../types';

/**
 * 공시 데이터 조회 API
 * @param pageParam - 요청할 페이지 번호
 * @param queryKey - React Query 키 배열, 필터 정보 포함
 * @returns 공시 데이터와 다음 페이지 정보
 */
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
