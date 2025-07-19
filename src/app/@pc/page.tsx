'use client';

import DisclosureCard from '@/components/domain/disclosure/disclosure-card';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import React, { useState } from 'react';

export default function DisclosurePage() {
  const [exchange, setExchange] = useState('all');
  const [keyword, setKeyword] = useState('');

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
        <div className="filter-group">
          <input type="date" id="start-date" defaultValue="2023-05-01" />
          <span className="date-separator">{'>'}</span>
          <input type="date" id="end-date" defaultValue="2024-05-01" />
        </div>
      </section>

      {/* 메인 영역 (카드 목록) */}
      <main className="cont-cards-list">
        <DisclosureCard />
        <DisclosureCard />
      </main>
    </div>
  );
}
