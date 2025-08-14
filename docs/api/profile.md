# /profile

获取用户的个人信息

## 请求

/profile算是一个简单API请求了，你只需要向`https://api.miaaoo.com/profile` 发送一个`get`请求并传入一个`gt`或者`xuid`的值即可。

例如：

::: code-group

```bash [gt用法]
https://api.miaaoo.com/profile?gt=HelloMC25a
```

```bash [xuid用法]
https://api.miaaoo.com/profile?xuid=2535420194487254
```

:::

## 响应

```json5
{
  "profileUsers": [
    {
      "id": "2535420194487254", //xuid
      "hostId": "2535420194487254",
      "settings": [
        {
          "id": "GameDisplayPicRaw",
          "value": "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcS9jr0n8i7LY1tL3U7AiafS_z7jMwCfONA420Zt1fhQC_iRgknCDQSakr8F5QLeglJb4X6LK.miAfDXBhCYnLww--&format=png" //Xbox头像链接
        },
        {
          "id": "Gamertag",
          "value": "HelloMC25a"  //用户名
        },
        {
          "id": "GameDisplayName",
          "value": "HelloMC25a"
        }
      ],
      "isSponsoredUser": false
    }
  ]
}
```


## 响应码

::: details HTTP 400

```json5
{
  "status": "400",
  "code": undefined,
  "message": "Either xuid or gt parameter must be provided.",
  "message_zh_CN": "必须提供 xuid 或 gt 参数。"
}
```

<br>

```json5
{
  "status": "400",
  "code": undefined,
  "message": "The xuid and gt parameters cannot exist at the same time.",
  "message_zh_CN": "xuid 和 gt 参数不能同时存在。"
}
```

:::

::: details HTTP 500

```json5
{
  "status": "500",
  "code": undefined,
  "message": "Error fetching user profile from Xbox Live API.",
  "message_zh_CN": "从 Xbox Live API 获取用户资料时出错。"
}
```

:::

## 尝试

<PostButton url="profile" method="GET" body="gt=HelloMC25a" />
