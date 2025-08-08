import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const response = NextResponse.json({ success: true });
    // پاک کردن کوکی سشن برای خروج کاربر
    response.cookies.set('PHPSESSID', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0), // تاریخ انقضا را به گذشته تنظیم می‌کند
    });
    return response;
}