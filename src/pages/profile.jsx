// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';

const Profile = props => {
  const [orders, setOrders] = useState([]);

  // 模拟从本地存储获取订单数据
  useEffect(() => {
    const savedOrders = localStorage.getItem('userOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // 默认订单数据
      setOrders([{
        id: 1,
        eventTitle: '北京大学校园足球赛：计算机学院 vs 经济学院',
        date: '2026-01-15',
        time: '14:30',
        venue: '北京大学东操场',
        ticketCount: 2,
        seats: ['1', '2'],
        totalPrice: 10,
        status: 'completed',
        orderDate: '2026-01-08'
      }]);
    }
  }, []);

  // 监听订单变化并保存到本地存储
  useEffect(() => {
    localStorage.setItem('userOrders', JSON.stringify(orders));
  }, [orders]);
  const currentUser = props.$w.auth.currentUser;
  const getStatusIcon = status => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'pending':
        return '待支付';
      default:
        return '处理中';
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Button variant="ghost" onClick={() => props.$w.utils.navigateTo({
            pageId: 'home',
            params: {}
          })} className="flex items-center text-gray-600">
              返回首页
            </Button>
            <h1 className="text-xl font-bold text-blue-600">个人中心</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 用户信息 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>个人信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {currentUser?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{currentUser?.name || '游客'}</h2>
                <p className="text-gray-600">{currentUser?.nickName || '未设置昵称'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 订单历史 */}
        <Card>
          <CardHeader>
            <CardTitle>我的订单</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? <div className="text-center py-8">
                <p className="text-gray-500 mb-4">暂无订单记录</p>
                <Button onClick={() => props.$w.utils.navigateTo({
              pageId: 'home',
              params: {}
            })} className="bg-blue-600 hover:bg-blue-700">
                  去购票
                </Button>
              </div> : <div className="space-y-4">
                {orders.map(order => <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">{order.eventTitle}</h3>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`text-sm font-medium ${order.status === 'completed' ? 'text-green-600' : order.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <div className="flex items-center mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          {order.date} {order.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {order.venue}
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-1">
                          <span className="font-medium">票数：</span>
                          {order.ticketCount} 张
                        </div>
                        <div>
                          <span className="font-medium">座位：</span>
                          {order.seats.join(', ')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t">
                      <div className="text-sm text-gray-500">
                        下单时间：{order.orderDate}
                      </div>
                      <div className="text-lg font-semibold text-blue-600">
                        ¥{order.totalPrice}
                      </div>
                    </div>
                  </div>)}
              </div>}
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Profile;