// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Textarea, Label, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar, MapPin, DollarSign, Users, Upload, Camera } from 'lucide-react';

// @ts-ignore;
import { Navbar } from '@/components/Navbar';
const CreateEvent = props => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    price: '',
    totalSeats: '',
    sportType: 'football',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();

    // 表单验证
    if (!formData.title || !formData.date || !formData.time || !formData.venue || !formData.price || !formData.totalSeats) {
      toast({
        title: "请填写完整信息",
        description: "请确保所有必填项都已填写",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // 模拟提交到数据库
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "赛事创建成功",
        description: "您的赛事已成功提交，等待审核"
      });

      // 重置表单
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        price: '',
        totalSeats: '',
        sportType: 'football',
        imageUrl: ''
      });

      // 跳转到首页
      setTimeout(() => {
        props.$w.utils.navigateTo({
          pageId: 'home',
          params: {}
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "提交失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar {...props} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">
            创建新赛事
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            分享您的精彩赛事，让更多人参与其中
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 基本信息 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                基本信息
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    赛事标题 *
                  </Label>
                  <Input id="title" value={formData.title} onChange={e => handleInputChange('title', e.target.value)} placeholder="例如：中超联赛：北京国安 vs 上海申花" className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sportType" className="text-sm font-medium text-gray-700">
                    运动类型 *
                  </Label>
                  <select id="sportType" value={formData.sportType} onChange={e => handleInputChange('sportType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="football">足球</option>
                    <option value="basketball">篮球</option>
                    <option value="table_tennis">乒乓球</option>
                    <option value="tennis">网球</option>
                    <option value="other">其他</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  赛事描述
                </Label>
                <Textarea id="description" value={formData.description} onChange={e => handleInputChange('description', e.target.value)} placeholder="详细描述赛事信息、参赛队伍、看点等..." rows={4} className="w-full" />
              </div>
            </div>

            {/* 时间地点 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                时间地点
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    比赛日期 *
                  </Label>
                  <Input id="date" type="date" value={formData.date} onChange={e => handleInputChange('date', e.target.value)} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    比赛时间 *
                  </Label>
                  <Input id="time" type="time" value={formData.time} onChange={e => handleInputChange('time', e.target.value)} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue" className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    比赛场地 *
                  </Label>
                  <Input id="venue" value={formData.venue} onChange={e => handleInputChange('venue', e.target.value)} placeholder="例如：北京工人体育场" className="w-full" />
                </div>
              </div>
            </div>

            {/* 票务信息 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                票务信息
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium text-gray-700 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    票价（元） *
                  </Label>
                  <Input id="price" type="number" value={formData.price} onChange={e => handleInputChange('price', e.target.value)} placeholder="例如：120" min="0" className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalSeats" className="text-sm font-medium text-gray-700 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    总座位数 *
                  </Label>
                  <Input id="totalSeats" type="number" value={formData.totalSeats} onChange={e => handleInputChange('totalSeats', e.target.value)} placeholder="例如：500" min="1" className="w-full" />
                </div>
              </div>
            </div>

            {/* 赛事图片 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                赛事图片
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-700 flex items-center">
                  <Camera className="w-4 h-4 mr-2" />
                  图片链接
                </Label>
                <Input id="imageUrl" value={formData.imageUrl} onChange={e => handleInputChange('imageUrl', e.target.value)} placeholder="请输入图片URL链接" className="w-full" />
                <p className="text-sm text-gray-500">
                  推荐使用 Unsplash 等图库的图片链接
                </p>
              </div>
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-center pt-6">
              <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-medium min-w-[200px]">
                {isSubmitting ? <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    提交中...
                  </> : <>
                    <Upload className="w-4 h-4 mr-2" />
                    创建赛事
                  </>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default CreateEvent;