// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { Calendar, MapPin, Users, Star } from 'lucide-react';

export const EventCard = ({
  event,
  onBookTicket
}) => {
  const getEventTypeColor = type => {
    switch (type) {
      case 'football':
        return 'bg-green-100 text-green-800';
      case 'basketball':
        return 'bg-orange-100 text-orange-800';
      case 'table_tennis':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getEventTypeText = type => {
    switch (type) {
      case 'football':
        return '足球';
      case 'basketball':
        return '篮球';
      case 'table_tennis':
        return '乒乓球';
      default:
        return '其他';
    }
  };
  return <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative">
        <img src={event.image} alt={event.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
            {getEventTypeText(event.type)}
          </div>
          {event.isHot && <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              热卖中
            </div>}
        </div>
        {event.rating && <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center text-sm">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {event.rating}
          </div>}
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </CardTitle>
        <CardDescription className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {event.date} {event.time}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {event.venue}
          </div>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold text-blue-600">¥{event.price}</div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            剩余 {event.availableSeats} 席
          </div>
        </div>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300" onClick={() => onBookTicket(event.id)}>
          立即购票
        </Button>
      </CardContent>
    </Card>;
};