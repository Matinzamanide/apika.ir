// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await fetch('/api/admin/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         router.push('/admin/dashboard');
//       } else {
//         setError(data.error || 'ورود ناموفق. لطفاً نام کاربری یا رمز عبور را بررسی کنید.');
//       }
//     } catch (err) {
//       setError('یک خطای غیرمنتظره رخ داد. لطفا دوباره تلاش کنید.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">ورود مدیر</h2>
//         {error && <p className="text-red-600 text-sm mb-4 bg-red-100 p-2 rounded-lg text-center">{error}</p>}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="نام کاربری"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//           />
//         </div>
//         <div className="mb-6">
//           <input
//             type="password"
//             placeholder="رمز عبور"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg"
//         >
//           ورود
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://apika.ir/apitak/admin/admin_login.php', {
        method: 'POST',
        credentials: 'include', // حتما برای سشن
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/dashboard'); // هدایت به داشبورد
      } else {
        setError(data.error || 'نام کاربری یا رمز عبور اشتباه است.');
      }
    } catch (err) {
      console.error(err);
      setError('خطا در اتصال به سرور.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">ورود ادمین</h1>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>
    </div>
  );
};

export default Login;

