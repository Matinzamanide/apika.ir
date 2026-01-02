import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const phpRes = await fetch('http://localhost/apitak/admin/admin_login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await phpRes.json();

    if (phpRes.ok && data.success) {
        const cookies = phpRes.headers.get('set-cookie');
        const nextResponse = NextResponse.json(data);
        if (cookies) {
             nextResponse.headers.set('set-cookie', cookies);
        }
        return nextResponse;
    } else {
        return NextResponse.json(data, { status: 401 });
    }
}
