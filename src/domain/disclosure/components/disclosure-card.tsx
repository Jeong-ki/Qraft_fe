import { Disclosure } from '../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface DisclosureCardProps {
  data: Disclosure;
}

export default function DisclosureCard({ data }: DisclosureCardProps) {
  const topics = data.analysisDetails.topicKor
    .split(',')
    .slice(0, 3)
    .map((t) => t.trim());

  return (
    <article className="disclosure-card">
      <div className="card-info-wrapper">
        <div className="card-info">
          <div className="date-info">
            <div className="date-info-item">
              <span>공시일</span>
              <span>{dayjs(data.dataDate).tz('Asia/Seoul').format('YYYY/MM/DD HH:mm:ss')}</span>
            </div>
            <div className="date-info-item">
              <span>현지시간</span>
              <span>{dayjs(data.dataDate).tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm:ss')}</span>
            </div>
          </div>
          <div className="company-info">
            <div>{data.details.secCode[0]}</div>
            <div>
              {data.korName} ({data.details.secName[0]})
            </div>
          </div>
        </div>

        <div className="info-type">
          <div className="tags">
            {topics.map((topic, index) => (
              <span key={index} className="tag">
                {topic}
              </span>
            ))}
          </div>

          <div className="disclosure-type">{data.categoryName}</div>
        </div>
      </div>

      <div className="card-body">
        <h3>{data.analysisDetails.summarizeTinyKor}</h3>
        <p>{data.analysisDetails.summarizeLongKor}</p>
      </div>
    </article>
  );
}
