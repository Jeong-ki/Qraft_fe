'use client';

import DisclosureCard from '@/domain/disclosure/components/disclosure-card';
import { DateRangePicker, Input, Select, Spinner } from '@/components/ui';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import {
  disclosureFilterSchema,
  DisclosureFormValues,
} from '@/domain/disclosure/schema/disclosure-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DISCLOSURE_EXCHANGE_OPTIONS } from '@/domain/disclosure/constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getDisclosure } from '@/domain/disclosure/api';

export default function DisclosurePage() {
  const { watch, setValue } = useForm<DisclosureFormValues>({
    resolver: zodResolver(disclosureFilterSchema),
    defaultValues: {
      exchange: 'all',
      keyword: '',
      startDate: dayjs().subtract(1, 'year'),
      endDate: dayjs(),
    },
  });

  const handleExchangeChange = (value: string | number) => {
    setValue('exchange', value as 'all' | 'shenzhen' | 'hongkong');
  };

  const handleKeywordChange = (value: string) => {
    setValue('keyword', value);
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      'disclosure',
      watch('exchange'),
      watch('keyword'),
      watch('startDate'),
      watch('endDate'),
    ],
    queryFn: () => getDisclosure(watch()),
    placeholderData: keepPreviousData,
  });

  console.log(isLoading);

  return (
    <div className="disclosure-container">
      {/* 필터 영역 */}
      <section className="cont-filter">
        <div className="filter-group-wrapper">
          <div className="filter-group">
            <Select
              label="거래소"
              wrapperClassName="form_small"
              value={watch('exchange')}
              options={DISCLOSURE_EXCHANGE_OPTIONS}
              onChagne={handleExchangeChange}
            />
          </div>
          <Input
            label="키워드"
            value={watch('keyword')}
            onChange={handleKeywordChange}
            placeholder="키워드 입력"
          />
          <DateRangePicker
            start={{
              date: watch('startDate'),
              setDate: (date) => setValue('startDate', date as dayjs.Dayjs),
              maxDate: watch('endDate'),
            }}
            end={{
              date: watch('endDate'),
              setDate: (date) => setValue('endDate', date as dayjs.Dayjs),
              minDate: watch('startDate'),
            }}
          />
        </div>
      </section>

      {/* 메인 영역 (카드 목록) */}
      <main className="cont-cards-list">
        {isLoading ? (
          <div className="spinner-wrappper">
            <Spinner />
          </div>
        ) : data && data.length > 0 ? (
          data.map((item) => <DisclosureCard key={item.id} data={item} />)
        ) : (
          <div className="no-data">조회 결과가 없습니다.</div>
        )}
      </main>
    </div>
  );
}
