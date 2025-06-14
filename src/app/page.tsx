import Link from "next/link";

import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
	const session = await auth();

	return (
		<HydrateClient>
			<main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
				{/* Navigation */}
				<nav className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
					<div className="max-w-7xl mx-auto px-4">
						<div className="flex justify-between items-center h-20">
							<div className="flex items-center space-x-8">
								<Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									RecallHub
								</Link>
								<div className="hidden md:flex space-x-8">
									<Link href="/recall" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 flex items-center gap-2">
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
										回収申し込み
									</Link>
									<Link href="/status" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 flex items-center gap-2">
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
										</svg>
										状況確認
									</Link>
									{session && (
										<Link href="/admin" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 flex items-center gap-2">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
											管理画面
										</Link>
									)}
								</div>
							</div>
							<div className="flex items-center space-x-4">
								{session ? (
									<div className="flex items-center space-x-4">
										<div className="flex items-center space-x-3">
											<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
												<span className="text-white text-sm font-semibold">
													{(session.user?.name || session.user?.email)?.charAt(0).toUpperCase()}
												</span>
											</div>
											<span className="text-sm font-medium text-gray-700">
												{session.user?.name || session.user?.email}
											</span>
										</div>
										<Link
											href="/api/auth/signout"
											className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
										>
											ログアウト
										</Link>
									</div>
								) : (
									<Link
										href="/api/auth/signin"
										className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
									>
										ログイン
									</Link>
								)}
							</div>
						</div>
					</div>
				</nav>

				{/* Hero Section */}
				<div className="relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
					<div className="relative max-w-7xl mx-auto py-24 px-4">
						<div className="text-center">
							<div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-8">
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
								安全・迅速・確実
							</div>
							<h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-8 leading-tight">
								スマート不良品
								<br />
								回収システム
							</h1>
							<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
								AIとクラウドテクノロジーを活用した次世代の製品回収プラットフォーム。
								<br />
								シームレスな申請から追跡まで、すべてがワンストップで完結。
							</p>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
								<Link
									href="/recall"
									className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl hover:from-blue-600 hover:to-blue-700 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
									<div className="relative text-center text-white">
										<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500">
											<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
											</svg>
										</div>
										<h3 className="text-xl font-bold mb-3">回収申し込み</h3>
										<p className="text-blue-100">
											製品情報を入力するだけで
											<br />
											即座に回収手続き開始
										</p>
									</div>
								</Link>

								<Link
									href="/status"
									className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl hover:from-green-600 hover:to-emerald-700 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
									<div className="relative text-center text-white">
										<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500">
											<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
											</svg>
										</div>
										<h3 className="text-xl font-bold mb-3">リアルタイム追跡</h3>
										<p className="text-green-100">
											申し込み状況を
											<br />
											24時間いつでも確認
										</p>
									</div>
								</Link>

								{session && (
									<Link
										href="/admin"
										className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-3xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
										<div className="relative text-center text-white">
											<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500">
												<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
												</svg>
											</div>
											<h3 className="text-xl font-bold mb-3">管理ダッシュボード</h3>
											<p className="text-purple-100">
												全申し込みを一元管理
												<br />
												効率的な運用を実現
											</p>
										</div>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Features Section */}
				<div className="py-24 bg-white/50 backdrop-blur-sm">
					<div className="max-w-7xl mx-auto px-4">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-900 mb-4">
								なぜRecallHubが選ばれるのか
							</h2>
							<p className="text-xl text-gray-600 max-w-2xl mx-auto">
								従来の紙ベースやメールでの手続きから、デジタルファーストの体験へ
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
							<div className="group text-center">
								<div className="relative">
									<div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
										<span className="text-3xl font-bold text-white">1</span>
									</div>
									<div className="absolute -inset-2 bg-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">ワンクリック申し込み</h3>
								<p className="text-gray-600 leading-relaxed">
									複雑な書類は不要。必要事項を入力するだけで、
									申し込み完了まで3分以内。
								</p>
							</div>
							<div className="group text-center">
								<div className="relative">
									<div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
										<span className="text-3xl font-bold text-white">2</span>
									</div>
									<div className="absolute -inset-2 bg-green-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">透明性の高い追跡</h3>
								<p className="text-gray-600 leading-relaxed">
									申し込み状況がリアルタイムで更新。
									どの段階にあるかが一目で分かります。
								</p>
							</div>
							<div className="group text-center">
								<div className="relative">
									<div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
										<span className="text-3xl font-bold text-white">3</span>
									</div>
									<div className="absolute -inset-2 bg-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">安全な回収</h3>
								<p className="text-gray-600 leading-relaxed">
									訓練された専門スタッフが、
									お客様の都合に合わせて安全に回収。
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* CTA Section */}
				<div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
					<div className="max-w-4xl mx-auto text-center px-4">
						<h2 className="text-3xl font-bold text-white mb-4">
							今すぐ始めましょう
						</h2>
						<p className="text-xl text-blue-100 mb-8">
							製品に不具合が見つかった場合は、迅速な対応が重要です
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="/recall"
								className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
							>
								回収を申し込む
							</Link>
							<Link
								href="/status"
								className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 border-2 border-blue-400"
							>
								状況を確認する
							</Link>
						</div>
					</div>
				</div>
			</main>
		</HydrateClient>
	);
}
