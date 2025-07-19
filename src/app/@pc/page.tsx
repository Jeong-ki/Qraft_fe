'use client';

import DisclosureCard from '@/components/domain/disclosure/disclosure-card';
import { DateRangePicker, Input, Select } from '@/components/ui';
import dayjs from 'dayjs';
import React, { useState } from 'react';

export default function DisclosurePage() {
  const [exchange, setExchange] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs().subtract(1, 'year'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs());

  const handleExchangeChange = (value: string | number) => {
    setExchange(value as string);
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
  };

  return (
    <div className="disclosure-container">
      {/* 필터 영역 */}
      <section className="cont-filter">
        <div className="filter-group">
          <Select
            label="거래소"
            wrapperClassName="form_small"
            value={exchange}
            options={[
              { label: '전체', value: 'all' },
              { label: '심천', value: 'shenzhen' },
              { label: '홍콩', value: 'hongkong' },
            ]}
            onChagne={handleExchangeChange}
          />
        </div>
        <Input
          label="키워드"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="키워드 입력"
        />
        <DateRangePicker
          start={{ date: startDate, setDate: setStartDate, maxDate: endDate }}
          end={{ date: endDate, setDate: setEndDate, minDate: startDate }}
        />
      </section>

      {/* 메인 영역 (카드 목록) */}
      <main className="cont-cards-list">
        <DisclosureCard />
        <DisclosureCard />
      </main>
    </div>
  );
}
