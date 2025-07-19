import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Disclosure } from '@/domain/disclosure/types';

dayjs.extend(isBetween);

/**
 * 특정 거래소의 공시 데이터와 카테고리 데이터를 로드하여 결합
 * 공시 데이터와 카테고리 데이터를 별도 파일로 관리하여 정규화된 구조 유지
 *
 * @param exchange - 로드할 거래소 ('shenzhen' | 'hongkong')
 * @returns 카테고리 정보가 결합된 공시 데이터 배열
 */
async function loadExchangeData(exchange: 'shenzhen' | 'hongkong') {
  const dataDirectory = path.join(process.cwd(), 'public', 'data');
  const filePrefix = exchange === 'shenzhen' ? '심천' : '홍콩';

  const disclosureFile = await fs.readFile(
    path.join(dataDirectory, `${filePrefix}_공시_데이터.json`),
    'utf-8',
  );
  const categoryFile = await fs.readFile(
    path.join(dataDirectory, `${filePrefix}_카테고리_데이터.json`),
    'utf-8',
  );

  const disclosureData = JSON.parse(disclosureFile).data.getDisclosure;
  const categoryData = JSON.parse(categoryFile);

  // 카테고리 ID를 한국어 이름으로 매핑하기 위한 Map 생성
  const categoryMap = new Map(categoryData.map((item: any) => [item.value, item.kor]));

  return disclosureData.map((disclosure: Disclosure) => ({
    ...disclosure,
    categoryName: categoryMap.get(disclosure.details.categoryId[0]) || '미분류',
  }));
}

/**
 * 공시 데이터 조회 API
 * 거래소별 필터링, 키워드 검색, 기간 필터링, 페이지네이션
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const exchange = searchParams.get('exchange') || 'all';
    const keyword = searchParams.get('keyword') || '';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = 10; // 페이지당 아이템 수

    let combinedData: Disclosure[] = [];

    if (exchange === 'shenzhen') {
      combinedData = await loadExchangeData('shenzhen');
    } else if (exchange === 'hongkong') {
      combinedData = await loadExchangeData('hongkong');
    } else {
      // 전체 거래소 선택 시 두 거래소 데이터를 병렬로 로드
      const [shenzhenData, hongkongData] = await Promise.all([
        loadExchangeData('shenzhen'),
        loadExchangeData('hongkong'),
      ]);
      combinedData = [...shenzhenData, ...hongkongData];
    }

    // 최신 순으로 정렬
    combinedData.sort((a, b) => dayjs(b.dataDate).diff(dayjs(a.dataDate)));

    let filteredData = combinedData;

    // 키워드 검색 필터링 - 제목과 본문에서 대소문자 구분 없이 검색
    if (keyword) {
      filteredData = filteredData.filter((item) => {
        const keywordLower = keyword.toLowerCase();
        const titleMatch = item.analysisDetails.summarizeTinyKor
          .toLowerCase()
          .includes(keywordLower);
        const bodyMatch = item.analysisDetails.summarizeLongKor
          .toLowerCase()
          .includes(keywordLower);
        return titleMatch || bodyMatch;
      });
    }

    // 기간 필터링 - 시작일과 종료일 모두 포함하는 범위
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      filteredData = filteredData.filter(
        (item) => dayjs(item.dataDate).isBetween(start, end, null, '[]'), // '[]'는 경계값 포함
      );
    }

    // 무한 스크롤 페이지네이션 처리
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      data: paginatedData,
      nextPage: page < totalPages ? page + 1 : null,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: '데이터를 불러오는 데 실패했습니다.' }, { status: 500 });
  }
}
