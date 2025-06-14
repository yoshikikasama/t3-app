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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">申し込み完了</h3>
            <p className="mt-1 text-sm text-gray-500">
              不良品回収の申し込みを受け付けました。
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-700">申し込み番号</p>
              <p className="font-mono text-lg font-semibold text-gray-900">{submittedId}</p>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              この番号で進捗を確認できます
            </p>
            <div className="mt-6">
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
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                新しい申し込み
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">不良品回収申し込み</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">お客様情報</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                    お名前 *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    id="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">
                    メールアドレス *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    id="customerEmail"
                    required
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">
                    電話番号 *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    id="customerPhone"
                    required
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">
                    住所 *
                  </label>
                  <textarea
                    name="customerAddress"
                    id="customerAddress"
                    required
                    rows={3}
                    value={formData.customerAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">製品情報</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                    製品名 *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    required
                    value={formData.productName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="productModel" className="block text-sm font-medium text-gray-700">
                    型番 *
                  </label>
                  <input
                    type="text"
                    name="productModel"
                    id="productModel"
                    required
                    value={formData.productModel}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
                    製造番号 *
                  </label>
                  <input
                    type="text"
                    name="serialNumber"
                    id="serialNumber"
                    required
                    value={formData.serialNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={createRecall.isPending}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {createRecall.isPending ? "送信中..." : "申し込む"}
              </button>
            </div>
            
            {createRecall.error && (
              <div className="text-red-600 text-sm mt-2">
                エラーが発生しました: {createRecall.error.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}