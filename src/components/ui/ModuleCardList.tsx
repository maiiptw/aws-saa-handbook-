import React, { useEffect, useState } from 'react';

interface ModuleData {
  slug: string;
  lang: string;
  moduleNumber: number;
  title: string;
  description: string;
  tags: string[];
}

interface Props {
  modules: ModuleData[];
  lang: string;
  isEn: boolean;
}

export default function ModuleCardList({ modules, lang, isEn }: Props) {
  const [progressData, setProgressData] = useState<Record<string, number>>({});
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem('aws-saa-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgressData(parsed);

        // Count how many modules are at 100%
        let count = 0;
        modules.forEach(mod => {
          if (parsed[mod.slug] === 100) count++;
        });
        setCompletedCount(count);
      } catch (e) {
        console.error("Failed to parse progress from localStorage", e);
      }
    }
  }, [modules]);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">{isEn ? 'Course Modules' : 'เนื้อหาบทเรียน'}</h2>
        <div className="text-sm font-medium text-gray-500">
          <span className="text-aws-orange font-bold">{completedCount}</span> / {modules.length} {isEn ? 'completed' : 'เรียนจบแล้ว'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => {
          const progressPercent = progressData[mod.slug] || 0;
          const isComplete = progressPercent === 100;

          return (
            <a key={mod.slug} href={`/${lang}/modules/${mod.slug}`} className="group flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-aws-orange dark:hover:border-aws-orange transition-all shadow-sm hover:shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-aws-light-blue dark:bg-blue-900/30 text-aws-blue dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                  {mod.moduleNumber}
                </span>
                {isComplete && (
                  <span className="text-green-500 bg-green-50 dark:bg-green-900/20 p-1 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-aws-orange transition-colors">{mod.title}</h3>
              <p className="text-gray-500 text-sm flex-grow mb-4">{mod.description}</p>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {mod.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-1">
                  <div className={`h-1.5 rounded-full ${isComplete ? 'bg-green-500' : 'bg-aws-orange'}`} style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className="text-right text-xs text-gray-400">{progressPercent}%</div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
