// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Input } from '@/components/ui';
// @ts-ignore;
import { Search, Filter } from 'lucide-react';

export const SearchFilter = ({
  onSearch,
  onFilter
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const handleSearch = value => {
    setSearchTerm(value);
    onSearch(value);
  };
  const handleTypeChange = type => {
    setSelectedType(type);
    onFilter(type);
  };
  return <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* 搜索框 */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input type="text" placeholder="搜索赛事名称、球队或地点..." value={searchTerm} onChange={e => handleSearch(e.target.value)} className="pl-10 pr-4 py-2 w-full" />
        </div>

        {/* 筛选器 */}
        <div className="flex items-center space-x-4">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex space-x-2">
            <button onClick={() => handleTypeChange('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              全部
            </button>
            <button onClick={() => handleTypeChange('football')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'football' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              足球
            </button>
            <button onClick={() => handleTypeChange('basketball')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'basketball' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              篮球
            </button>
            <button onClick={() => handleTypeChange('table_tennis')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'table_tennis' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              乒乓球
            </button>
          </div>
        </div>
      </div>
    </div>;
};