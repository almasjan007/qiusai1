// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';

export const Navbar = props => {
  const currentUser = props.$w.auth.currentUser;
  return <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => props.$w.utils.navigateTo({
            pageId: 'home',
            params: {}
          })}>
              球赛购票系统
            </h1>
            <div className="hidden md:flex space-x-6">
              <Button variant="ghost" onClick={() => props.$w.utils.navigateTo({
              pageId: 'home',
              params: {}
            })} className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                首页
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                足球赛事
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                篮球赛事
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                其他赛事
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-600">
                  欢迎，{currentUser.nickName || currentUser.name}
                </div>
                <Button variant="ghost" onClick={() => props.$w.utils.navigateTo({
              pageId: 'profile',
              params: {}
            })} className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                  个人中心
                </Button>
                <Button variant="outline" size="sm" onClick={async () => {
              try {
                const tcb = await props.$w.cloud.getCloudInstance();
                await tcb.auth().signOut();
                props.$w.utils.redirectTo({
                  pageId: 'login',
                  params: {}
                });
              } catch (error) {
                console.error('Logout failed:', error);
              }
            }} className="text-gray-600 hover:text-red-600 hover:bg-red-50">
                  退出
                </Button>
              </div> : <div className="flex space-x-2">
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  登录
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  注册
                </Button>
              </div>}
          </div>
        </div>
      </div>
    </nav>;
};