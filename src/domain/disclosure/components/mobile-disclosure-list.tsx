import { Spinner } from '@/components/ui';
import { DisclosurePage } from '../types';
import { InfiniteData } from '@tanstack/react-query';
import MobileDisclosureCard from './mobile-disclosure-card';

interface DisclosureListProps {
  isLoading: boolean;
  isError: boolean;
  data: InfiniteData<DisclosurePage, unknown> | undefined;
  isFetchingNextPage: boolean;
  observerRef: React.RefObject<HTMLDivElement>;
}

const MobileDisclosureList = ({
  isLoading,
  isError,
  data,
  isFetchingNextPage,
  observerRef,
}: DisclosureListProps) => {
  if (isLoading) {
    return (
      <div className="spinner-wrappper">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div className="no-data">데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (!data?.pages || data.pages[0]?.data.length === 0) {
    return <div className="no-data">조회 결과가 없습니다.</div>;
  }

  return (
    <>
      {data.pages.map((page) =>
        page.data.map((item) => <MobileDisclosureCard key={item.id} data={item} />),
      )}
      <div ref={observerRef} style={{ height: '50px' }}>
        {isFetchingNextPage && <Spinner />}
      </div>
    </>
  );
};

export default MobileDisclosureList;
