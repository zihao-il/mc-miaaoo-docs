# API 列表

这个项目一共就三个API，下面我将简单描述一下这三个API的功能用法。

首先API的主域名是

```bash
https://api.miaaoo.com
```

此外你还需要设置一下请求头类型

```bash
{
  "Content-Type": "application/json",
}
```

## /list

list是一个`post`请求，他不需要传入任何参数，用来获取所有的房间信息。

## /join

join是一个`post`请求，他需要传入一组`json`数据，用来加入一个房间。

## /getxuid

getxuid是一个`get`请求，他需要传入你的用户名获取用户的`xuid`。

## ~~已完结~~

OK你已经熟悉了所有API的用法， ~~快去建个站试试吧~~。   
下面将逐个详细的介绍这三个API的用法，如果你觉得自己行的话可以参考一下[此文档的代码](https://github.com/zihao-il/mc-miaaoo/blob/main/src/utils/axios.ts)