// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Tabs, TabsContent, TabsList, TabsTrigger, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar, MapPin, CheckCircle, Clock, Ticket, Users, Package, Edit, Eye, Check, X, BarChart3, LogOut } from 'lucide-react';

const Profile = props => {
  const [orders, setOrders] = useState([]);
  const [events, setEvents] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [activeTab, setActiveTab] = useState('personal');
  const {
    toast
  } = useToast();

  // 获取当前用户信息
  const currentUser = props.$w.auth.currentUser;

  // 模拟用户角色（实际应用中应从用户信息获取）
  const userRole = currentUser?.type === 'administrator' ? 'organizer' : currentUser?.type === 'organizer' ? 'organizer' : 'user';

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

    // 模拟获取赛事数据
    setEvents([{
      _id: '1',
      title: '北京大学校园足球赛：计算机学院 vs 经济学院',
      date: '2026-01-15',
      time: '14:00',
      venue: '北京大学东操场',
      price: 20,
      totalSeats: 200,
      availableSeats: 198,
      status: 'active',
      approvalStatus: 'approved'
    }, {
      _id: '2',
      title: '北京市中学生篮球联赛：四中 vs 人大附中',
      date: '2026-01-20',
      time: '16:00',
      venue: '北京四中体育馆',
      price: 15,
      totalSeats: 150,
      availableSeats: 150,
      status: 'active',
      approvalStatus: 'pending'
    }]);

    // 模拟库存数据
    setInventory([{
      section: 'A区',
      total: 50,
      sold: 2,
      available: 48,
      price: 20
    }, {
      section: 'B区',
      total: 50,
      sold: 0,
      available: 50,
      price: 15
    }, {
      section: 'VIP区',
      total: 20,
      sold: 0,
      available: 20,
      price: 50
    }]);
  }, []);

  // 监听订单变化并保存到本地存储
  useEffect(() => {
    localStorage.setItem('userOrders', JSON.stringify(orders));
  }, [orders]);
  // 退出登录功能
  const handleLogout = async () => {
    try {
      const tcb = await props.$w.cloud.getCloudInstance();
      await tcb.auth().signOut();
      toast({
        title: "退出成功",
        description: "您已成功退出登录"
      });

      // 跳转到登录页面
      props.$w.utils.redirectTo({
        pageId: 'login',
        params: {}
      });
    } catch (error) {
      toast({
        title: "退出失败",
        description: "退出登录时发生错误",
        variant: "destructive"
      });
    }
  };

  // 管理员功能：审核比赛
  const handleApproveEvent = eventId => {
    setEvents(events.map(event => event._id === eventId ? {
      ...event,
      approvalStatus: 'approved'
    } : event));
    toast({
      title: "审核通过",
      description: "比赛已成功审核通过"
    });
  };
  const handleRejectEvent = eventId => {
    setEvents(events.map(event => event._id === eventId ? {
      ...event,
      approvalStatus: 'rejected'
    } : event));
    toast({
      title: "审核拒绝",
      description: "比赛审核已拒绝",
      variant: "destructive"
    });
  };

  // 发布者功能：更新库存
  const handleUpdateInventory = (section, newAvailable) => {
    setInventory(inventory.map(item => item.section === section ? {
      ...item,
      available: newAvailable
    } : item));
    toast({
      title: "库存更新",
      description: `${section}库存已更新为${newAvailable}张`
    });
  };

  // 发布者功能：更新赛事状态
  const handleUpdateEventStatus = (eventId, newStatus) => {
    setEvents(events.map(event => event._id === eventId ? {
      ...event,
      status: newStatus
    } : event));
    toast({
      title: "状态更新",
      description: "赛事状态已更新"
    });
  };
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 用户信息 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>个人信息</span>
              <Badge variant={userRole === 'organizer' ? 'secondary' : 'default'}>
                {userRole === 'organizer' ? '主办方' : '普通用户'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
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
              <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50">
                <LogOut className="w-4 h-4" />
                <span>退出登录</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 功能标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">个人中心</TabsTrigger>
            {userRole === 'organizer' && <TabsTrigger value="organizer">主办方管理</TabsTrigger>}
          </TabsList>

          {/* 个人中心标签页 */}
          <TabsContent value="personal">
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
                          <div className="flex items-center space-x-2">
                            <div className="text-lg font-semibold text-blue-600">
                              ¥{order.totalPrice}
                            </div>
                            {order.status === 'completed' && <Button variant="outline" size="sm" onClick={() => props.$w.utils.navigateTo({
                        pageId: 'ticket',
                        params: {
                          eventId: order.id,
                          ticketCount: order.ticketCount,
                          seats: order.seats.join(',')
                        }
                      })} className="flex items-center space-x-1">
                                <Ticket className="w-3 h-3" />
                                <span>查看电子票</span>
                              </Button>}
                          </div>
                        </div>
                      </div>)}
                  </div>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 主办方管理标签页 */}
          {userRole === 'organizer' && <TabsContent value="organizer">
              <div className="space-y-6">
                {/* 票务库存管理 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      票务库存管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {inventory.map((item, index) => <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-2">{item.section}</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>总库存:</span>
                              <span>{item.total}张</span>
                            </div>
                            <div className="flex justify-between">
                              <span>已售:</span>
                              <span className="text-red-600">{item.sold}张</span>
                            </div>
                            <div className="flex justify-between">
                              <span>可售:</span>
                              <span className="text-green-600">{item.available}张</span>
                            </div>
                            <div className="flex justify-between">
                              <span>价格:</span>
                              <span className="text-blue-600">¥{item.price}</span>
                            </div>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleUpdateInventory(item.section, item.available + 10)}>
                              +10
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleUpdateInventory(item.section, Math.max(0, item.available - 10))}>
                              -10
                            </Button>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                {/* 订单数据查看 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      订单数据查看
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events.map(event => <div key={event._id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold">{event.title}</h4>
                            <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                              {event.status === 'active' ? '进行中' : '已结束'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">日期:</span>
                              <div>{event.date} {event.time}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">地点:</span>
                              <div>{event.venue}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">售出:</span>
                              <div>{event.totalSeats - event.availableSeats} / {event.totalSeats}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">收入:</span>
                              <div className="text-green-600">¥{(event.totalSeats - event.availableSeats) * event.price}</div>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                {/* 赛事动态更新 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Edit className="w-5 h-5 mr-2" />
                      赛事动态更新
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events.map(event => <div key={event._id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold">{event.title}</h4>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleUpdateEventStatus(event._id, 'active')}>
                                进行中
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleUpdateEventStatus(event._id, 'ended')}>
                                已结束
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>{event.date} {event.time} | {event.venue}</div>
                            <div className="mt-1">当前状态: {event.status === 'active' ? '进行中' : '已结束'}</div>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>}

          {/* 主办方审核标签页 */}
          {userRole === 'organizer' && <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    比赛审核管理
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map(event => <div key={event._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{event.title}</h4>
                            <div className="text-sm text-gray-600">{event.date} {event.time} | {event.venue}</div>
                          </div>
                          <Badge variant={event.approvalStatus === 'approved' ? 'default' : event.approvalStatus === 'pending' ? 'secondary' : 'destructive'}>
                            {event.approvalStatus === 'approved' ? '已通过' : event.approvalStatus === 'pending' ? '待审核' : '已拒绝'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">票价:</span>
                            <div>¥{event.price}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">座位数:</span>
                            <div>{event.totalSeats}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">可售票:</span>
                            <div>{event.availableSeats}</div>
                          </div>
                        </div>

                        {event.approvalStatus === 'pending' && <div className="flex space-x-2">
                            <Button size="sm" onClick={() => handleApproveEvent(event._id)} className="flex items-center">
                              <Check className="w-4 h-4 mr-1" />
                              通过
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleRejectEvent(event._id)} className="flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              拒绝
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              查看详情
                            </Button>
                          </div>}
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>}
        </Tabs>
      </div>
    </div>;
};
export default Profile;