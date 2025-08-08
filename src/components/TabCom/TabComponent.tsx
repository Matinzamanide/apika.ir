"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
 interface Tab {
    specifications: Specification[]
    product_features: string[]
  }
  
   interface Specification {
    spec_key: string
    spec_label: string
    spec_value: string
  }
  
interface ITab{
    TabProps:Tab;
}
const TabComponent:React.FC<ITab> = ({TabProps}) => {
      const [activeTab, setActiveTab] = useState('specs');
      const tabs = [
        { key: 'specs', label: 'مشخصات فنی' },
        { key: 'features', label: 'ویژگی‌ها' },
        { key: 'comments', label: 'نظرات کاربران' },
        { key: 'questions', label: 'سوالات کاربران' },
      ];
    
    return ( 
        <div className="max-w-7xl mx-auto mt-16 bg-white rounded-2xl shadow-xl p-6 lg:p-10">
                {/* Tab Buttons */}
                <div className="flex flex-wrap gap-3 border-b-2 border-gray-100 mb-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-5 py-3 text-lg font-semibold transition-all duration-300 ease-in-out border-b-4
                        ${activeTab === tab.key
                          ? 'border-blue-600 text-blue-700 bg-blue-50'
                          : 'border-transparent text-gray-600 hover:text-blue-500 hover:border-gray-200'
                        } rounded-t-lg`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
        
                {/* Tab Content */}
                <div className="text-base text-gray-700">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'specs' && (
                        <table className="w-full text-base border-collapse">
                          <tbody>
                            {TabProps.specifications.map((spec, i) => (
                              <tr key={i} className={`group ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="font-semibold text-gray-600 p-3 w-1/3 border-b border-gray-100">
                                  {spec.spec_label}
                                </td>
                                <td className="p-3 text-gray-800 border-b border-gray-100">{spec.spec_value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
        
                      {activeTab === 'features' && (
                        <ul className="list-none space-y-3 pl-0">
                          {TabProps.product_features.map((f, i) => (
                            <li key={i} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg shadow-sm">
                              <CheckCircle className="text-blue-500 w-5 h-5 mt-1 flex-shrink-0" />
                              <span className="text-gray-800">{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
        
                      {activeTab === 'comments' && (
                        <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
                          <p className="text-lg text-gray-600 font-medium">✨ هنوز هیچ نظری ثبت نشده است. اولین نفر باشید!</p>
                          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            ثبت نظر شما
                          </button>
                        </div>
                      )}
        
                      {activeTab === 'questions' && (
                        <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
                          <p className="text-lg text-gray-600 font-medium">🤔 هیچ سوالی ثبت نشده. شما اولین نفر باشید!</p>
                          <button className="mt-6 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            پرسیدن سوال
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
     );
}
 
export default TabComponent;