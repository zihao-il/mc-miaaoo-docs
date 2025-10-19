# API 列表

这个项目一共就五个API，下面我将简单描述一下这五个API的功能用法。

首先API的主域名是

```bash
https://api.miaaoo.com
```

此外你还需要设置一下请求头类型

```json
{
  "Content-Type": "application/json"
}
```

## 响应状态码

因为后台写的很烂，建议使用try...catch来捕获错误，以下是状态码：

| 状态码   |  原因   | 
|-------|:-----:| 
| `200` | 请求成功  |
| `400` | 参数错误  | 
| `404` | 会话错误  | 
| `500` | 服务器错误 | 

## [/list](./list.md)

list是一个`get`请求，他~~不需要~~(可以需要)传入任何参数，用来获取所有的房间信息。

## [/account](./account.md)

account是一个`get`请求，他不需要传入任何参数，用来获取账号信息。

## [/join](./join.md)

join是一个`post`请求，他需要传入一组`json`数据，用来加入一个房间。

## /getxuid (即将弃用)

getxuid是一个`get`请求，他需要传入你的用户名获取用户的`xuid`。

## [/profile](./profile.md)

profile是一个`get`请求，他需要传入你的用户名或者XUID获取用户个人信息。

## [/roominfo](./roominfo.md)

roominfo是一个`get`请求，他需要传入房间的`sessionRef.name`跟`roomfrom`即可~~视奸~~(查询)房间中的玩家。

## ~~已完结~~

OK你已经熟悉了所有API的用法， ~~快去建个站试试吧~~。   
下面将逐个详细的介绍这五个API的用法，如果你觉得自己行的话可以参考一下[此文档的代码](https://github.com/zihao-il/mc-miaaoo/blob/main/src/utils/axios.ts)