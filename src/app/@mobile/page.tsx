'use client';

import { DateRangePicker, Input, Select } from '@/components/ui';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { disclosureFilterSchema, DisclosureFormValues } from '@/domain/disclosure/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DISCLOSURE_EXCHANGE_OPTIONS } from '@/domain/disclosure/constants';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { getDisclosure } from '@/domain/disclosure/api';
import { useCallback, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { MobileDisclosureList } from '@/domain/disclosure/components';

export default function MobileDisclosurePage() {
  const observerRef = useRef<HTMLDivElement>(null);
  const { watch, setValue } = useForm<DisclosureFormValues>({
    resolver: zodResolver(disclosureFilterSchema),
    defaultValues: {
      exchange: 'all',
      keyword: '',
      startDate: dayjs().subtract(1, 'year'),
      endDate: dayjs(),
    },
  });
  const { keyword, ...filters } = watch();
  const debouncedKeyword = useDebounce(keyword, 300);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, isError } =
    useInfiniteQuery({
      queryKey: ['disclosure', { ...filters, keyword: debouncedKeyword }],
      queryFn: getDisclosure,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      placeholderData: keepPreviousData,
    });

  const handleExchangeChange = useCallback(
    (value: string | number) => {
      setValue('exchange', value as 'all' | 'shenzhen' | 'hongkong');
    },
    [setValue],
  );

  const handleKeywordChange = useCallback(
    (value: string) => {
      setValue('keyword', value);
    },
    [setValue],
  );

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="disclosure-container">
      {/* 필터 영역 */}
      <section className="cont-filter">
        <div className="filter-group-wrapper">
          <div className="filter-group-inner">
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
              wrapperClassName="form_small"
            />
          </div>
          <div className="filter-date">
            <span className="form_label">기간</span>
            <DateRangePicker
              start={{
                date: watch('startDate'),
                setDate: (date) => setValue('startDate', date as dayjs.Dayjs),
                maxDate: watch('endDate'),
                wrapperClassName: 'form_small',
              }}
              end={{
                date: watch('endDate'),
                setDate: (date) => setValue('endDate', date as dayjs.Dayjs),
                minDate: watch('startDate'),
                wrapperClassName: 'form_small',
              }}
            />
          </div>
        </div>
      </section>

      {/* 메인 영역 (카드 목록) */}
      <main className="cont-cards-list">
        <MobileDisclosureList
          isLoading={isLoading}
          isError={isError}
          data={data}
          isFetchingNextPage={isFetchingNextPage}
          observerRef={observerRef}
        />
      </main>
    </div>
  );
}
