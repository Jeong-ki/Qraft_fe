/* src/components/DisclosureCard.tsx */

import React from 'react';

export default function DisclosureCard() {
  return (
    <article className="disclosure-card">
      <div className="card-info-wrapper">
        <div className="card-info">
          <div className="date-info">
            <div className="date-info-item">
              <span>공시일</span>
              <span>2024/04/12 22:52:00</span>
            </div>
            <div className="date-info-item">
              <span>현지시간</span>
              <span>2024/04/12 21:52:00</span>
            </div>
          </div>
          <div className="company-info">
            <div>002667</div>
            <div>래아양광 (雅化股份)</div>
          </div>
        </div>

        <div className="info-type">
          <div className="tags">
            <span className="tag">주식 발행</span>
            <span className="tag">지분 인수</span>
            <span className="tag">현금 지급</span>
          </div>

          <div className="disclosure-type">일반공시</div>
        </div>
      </div>

      <div className="card-body">
        <h3>
          안산중홍기계, 주식 발행 및 현금 지급을 통해 Jiangxi Jinhui Renewable Resources의 30%
          지분을 인수 계획
        </h3>
        <p>
          안산중홍기계는 주식 발행 및 현금 지급을 통해 Jiangxi Jinhui Renewable Resources의 30% 지분
          인수 계획을 발표했다. 회사는 법적 절차의 완전성과 준수, 제출된 법적 문서의 유효성을 철저히
          검토했다. 회사는 관련 법령에서 요구하는 법적 절차를 준수하였으며, 법적으로 유효한 법적
          문서를 제출했다. 회사는 내부자 명단을 Shenzhen Stock Exchange에 제출하였으며, 관련 법령을
          준수했다.
        </p>
      </div>
    </article>
  );
}
