# react服务端渲染模板

**基于typescript, nextjs, natur, antd搭建的项目模板**

## 项目启动与打包部署

```js
// 安装依赖
yarn

// 运行
yarn dev
// 打包
yarn build
// 部署，启动node服务， 建议通过pm2启动
yarn start

// 安装pm2
npm i pm2 -g
yarn pm2:start

// 打开网页http://localhost:3000/
```

## npm 命令

- dev 开发启动项目
- build 打包
- start 启动部署打包的代码
- pm2:start 以pm2的方式部署代码
- pm2:reload 重新以pm2的方式部署
- pm2:delete 删除pm2的进程

## 目录结构

- .next next自动生成，不用管
- components 存放组件
- http 请求后台接口，客户端的请求和服务端的请求服务都是动态生成的
- pages 页面
- public 存放静态资源
- services 存放store的调度逻辑
- store 存放模块的业务逻辑
    - plugins 存放natur的插件配置
- styles 存放全局公共的样式
- theme 存放antd的自定义主题配置
    - antd-theme.var.less 存放antd的主题覆盖
    - antd.css 是通过```npm run gt```自动生成的，不用管
- utils 存放工具函数

## 别名

- @ 对应根目录

## antd主题配置

1. 修改./theme/antd-theme-var.less文件，添加你需要修改的主题色


## 关于接口请求

1. 接口请求使用axios动态生成，代码存放在./http中，在ssr服务端，如果存在用户态，则需要将用户的登录态传给业务后端，所以使用axios动态生成一个实例，再将该实例通过natur interceptor注入到每一个action的最后一个参数，所以接口请求需要获取到action的最后一个参数中的http进行请求
    ```ts
    import { Http } from "@/utils/action-ctx";

    const actions = {
        // http会是最后一个参数，必须标记为可选，是natur自动注入的
        fetch: async (params: string, http?: Http) => {
            // http.post
            // http.get
            /* business code */
        }
    }
    ```

## 其他

- 判断当前是服务器还是浏览器
    ```ts
    import { isBrowser } from '@/utils';

    if (isBrowser) {
        // 是浏览器环境
    } else {
        // 是服务端环境
    }

    ```

- 关于路由，或者其他详情请看[nextjs中文文档](https://www.nextjs.cn/docs)