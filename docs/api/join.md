# /join

加入指定的游戏房间

## 请求

/join应该算是一个简单API请求了，你只需要向`https://api.miaaoo.com/join` 发送一个`post`请求 ~~就可以了~~ 才怪。

你需要传入一组`json`数据，来告诉服务器你要加入哪个房间。

```json5
{
  "version": "1.0.0",
  //现在版本只有1.0.0
  "joininformation": {
    "addid": "6",
    // 你添加了哪位好友就填对应好友的id数字
    // 详情查看/account请求
    "roomfrom": "6",
    // 房间来源的好友id 在/list请求中roomfrom对应的值
    "roomid": "00000000-0000-0000-0000-000000000000",
    // 在/list请求中id对应的值
    "sessionname": "00000000-0000-0000-0000-000000000000"
    // 在/list请求中sessionRef中的name对应的值
  },
  "invitecontrol": {
    "userxuid": "000000000000000",
    // 你的xuid,可以用/getxuid获取
  }
}
```

## 响应

```json5
{
  "status": "200",
  "code": "2",
  "message": "Success, and the invitation has been sent.",
  "message_zh_CN": "成功，而且邀请已发送。"
}
```

```json5
{
  "status": "200",
  "code": "1",
  "message": "Success, but the xuid parameter is missing or invalid.",
  "message_zh_CN": "成功，但是xuid参数缺失或非法。"
}
```

## 响应码

::: details HTTP 4xx

```json5
{
  "status": "400",
  "code": 1,
  "message": "Invalid or missing parameters.",
  "message_zh_CN": "参数无效或缺失。"
}
```

<br>

```json5
{
  "status": "400",
  "code": 2,
  "message": "A ddid or roomid error. Please check if the id is of type string, it is often mistakenly sent as number type. ",
  "message_zh_CN": "addid或roomid错误。请检查id是否是string类型，它常常被错误地以number类型发送。"
}
```

<br>

```json5
{
  "status": "400",
  "code": undefined,
  "message": "Failed to send invitation. If the error persists, try leaving the xuid parameter blank.",
  "message_zh_CN": "发送邀请失败，如果错误一直存在，请尝试xuid参数留空。"
}
```

<br>

```json5
{
  "status": "404",
  "code": undefined,
  "message": "Session not found, multiplayer may be turned off.",
  "message_zh_CN": "会话不存在，多人游戏可能已关闭。"
}
```

:::

::: details HTTP 500

```json5
{
  "status": "500",
  "code": undefined,
  "message": "Invalid subscriptionId parameter.",
  "message_zh_CN": "subscriptionId参数无效。"
}
```

<br>

```json5
{
  "status": "500",
  "code": undefined,
  "message": "Failed to join session.",
  "message_zh_CN": "加入会话失败。"
}
```

<br>

```json5
{
  "status": "500",
  "code": undefined,
  "message": "Error processing WebSocket message.",
  "message_zh_CN": "处理 WebSocket 消息时出错。"
}
```

:::

## 尝试

<PostButton url="join" method="POST" :body='{"version": "1.0.0","joininformation": {"addid": "6","roomfrom": "6","roomid": "00000000-0000-0000-0000-000000000000","sessionname": "00000000-0000-0000-0000-000000000000"},"invitecontrol": {"userxuid": "000000000000000"}}' />
