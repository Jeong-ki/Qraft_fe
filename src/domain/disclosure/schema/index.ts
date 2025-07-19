import { z } from 'zod';
import dayjs from 'dayjs';

/**
 * 공시 필터링 폼 검증 스키마
 * Zod 런타임 타입 검증과 폼 데이터 유효성 검사
 */
export const disclosureFilterSchema = z
  .object({
    exchange: z.enum(['all', 'shenzhen', 'hongkong']),
    keyword: z.string(),
    // Day.js 객체 검증
    startDate: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      message: '유효한 날짜 형식이 아닙니다.',
    }),
    endDate: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      message: '유효한 날짜 형식이 아닙니다.',
    }),
  })
  // 날짜 범위 검증: 종료일이 시작일보다 이전일 수 없음
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate.isBefore(data.endDate) || data.startDate.isSame(data.endDate);
      }
      return true;
    },
    {
      message: '종료일은 시작일보다 빠를 수 없습니다.',
      path: ['endDate'], // 에러 표시 필드 지정
    },
  );

export type DisclosureFormValues = z.infer<typeof disclosureFilterSchema>;
