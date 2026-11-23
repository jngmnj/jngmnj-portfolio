import { NextRequest, NextResponse } from 'next/server';
import getProjects from '@/app/lib/getProjects';
import { searchProjects } from '@/utils/projectSearch';

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const locale = params.get('lang') === 'en' ? 'en' : 'ko';
    const result = searchProjects(await getProjects(), params, locale);
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to search projects' },
      { status: 500 }
    );
  }
}
