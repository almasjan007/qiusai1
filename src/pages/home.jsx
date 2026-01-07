// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Calendar, MapPin, Users, Clock, TrendingUp, Star, Upload } from 'lucide-react';

// @ts-ignore;
import { Navbar } from '@/components/Navbar';
// @ts-ignore;
import { EventCard } from '@/components/EventCard';
// @ts-ignore;
import { SearchFilter } from '@/components/SearchFilter';
const Home = props => {
  const [events, setEvents] = useState([{
    id: 1,
    title: '北京大学校园足球赛：计算机学院 vs 经济学院',
    date: '2026-01-15',
    time: '14:00',
    venue: '北京大学东操场',
    price: 20,
    availableSeats: 200,
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=250&fit=crop',
    type: 'football',
    isHot: true,
    rating: 4.8
  }, {
    id: 2,
    title: '北京市中学生篮球联赛：四中 vs 人大附中',
    date: '2026-01-20',
    time: '16:00',
    venue: '北京四中体育馆',
    price: 15,
    availableSeats: 150,
    image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=400&h=250&fit=crop',
    type: 'basketball',
    isHot: false,
    rating: 4.6
  }, {
    id: 3,
    title: '社区足球友谊赛：朝阳社区 vs 海淀社区',
    date: '2026-01-25',
    time: '15:30',
    venue: '朝阳公园足球场',
    price: 10,
    availableSeats: 100,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop',
    type: 'football',
    isHot: true,
    rating: 4.9
  }, {
    id: 4,
    title: '小学篮球邀请赛：实验小学 vs 育才小学',
    date: '2026-01-18',
    time: '14:30',
    venue: '实验小学体育馆',
    price: 5,
    availableSeats: 80,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop',
    type: 'basketball',
    isHot: true,
    rating: 4.7
  }, {
    id: 5,
    title: '校园乒乓球比赛：清华附中 vs 北大附中',
    date: '2026-01-22',
    time: '13:00',
    venue: '清华附中体育馆',
    price: 8,
    availableSeats: 60,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
    type: 'table_tennis',
    isHot: false,
    rating: 4.5
  }, {
    id: 6,
    title: '社区羽毛球友谊赛：青年队 vs 中年队',
    date: '2026-01-28',
    time: '09:00',
    venue: '社区活动中心',
    price: 12,
    availableSeats: 50,
    image: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=400&h=250&fit=crop',
    type: 'badminton',
    isHot: true,
    rating: 4.9
  }]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const handleBookTicket = eventId => {
    props.$w.utils.navigateTo({
      pageId: 'booking',
      params: {
        eventId
      }
    });
  };
  const handleSearch = term => {
    setSearchTerm(term);
    filterEvents(term, filterType);
  };
  const handleFilter = type => {
    setFilterType(type);
    filterEvents(searchTerm, type);
  };
  const filterEvents = (term, type) => {
    let filtered = events;
    if (term) {
      filtered = filtered.filter(event => event.title.toLowerCase().includes(term.toLowerCase()) || event.venue.toLowerCase().includes(term.toLowerCase()));
    }
    if (type !== 'all') {
      filtered = filtered.filter(event => event.type === type);
    }
    setFilteredEvents(filtered);
  };
  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 导航栏 */}
      <Navbar {...props} />

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 英雄区域 */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl -z-10"></div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4 font-playfair tracking-tight">
            校园与社区球赛
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            发现身边的精彩赛事，支持校园体育和社区活动发展
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <Button onClick={() => props.$w.utils.navigateTo({
            pageId: 'createEvent',
            params: {}
          })} className="bg-green-600 hover:bg-green-700 text-white">
              <Upload className="w-4 h-4 mr-2" />
              发布我的赛事
            </Button>
          </div>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              <span>实时更新</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              <span>精选赛事</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-blue-500" />
              <span>安全购票</span>
            </div>
          </div>
        </div>

        {/* 搜索筛选 */}
        <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

        {/* 赛事列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => <EventCard key={event.id} event={event} onBookTicket={handleBookTicket} />)}
        </div>

        {/* 空状态 */}
        {filteredEvents.length === 0 && <div className="text-center py-16">
            <div className="text-6xl mb-4">🏀</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">暂无相关赛事</h3>
            <p className="text-gray-500 mb-6">请尝试调整搜索条件或筛选类型</p>
            <Button onClick={() => {
          setSearchTerm('');
          setFilterType('all');
          setFilteredEvents(events);
        }} className="bg-blue-600 hover:bg-blue-700">
              重置筛选
            </Button>
          </div>}
      </div>
    </div>;
};
export default Home;