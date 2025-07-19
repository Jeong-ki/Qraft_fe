import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Disclosure } from '@/domain/disclosure/types';

dayjs.extend(isBetween);

// 특정 거래소 데이터 로드 및 결합 함수
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

  const categoryMap = new Map(categoryData.map((item: any) => [item.value, item.kor]));

  return disclosureData.map((disclosure: Disclosure) => ({
    ...disclosure,
    categoryName: categoryMap.get(disclosure.details.categoryId[0]) || '미분류',
  }));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const exchange = searchParams.get('exchange') || 'all';
    const keyword = searchParams.get('keyword') || '';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = 10;

    let combinedData: Disclosure[] = [];

    if (exchange === 'shenzhen') {
      combinedData = await loadExchangeData('shenzhen');
    } else if (exchange === 'hongkong') {
      combinedData = await loadExchangeData('hongkong');
    } else {
      const [shenzhenData, hongkongData] = await Promise.all([
        loadExchangeData('shenzhen'),
        loadExchangeData('hongkong'),
      ]);
      combinedData = [...shenzhenData, ...hongkongData];
    }

    combinedData.sort((a, b) => dayjs(b.dataDate).diff(dayjs(a.dataDate)));

    let filteredData = combinedData;

    // 조건 필터링
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
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      filteredData = filteredData.filter((item) =>
        dayjs(item.dataDate).isBetween(start, end, null, '[]'),
      );
    }

    // 페이지네이션
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
