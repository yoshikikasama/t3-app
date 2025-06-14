"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function StatusCheckPage() {
  const [requestId, setRequestId] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);

  const { data: recallRequest, isLoading, error, refetch } = api.recall.getById.useQuery(
    { id: requestId },
    { enabled: false }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestId.trim()) {
      setSearchAttempted(true);
      refetch();
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          text: "受付中",
          color: "text-yellow-600 bg-yellow-50",
          description: "申し込みを受け付けました。担当者が確認中です。"
        };
      case "IN_PROGRESS":
        return {
          text: "回収中",
          color: "text-blue-600 bg-blue-50",
          description: "回収作業を進めています。"
        };
      case "COMPLETED":
        return {
          text: "完了",
          color: "text-green-600 bg-green-50",
          description: "回収が完了しました。"
        };
      default:
        return {
          text: status,
          color: "text-gray-600 bg-gray-50",
          description: ""
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">回収状況確認</h1>
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div>
              <label htmlFor="requestId" className="block text-sm font-medium text-gray-700 mb-2">
                申し込み番号
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="requestId"
                  id="requestId"
                  value={requestId}
                  onChange={(e) => setRequestId(e.target.value)}
                  placeholder="例: clxxxxxxxxxxxxxx"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={isLoading || !requestId.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "検索中..." : "検索"}
                </button>
              </div>
            </div>
          </form>

          {/* Search Results */}
          {searchAttempted && (
            <div>
              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">検索中...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">エラーが発生しました: {error.message}</p>
                </div>
              )}

              {!isLoading && !error && !recallRequest && (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <p className="text-gray-800">該当する申し込みが見つかりませんでした。</p>
                  <p className="text-sm text-gray-600 mt-1">申し込み番号をご確認ください。</p>
                </div>
              )}

              {recallRequest && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">申し込み詳細</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">申し込み番号</label>
                      <p className="font-mono text-sm text-gray-900">{recallRequest.id}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">お客様名</label>
                      <p className="text-sm text-gray-900">{recallRequest.customerName}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">製品情報</label>
                      <p className="text-sm text-gray-900">
                        {recallRequest.productName} ({recallRequest.productModel})
                      </p>
                      <p className="text-xs text-gray-600">製造番号: {recallRequest.serialNumber}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">現在の状況</label>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusDisplay(recallRequest.status).color}`}>
                          {getStatusDisplay(recallRequest.status).text}
                        </span>
                        {getStatusDisplay(recallRequest.status).description && (
                          <p className="text-sm text-gray-600 mt-2">
                            {getStatusDisplay(recallRequest.status).description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">申し込み日時</label>
                        <p className="text-sm text-gray-900">
                          {new Date(recallRequest.createdAt).toLocaleString('ja-JP')}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">最終更新</label>
                        <p className="text-sm text-gray-900">
                          {new Date(recallRequest.updatedAt).toLocaleString('ja-JP')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}