# /account

获取账号信息

## 请求

/account是一个简单API请求了，你只需要向`https://api.miaaoo.com/account` 发送一个`get`请求即可。

例如：

```bash
https://api.miaaoo.com/account
```

## 响应

下面请求到的返回信息，是一个列表的数据，我们来逐一解释各个字段的含义。

```json5
[
  {
    "id": "2",  //账号id
    "name": "MultiMC23", //Xbox名字
    "canaddfriends": false //是否是可以添加的好友
  },
  {
    "id": "3",
    "name": "gouhope",
    "canaddfriends": false
  },
  {
    "id": "4",
    "name": "HelloMC25",
    "canaddfriends": false
  },
  {
    "id": "5",
    "name": "HelloMC25a",
    "canaddfriends": false
  },
  {
    "id": "6",
    "name": "HelloMC25b5988",
    "canaddfriends": true  //可添加的好友
  }
]
```

## 尝试

<PostButton url="account" method="GET" body="" />
