"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const [statusFilter, setStatusFilter] = useState<"PENDING" | "IN_PROGRESS" | "COMPLETED" | undefined>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: recallRequests, isLoading, refetch } = api.recall.getAll.useQuery(
    { status: statusFilter },
    { 
      enabled: mounted && status === "authenticated",
      retry: false 
    }
  );

  const updateStatus = api.recall.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">ログインが必要です</h1>
          <p className="text-gray-600 mb-6">管理者ページにアクセスするにはログインしてください。</p>
          <button
            onClick={() => window.location.href = "/api/auth/signin"}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            ログイン
          </button>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = (id: string, newStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED") => {
    updateStatus.mutate({ id, status: newStatus });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING": return "受付中";
      case "IN_PROGRESS": return "回収中";
      case "COMPLETED": return "完了";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">管理者ダッシュボード</h1>
            <p className="text-sm text-gray-600 mt-1">不良品回収申し込みの管理</p>
          </div>

          <div className="p-6">
            {/* Filter Controls */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">ステータスで絞り込み</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter(undefined)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    statusFilter === undefined
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  全て
                </button>
                <button
                  onClick={() => setStatusFilter("PENDING")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    statusFilter === "PENDING"
                      ? "bg-yellow-600 text-white"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }`}
                >
                  受付中
                </button>
                <button
                  onClick={() => setStatusFilter("IN_PROGRESS")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    statusFilter === "IN_PROGRESS"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                >
                  回収中
                </button>
                <button
                  onClick={() => setStatusFilter("COMPLETED")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    statusFilter === "COMPLETED"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  完了
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">読み込み中...</p>
              </div>
            )}

            {/* Error State */}
            {!isLoading && !recallRequests && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800">データの取得に失敗しました。管理者権限がない可能性があります。</p>
              </div>
            )}

            {/* Table */}
            {recallRequests && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        申し込み番号
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        お客様名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        製品情報
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        連絡先
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ステータス
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        申し込み日時
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recallRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                          {request.id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.customerName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                            <p className="font-medium">{request.productName}</p>
                            <p className="text-gray-500">型番: {request.productModel}</p>
                            <p className="text-gray-500">S/N: {request.serialNumber}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                            <p>{request.customerEmail}</p>
                            <p className="text-gray-500">{request.customerPhone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(request.status)}`}>
                            {getStatusText(request.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString('ja-JP')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <select
                            value={request.status}
                            onChange={(e) => handleStatusUpdate(request.id, e.target.value as any)}
                            disabled={updateStatus.isPending}
                            className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="PENDING">受付中</option>
                            <option value="IN_PROGRESS">回収中</option>
                            <option value="COMPLETED">完了</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {recallRequests.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    該当する申し込みがありません。
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}