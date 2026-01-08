// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar, MapPin, ArrowLeft, CreditCard } from 'lucide-react';

const Payment = props => {
  const {
    toast
  } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const params = props.$w.page.dataset.params;
  const eventId = parseInt(params.eventId) || 1;
  const ticketCount = parseInt(params.ticketCount) || 1;
  const seats = params.seats ? params.seats.split(',') : [];

  // 模拟赛事数据
  const event = {
    id: eventId,
    title: '北京大学校园足球赛：计算机学院 vs 经济学院',
    date: '2026-01-15',
    time: '14:30',
    venue: '北京大学东操场',
    price: 5
  };
  const totalPrice = event.price * ticketCount;
  const handlePayment = async () => {
    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv)) {
      toast({
        title: "请填写完整支付信息",
        variant: "destructive"
      });
      return;
    }

    // 模拟支付处理
    try {
      toast({
        title: "支付处理中...",
        description: "请稍候"
      });

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "支付成功！",
        description: "订单已确认，请查看个人中心"
      });

      // 跳转到电子票页面
      props.$w.utils.navigateTo({
        pageId: 'ticket',
        params: {
          eventId: event.id,
          ticketCount,
          seats: seats.join(',')
        }
      });
    } catch (error) {
      toast({
        title: "支付失败",
        description: "请重试或联系客服",
        variant: "destructive"
      });
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Button variant="ghost" onClick={() => props.$w.utils.navigateBack()} className="flex items-center text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
            <h1 className="text-xl font-bold text-blue-600">确认支付</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 订单信息 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>订单详情</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date} {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.venue}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>票数：</span>
                      <span>{ticketCount} 张</span>
                    </div>
                    <div className="flex justify-between">
                      <span>座位：</span>
                      <span>{seats.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>单价：</span>
                      <span>¥{event.price}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t pt-2">
                      <span>总计：</span>
                      <span className="text-blue-600">¥{totalPrice}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 支付信息 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>支付方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <button className={`flex-1 p-4 border rounded-lg text-center transition-colors ${paymentMethod === 'alipay' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => setPaymentMethod('alipay')}>
                      <div className="text-2xl mb-2">💰</div>
                      <span className="font-medium">支付宝</span>
                    </button>
                    <button className={`flex-1 p-4 border rounded-lg text-center transition-colors ${paymentMethod === 'wechat' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => setPaymentMethod('wechat')}>
                      <div className="text-2xl mb-2">💳</div>
                      <span className="font-medium">微信支付</span>
                    </button>
                  </div>

                  <button className={`w-full p-4 border rounded-lg text-left transition-colors ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => setPaymentMethod('card')}>
                    <div className="flex items-center">
                      <CreditCard className="w-6 h-6 mr-3" />
                      <span className="font-medium">银行卡支付</span>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'card' && <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">卡号</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">有效期</Label>
                        <Input id="expiryDate" placeholder="MM/YY" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" value={cvv} onChange={e => setCvv(e.target.value)} />
                      </div>
                    </div>
                  </div>}

                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handlePayment}>
                  确认支付 ¥{totalPrice}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Payment;