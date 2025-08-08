import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const phpRes = await fetch('http://localhost/apitak/orders/submit_order.php', {
        method: 'GET',
        headers: req.headers,
    });

    const data = await phpRes.json();
    return NextResponse.json(data, { status: phpRes.status });
}
