import React from 'react';
import { Disclosure } from '../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface DisclosureCardProps {
  data: Disclosure;
}

const MobileDisclosureCard = ({ data }: DisclosureCardProps) => {
  const topics = data.analysisDetails.topicKor
    .split(',')
    .slice(0, 3)
    .map((t) => t.trim());

  return (
    <article className="disclosure-card">
      <div className="card-header">
        <span className="card-category">{data.categoryName}</span>
        <div className="tags">
          {topics.map((topic, index) => (
            <span key={index} className="tag">
              # {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="card-body">
        <p>{data.analysisDetails.summarizeTinyKor}</p>
      </div>

      <div className="date-info">
        {dayjs(data.dataDate).tz('Asia/Seoul').format('YYYY/MM/DD HH:mm:ss')}
      </div>
    </article>
  );
};

export default React.memo(MobileDisclosureCard);
