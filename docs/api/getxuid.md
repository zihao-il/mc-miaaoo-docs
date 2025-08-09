# /getxuid(即将弃用)

获取用户的xuid（使用/profile替代）

## 请求

/getxuid算是一个简单API请求了，你只需要向`https://api.miaaoo.com/getxuid` 发送一个`get`请求并传入一个`gametag`的值即可。

例如：

```bash
https://api.miaaoo.com/getxuid?gametag=HelloMC25a
```

## 响应

返回一个16位长度的纯数字

## 尝试

<PostButton url="getxuid" method="GET" body="gametag=MultiMC23" />
