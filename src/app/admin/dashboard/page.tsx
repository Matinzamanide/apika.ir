'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// یک نوع سفارش ساده برای مطابقت با ساختار داده از API
interface Order {
    id: number;
    customer_name: string;
    order_date: string;
    status: string;
    // فیلدهای دیگر از داده‌های سفارش شما را در صورت نیاز اضافه کنید
}

// کامپوننت آیتم سفارش
const OrderItem: React.FC<{ order: Order }> = ({ order }) => (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-2">
        <div className="flex-1">
            <h3 className="font-semibold text-lg">{order.customer_name}</h3>
            <p className="text-sm text-gray-500">شناسه سفارش: #{order.id}</p>
        </div>
        <div className="text-right">
            <p className="text-sm text-gray-700">وضعیت: {order.status}</p>
            <p className="text-xs text-gray-400">تاریخ: {new Date(order.order_date).toLocaleDateString('fa-IR')}</p>
        </div>
    </div>
);


const DashboardPage = () => {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // واکشی از مسیر API Next.js که درخواست و کوکی‌ها را به بک‌اند PHP ارسال می‌کند
                const res = await fetch('/api/orders/get', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!res.ok) {
                    // اگر پاسخ OK نباشد، به احتمال زیاد سشن نامعتبر است
                    router.push('/admin/login');
                    return;
                }

                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError('دریافت سفارشات با خطا مواجه شد.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [router]);

    // مدیریت وضعیت‌های بارگیری و خطا برای تجربه کاربری بهتر
    if (loading) {
        return <div className="p-6 text-center">در حال بارگیری سفارشات...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600">{error}</div>;
    }

    // دکمه خروج یک ایده خوب برای داشبورد است
    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800">داشبورد مدیر</h1>
                <button
                    onClick={handleLogout}
                    className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
                >
                    خروج
                </button>
            </header>
            <p className="text-lg text-gray-600 mb-6">شما با موفقیت وارد شدید!</p>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">سفارشات اخیر</h2>
            {orders && orders.length > 0 ? (
                <div>
                    {orders.map((order) => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 p-8 border border-gray-200 rounded-lg">هیچ سفارشی یافت نشد.</div>
            )}
        </div>
    );
};

export default DashboardPage;
