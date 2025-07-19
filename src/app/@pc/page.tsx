'use client';

import DisclosureCard from '@/components/domain/disclosure/disclosure-card';
import React from 'react';

export default function DisclosurePage() {
  return (
    <div className="disclosure-container">
      {/* 필터 영역 */}
      <section className="cont-filter">
        <div className="filter-group">
          <label htmlFor="exchange">거래소</label>
          <select id="exchange" defaultValue="shenzhen">
            <option value="shenzhen">심천</option>
            <option value="shanghai">상해</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="keyword">키워드</label>
          <input type="text" id="keyword" placeholder="정시" />
        </div>
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
