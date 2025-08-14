# /getxuid(即将弃用)

获取用户的xuid（使用[/profile](./profile)替代）

## 请求

/getxuid算是一个简单API请求了，你只需要向`https://api.miaaoo.com/getxuid` 发送一个`get`请求并传入一个`gametag`的值即可。

例如：

```bash
https://api.miaaoo.com/getxuid?gametag=HelloMC25a
```

## 响应

返回一个16位长度的纯数字


## 响应码

::: details HTTP 4xx

```json5
{
  "status": "400",
  "code": undefined,
  "message": "Invalid or missing gametag parameter.",
  "message_zh_CN": "gametag参数无效或缺失。"
}
```

<br>

```json5
{
  "status": "404",
  "code": undefined,
  "message": "User not found.",
  "message_zh_CN": "找不到用户。"
}
```

:::

::: details HTTP 500

```json5
{
  error: 'Internal Server Error: Error fetching data from Xbox Live API. 从 Xbox Live API 获取数据时出错。'
}
```

:::


## 尝试

<PostButton url="getxuid" method="GET" body="gametag=MultiMC23" />
