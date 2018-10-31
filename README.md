# free-designer
设计平台

### Development

```bash
$ yarn
$ yarn dev
$ open http://localhost:8080/
```

[设计平台PC端](http://www.free-designer.cn/)

[设计平台Mobile端](http://www.free-designer.cn/m/)

[mint-ui](http://mint-ui.github.io/)

[muse-ui](https://muse-ui.org/#/zh-CN)

[字体icon fontawesome](https://fontawesome.com)

[vue-cli3.0引入px2rem与lib-flexible 移动端适配](https://blog.csdn.net/qq_31393401/article/details/82353267)
原项目rem * 40 = 现在px       原项目px * 20 = 现在px
//ignored   不会被转换成rem 像素大写  PX || Px

postcss  selectorBlackList   设置不转换rem白名单


# 路由

## 个人中心

```bash
个人中心页：/views/my/index.vue
我的作品页：/views/my/my-work.vue
实名认证结果页：/views/my/my-certification-result.vue
平台说明页：/views/my/my-about.vue
积分充值：/views/my/my-pay-new.vue
```

## 订单

```bash
订单页：/views/order/index.vue
发布订单页：/views/order/send-creat-order.vue
```

## 登录

```bash
登录页：/views/Login/index.vue
```