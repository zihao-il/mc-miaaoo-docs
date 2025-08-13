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

## 尝试

<PostButton url="join" method="POST" :body='{"version": "1.0.0","joininformation": {"addid": "6","roomfrom": "6","roomid": "00000000-0000-0000-0000-000000000000","sessionname": "00000000-0000-0000-0000-000000000000"},"invitecontrol": {"userxuid": "000000000000000"}}' />
