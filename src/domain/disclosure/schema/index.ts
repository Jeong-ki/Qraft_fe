import { z } from 'zod';
import dayjs from 'dayjs';

export const disclosureFilterSchema = z
  .object({
    exchange: z.enum(['all', 'shenzhen', 'hongkong']),
    keyword: z.string(),
    startDate: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      message: '유효한 날짜 형식이 아닙니다.',
    }),
    endDate: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      message: '유효한 날짜 형식이 아닙니다.',
    }),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate.isBefore(data.endDate) || data.startDate.isSame(data.endDate);
      }
      return true;
    },
    {
      message: '종료일은 시작일보다 빠를 수 없습니다.',
      path: ['endDate'],
    },
  );

export type DisclosureFormValues = z.infer<typeof disclosureFilterSchema>;
