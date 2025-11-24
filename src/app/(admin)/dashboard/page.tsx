'use client';

import { trpc } from '@/lib/trpc/client';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  // گرفتن آمار کاربران
  const stats = trpc.getUserStats.useQuery();

  // گرفتن کاربران اخیر
  const users = trpc.getUsers.useQuery();

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-white mb-8">🎯 داشبورد مدیریت</h1>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users Card */}
        <Card className="hover:bg-white/15 transition-colors">
          <CardContent>
            <h3 className="text-sm font-medium text-white/80 mb-3">کل کاربران</h3>
            <p className="text-4xl font-bold text-white">
              {stats.isLoading ? '...' : stats.data?.data?.total || 0}
            </p>
          </CardContent>
        </Card>

        {/* Students Card */}
        <Card className="hover:bg-white/15 transition-colors">
          <CardContent>
            <h3 className="text-sm font-medium text-white/80 mb-3">دانشجویان</h3>
            <p className="text-4xl font-bold text-white">
              {stats.isLoading ? '...' : stats.data?.data?.byRole?.student || 0}
            </p>
          </CardContent>
        </Card>

        {/* Teachers Card */}
        <Card className="hover:bg-white/15 transition-colors">
          <CardContent>
            <h3 className="text-sm font-medium text-white/80 mb-3">اساتید</h3>
            <p className="text-4xl font-bold text-white">
              {stats.isLoading ? '...' : stats.data?.data?.byRole?.teacher || 0}
            </p>
          </CardContent>
        </Card>

        {/* Admins Card */}
        <Card className="hover:bg-white/15 transition-colors">
          <CardContent>
            <h3 className="text-sm font-medium text-white/80 mb-3">مدیران</h3>
            <p className="text-4xl font-bold text-white">
              {stats.isLoading ? '...' : stats.data?.data?.byRole?.admin || 0}
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Recent Users Section */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4 text-white">👥 کاربران اخیر</h2>

          {users.isLoading ? (
            <div className="text-center py-10">
              <p className="text-white/70">⏳ در حال بارگذاری کاربران...</p>
            </div>
          ) : users.error ? (
            <div className="text-center py-10">
              <p className="text-red-400 mb-4">❌ خطا در دریافت کاربران</p>
              <button
                onClick={() => users.refetch()}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-white"
              >
                تلاش مجدد
              </button>
            </div>
          ) : !users.data?.data?.length ? (
            <div className="text-center py-10">
              <p className="text-white/70">📝 هیچ کاربری وجود ندارد</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {users.data.data.slice(0, 10).map((user) => (
                <div
                  key={user._id}
                  className="border border-white/10 rounded-lg p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <strong className="text-base text-white">👤 {user.name}</strong>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          user.role === 'admin'
                            ? 'bg-red-500/30 text-red-200'
                            : user.role === 'teacher'
                            ? 'bg-blue-500/30 text-blue-200'
                            : 'bg-green-500/30 text-green-200'
                        }`}
                      >
                        {user.role === 'student'
                          ? 'دانشجو'
                          : user.role === 'teacher'
                          ? 'استاد'
                          : 'مدیر'}
                      </span>
                    </div>
                    <div className="text-white/70 text-sm">📧 {user.email}</div>
                    <div className="text-white/50 text-xs mt-1">
                      📅 عضویت: {new Date(user.createdAt).toLocaleDateString('fa-IR')}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-yellow-500/30 hover:bg-yellow-500/50 text-yellow-200 rounded text-xs font-medium transition-colors">
                      ✏️ ویرایش
                    </button>
                    <button className="px-3 py-1 bg-red-500/30 hover:bg-red-500/50 text-red-200 rounded text-xs font-medium transition-colors">
                      👁️ مشاهده
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Summary */}
          {stats.data?.data && (
            <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-semibold mb-3 text-white">📊 خلاصه آماری</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white">
                <div>
                  🎯 کل کاربران: <strong>{stats.data.data.total}</strong>
                </div>
                <div>
                  🎓 دانشجویان: <strong>{stats.data.data.byRole.student}</strong>
                </div>
                <div>
                  👨‍🏫 اساتید: <strong>{stats.data.data.byRole.teacher}</strong>
                </div>
                <div>
                  👨‍💼 مدیران: <strong>{stats.data.data.byRole.admin}</strong>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
