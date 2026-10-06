import React, { useState } from 'react';

type CheatsheetData = {
  id: string;
  module: string;
  topic: string;
  trap_th: string;
  trap_en: string;
  decision_th: string;
  decision_en: string;
};

export default function CheatsheetSearch({ data, lang }: { data: CheatsheetData[], lang: string }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    const trap = lang === 'en' ? item.trap_en : item.trap_th;
    const decision = lang === 'en' ? item.decision_en : item.decision_th;

    return (
      item.module.toLowerCase().includes(searchLower) ||
      item.topic.toLowerCase().includes(searchLower) ||
      trap.toLowerCase().includes(searchLower) ||
      decision.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full">
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder={lang === 'en' ? "Search for topics, traps, or keywords..." : "ค้นหาหัวข้อ, จุดหลอก หรือคีย์เวิร์ด..."}
          className="w-full p-4 pl-12 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-aws-orange outline-none transition-shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className="w-6 h-6 absolute left-4 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="w-full text-left border-collapse bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <th className="p-4 font-semibold w-1/4">Module / Topic</th>
              <th className="p-4 font-semibold w-2/4 text-red-600 dark:text-red-400">{lang === 'en' ? 'Exam Trap' : 'จุดหลอกสอบ'}</th>
              <th className="p-4 font-semibold w-1/4 text-green-600 dark:text-green-400">{lang === 'en' ? 'Decision Matrix' : 'คีย์เวิร์ดที่ถูก'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 bg-aws-light-blue dark:bg-blue-900/30 text-aws-blue dark:text-blue-300 text-xs rounded mb-1">{item.module}</span>
                    <div className="font-medium">{item.topic}</div>
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {lang === 'en' ? item.trap_en : item.trap_th}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">
                    {lang === 'en' ? item.decision_en : item.decision_th}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">
                  {lang === 'en' ? 'No results found.' : 'ไม่พบข้อมูลที่ค้นหา'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
