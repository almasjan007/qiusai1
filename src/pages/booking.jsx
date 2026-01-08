// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar, MapPin, ArrowLeft, Users, Ticket } from 'lucide-react';

// @ts-ignore;
import StadiumSeatMap from '@/components/StadiumSeatMap';
const Booking = props => {
  const {
    toast
  } = useToast();
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 模拟赛事数据
  const event = {
    id: parseInt(props.$w.page.dataset.params.eventId) || 1,
    title: '北京大学校园足球赛：计算机学院 vs 经济学院',
    date: '2026-01-15',
    time: '14:30',
    venue: '北京大学东操场',
    price: 5,
    availableSeats: 45
  };
  const handleSeatSelect = seatNumber => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else if (selectedSeats.length < ticketCount) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  const handleProceedToPayment = () => {
    if (selectedSeats.length !== ticketCount) {
      toast({
        title: "请选择座位",
        description: `请选择 ${ticketCount} 个座位`,
        variant: "destructive"
      });
      return;
    }
    props.$w.utils.navigateTo({
      pageId: 'payment',
      params: {
        eventId: event.id,
        ticketCount,
        seats: selectedSeats.join(',')
      }
    });
  };
  const totalPrice = event.price * ticketCount;
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Button variant="ghost" onClick={() => props.$w.utils.navigateBack()} className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-blue-600">选择座位</h1>
              <p className="text-sm text-gray-500">{event.title}</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 赛事信息 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Ticket className="w-5 h-5" />
                  <CardTitle className="text-xl font-bold">购票信息</CardTitle>
                </div>
                <p className="text-blue-100 text-sm">{event.title}</p>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-medium">{event.date} {event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-medium">{event.venue}</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ticketCount" className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    购票数量
                  </Label>
                  <Input id="ticketCount" type="number" min="1" max="10" value={ticketCount} onChange={e => {
                  const count = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
                  setTicketCount(count);
                  setSelectedSeats([]);
                }} className="border-blue-200 focus:border-blue-500" />
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>总计：</span>
                    <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">¥{totalPrice}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg" onClick={handleProceedToPayment} disabled={selectedSeats.length !== ticketCount}>
                  {selectedSeats.length === ticketCount ? <>确认选择 ({selectedSeats.length}/{ticketCount})</> : <>请选择 {ticketCount} 个座位</>}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 球场座位图 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>球场座位选择</CardTitle>
              </CardHeader>
              <CardContent>
                <StadiumSeatMap selectedSeats={selectedSeats} onSeatSelect={handleSeatSelect} availableSeats={event.availableSeats} maxSeats={100} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Booking;