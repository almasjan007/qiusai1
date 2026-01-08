// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { Calendar, MapPin, Users, Download, Share2, QrCode } from 'lucide-react';

const Ticket = props => {
  // 从路由参数获取票务信息
  const params = props.$w.page.dataset.params;
  const eventId = params.eventId;
  const ticketCount = parseInt(params.ticketCount) || 1;
  const seats = params.seats ? params.seats.split(',') : [];

  // 模拟赛事数据
  const event = {
    id: parseInt(eventId) || 1,
    title: '北京大学校园足球赛：计算机学院 vs 经济学院',
    date: '2026-01-15',
    time: '14:30',
    venue: '北京大学东操场',
    price: 5,
    availableSeats: 45
  };

  // 生成电子票号
  const generateTicketNumber = () => {
    return `TKT${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  // 模拟用户信息
  const user = props.$w.auth.currentUser || {
    name: '访客用户',
    nickName: '访客'
  };
  const handleDownload = () => {
    // 模拟下载功能
    alert('电子票下载功能即将实现');
  };
  const handleShare = () => {
    // 模拟分享功能
    alert('分享功能即将实现');
  };
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* 电子票卡片 */}
        <Card className="shadow-2xl border-0 overflow-hidden">
          {/* 票头 */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-6 px-6 text-center">
            <h1 className="text-2xl font-bold mb-2">电子门票</h1>
            <p className="text-green-100">请出示此票入场</p>
          </div>
          
          <CardContent className="p-0">
            {/* 票号区域 */}
            <div className="bg-gray-50 py-4 px-6 border-b">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">票号：</span>
                <span className="font-mono font-bold text-blue-600">{generateTicketNumber()}</span>
              </div>
            </div>
            
            {/* 赛事信息 */}
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h2>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{event.date} {event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>座位：{seats.join(', ')}</span>
                  </div>
                </div>
              </div>
              
              {/* 用户信息 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">持票人信息</h3>
                <p className="text-gray-700">{user.nickName || user.name}</p>
                <p className="text-sm text-gray-500">票数：{ticketCount} 张</p>
              </div>
              
              {/* QR码区域 */}
              <div className="text-center py-4 border-t">
                <div className="inline-block p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg">
                  <QrCode className="w-24 h-24 text-gray-400 mx-auto" />
                  <p className="text-xs text-gray-500 mt-2">扫描二维码验票</p>
                </div>
              </div>
            </div>
            
            {/* 票脚 */}
            <div className="bg-gray-100 py-3 px-6 border-t">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>总价：¥{event.price * ticketCount}</span>
                <span>状态：已支付</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 操作按钮 */}
        <div className="flex space-x-4 mt-6">
          <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            下载电子票
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            分享票务
          </Button>
        </div>
        
        {/* 返回首页 */}
        <Button className="w-full mt-4 bg-gray-600 hover:bg-gray-700" onClick={() => props.$w.utils.navigateTo({
        pageId: 'home',
        params: {}
      })}>
          返回首页
        </Button>
        
        {/* 使用说明 */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">使用说明</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 请妥善保管电子票，勿泄露二维码</li>
            <li>• 入场时请出示此电子票或二维码</li>
            <li>• 每张票仅限一人使用</li>
            <li>• 如有问题请联系客服</li>
          </ul>
        </div>
      </div>
    </div>;
};
export default Ticket;