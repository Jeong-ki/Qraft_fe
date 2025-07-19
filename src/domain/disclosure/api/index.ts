import { Disclosure } from '../types';
import { DisclosureFormValues } from '../schema/disclosure-schema';

export const getDisclosure = async (params: DisclosureFormValues): Promise<Disclosure[]> => {
  const query = new URLSearchParams({
    exchange: params.exchange,
    keyword: params.keyword,
    startDate: params.startDate.toISOString(),
    endDate: params.endDate.toISOString(),
  });

  const response = await fetch(`/api/disclosure?${query.toString()}`);

  if (!response.ok) {
    throw new Error('공시 데이터를 불러오는 데 실패했습니다.');
  }

  return response.json();
};
