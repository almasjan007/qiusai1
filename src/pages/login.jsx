// @ts-ignore;
import React, { useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { Loader2, LogIn } from 'lucide-react';

const Login = props => {
  useEffect(() => {
    // 如果已经登录，直接跳转到首页
    if (props.$w.auth.currentUser?.userId) {
      props.$w.utils.redirectTo({
        pageId: 'home',
        params: {}
      });
      return;
    }

    // 跳转到托管登录页
    const redirectToLogin = async () => {
      try {
        const tcb = await props.$w.cloud.getCloudInstance();
        tcb.auth().toDefaultLoginPage({
          config_version: "env",
          redirect_uri: window.location.href,
          query: {
            s_domain: props.$w.utils.resolveStaticResourceUrl("/").replace(/^https?:\/\//, "").split("/")[0]
          }
        });
      } catch (error) {
        console.error('跳转登录页失败:', error);
      }
    };
    redirectToLogin();
  }, [props.$w]);
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <LogIn className="w-6 h-6" />
            <span>登录中</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>正在跳转到登录页面...</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            如果页面没有自动跳转，请点击下方按钮
          </p>
          <Button onClick={async () => {
          const tcb = await props.$w.cloud.getCloudInstance();
          tcb.auth().toDefaultLoginPage({
            config_version: "env",
            redirect_uri: window.location.href,
            query: {
              s_domain: props.$w.utils.resolveStaticResourceUrl("/").replace(/^https?:\/\//, "").split("/")[0]
            }
          });
        }} className="w-full">
            手动跳转到登录页
          </Button>
        </CardContent>
      </Card>
    </div>;
};
export default Login;