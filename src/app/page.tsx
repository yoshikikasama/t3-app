import Link from "next/link";

import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
	const session = await auth();

	return (
		<HydrateClient>
			<main className="min-h-screen bg-gray-50">
				{/* Navigation */}
				<nav className="bg-white shadow-sm border-b">
					<div className="max-w-7xl mx-auto px-4">
						<div className="flex justify-between items-center h-16">
							<div className="flex items-center space-x-8">
								<Link href="/" className="text-xl font-bold text-gray-900">
									不良品回収システム
								</Link>
								<div className="hidden md:flex space-x-6">
									<Link href="/recall" className="text-gray-600 hover:text-gray-900">
										回収申し込み
									</Link>
									<Link href="/status" className="text-gray-600 hover:text-gray-900">
										状況確認
									</Link>
									{session && (
										<Link href="/admin" className="text-gray-600 hover:text-gray-900">
											管理画面
										</Link>
									)}
								</div>
							</div>
							<div className="flex items-center space-x-4">
								{session ? (
									<div className="flex items-center space-x-4">
										<span className="text-sm text-gray-600">
											{session.user?.name || session.user?.email}
										</span>
										<Link
											href="/api/auth/signout"
											className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
										>
											ログアウト
										</Link>
									</div>
								) : (
									<Link
										href="/api/auth/signin"
										className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
									>
										ログイン
									</Link>
								)}
							</div>
						</div>
					</div>
				</nav>

				{/* Hero Section */}
				<div className="bg-white">
					<div className="max-w-7xl mx-auto py-16 px-4">
						<div className="text-center">
							<h1 className="text-4xl font-bold text-gray-900 mb-6">
								不良品回収システム
							</h1>
							<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
								製品の不具合による回収申し込みから状況確認まで、
								簡単で安全なオンライン手続きをご提供します。
							</p>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
								<Link
									href="/recall"
									className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors"
								>
									<div className="text-center">
										<div className="text-3xl mb-4">📝</div>
										<h3 className="text-xl font-semibold mb-2">回収申し込み</h3>
										<p className="text-blue-100">
											不良品の回収を申し込む
										</p>
									</div>
								</Link>

								<Link
									href="/status"
									className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors"
								>
									<div className="text-center">
										<div className="text-3xl mb-4">🔍</div>
										<h3 className="text-xl font-semibold mb-2">状況確認</h3>
										<p className="text-green-100">
											申し込み状況を確認する
										</p>
									</div>
								</Link>

								{session && (
									<Link
										href="/admin"
										className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors"
									>
										<div className="text-center">
											<div className="text-3xl mb-4">⚙️</div>
											<h3 className="text-xl font-semibold mb-2">管理画面</h3>
											<p className="text-purple-100">
												申し込みを管理する
											</p>
										</div>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Features Section */}
				<div className="bg-gray-50 py-16">
					<div className="max-w-7xl mx-auto px-4">
						<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
							簡単3ステップ
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl font-bold text-blue-600">1</span>
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">申し込み</h3>
								<p className="text-gray-600">
									お客様情報と製品情報を入力して申し込み
								</p>
							</div>
							<div className="text-center">
								<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl font-bold text-green-600">2</span>
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">確認</h3>
								<p className="text-gray-600">
									申し込み番号で進捗状況をいつでも確認
								</p>
							</div>
							<div className="text-center">
								<div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl font-bold text-purple-600">3</span>
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">回収</h3>
								<p className="text-gray-600">
									担当者が対象製品を安全に回収
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</HydrateClient>
	);
}
