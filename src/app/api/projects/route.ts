import { NextResponse } from 'next/server';
import getProjects from '../../lib/getProjects';

export async function GET() {
  try {
    const projects = await getProjects();

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
