"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function RecallRequestPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    productName: "",
    productModel: "",
    serialNumber: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string>("");

  const createRecall = api.recall.create.useMutation({
    onSuccess: (data) => {
      setIsSubmitted(true);
      setSubmittedId(data.id);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRecall.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mb-6 shadow-lg">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">申し込み完了！</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                不良品回収の申し込みを正常に受け付けました。
                <br />
                担当者が確認次第、回収作業を開始いたします。
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50 mb-8">
                <p className="text-sm font-medium text-blue-800 mb-2">申し込み番号</p>
                <p className="font-mono text-xl font-bold text-blue-900 tracking-wide">{submittedId}</p>
                <p className="text-xs text-blue-600 mt-2">
                  この番号で進捗確認が可能です
                </p>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => window.location.href = '/status'}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  進捗を確認する
                </button>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      customerName: "",
                      customerEmail: "",
                      customerPhone: "",
                      customerAddress: "",
                      productName: "",
                      productModel: "",
                      serialNumber: "",
                    });
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  新しい申し込み
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            不良品回収申し込み
          </h1>
          <p className="text-gray-600 text-lg">
            必要事項をご入力いただくだけで、迅速に回収手続きを開始いたします
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Customer Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">お客様情報</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      id="customerName"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="山田太郎"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="customerEmail" className="block text-sm font-semibold text-gray-700">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      id="customerEmail"
                      required
                      value={formData.customerEmail}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="customerPhone" className="block text-sm font-semibold text-gray-700">
                      電話番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      id="customerPhone"
                      required
                      value={formData.customerPhone}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="090-1234-5678"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-1">
                    <label htmlFor="customerAddress" className="block text-sm font-semibold text-gray-700">
                      住所 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="customerAddress"
                      id="customerAddress"
                      required
                      rows={3}
                      value={formData.customerAddress}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      placeholder="〒123-4567&#10;東京都渋谷区..."
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-gray-500 text-sm">製品情報</span>
                </div>
              </div>

              {/* Product Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">製品情報</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="productName" className="block text-sm font-semibold text-gray-700">
                      製品名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      required
                      value={formData.productName}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                      placeholder="スマートフォン XYZ-123"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="productModel" className="block text-sm font-semibold text-gray-700">
                      型番 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="productModel"
                      id="productModel"
                      required
                      value={formData.productModel}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                      placeholder="XYZ-123-ABC"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="serialNumber" className="block text-sm font-semibold text-gray-700">
                    製造番号・シリアル番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="serialNumber"
                    id="serialNumber"
                    required
                    value={formData.serialNumber}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                    placeholder="SN123456789"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={createRecall.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  {createRecall.isPending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>送信中...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>回収を申し込む</span>
                    </div>
                  )}
                </button>
              </div>
              
              {createRecall.error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-800 font-medium">
                      エラーが発生しました: {createRecall.error.message}
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}