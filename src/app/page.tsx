import EssayForm from '@/components/essay/EssayForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🇩🇪 德语作文自动批改系统
          </h1>
          <p className="text-lg text-gray-600">
            上传你的德语作文，AI老师为你专业批改
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <EssayForm />
        </div>
      </div>
    </main>
  );
}
