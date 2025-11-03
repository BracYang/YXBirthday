# 生日祝福网站使用说明

这是一个可定制的生日祝福网站，您可以通过修改配置文件来个性化网站内容，无需编写代码。

## 如何修改网站内容

所有可定制内容都在 `config.js` 文件中，您可以使用任何文本编辑器（如记事本、VS Code等）打开并修改它。

### 配置文件说明

打开 `config.js` 文件，您将看到一个名为 `websiteConfig` 的对象，包含以下可修改部分：

1. **基本信息**
   - `title`: 网站标题
   - `subtitle`: 网站副标题

2. **照片**
   - `photos`: 照片数组，每张照片包含：
     - `src`: 图片路径（放在images文件夹中）
     - `caption`: 图片说明文字

3. **留言**
   - `message.greeting`: 开头问候语
   - `message.content`: 正文内容（数组，每个元素为一段文字）
   - `message.signature`: 署名

4. **时间线**
   - `timeline`: 时间线事件数组，每个事件包含：
     - `date`: 日期
     - `title`: 事件标题
     - `description`: 事件描述

5. **背景音乐**
   - `music.src`: 音乐文件路径
   - `music.autoplay`: 是否自动播放（true/false）
   - `music.volume`: 音量（0.0-1.0）

6. **页脚**
   - `footer.text`: 页脚文字

7. **样式**
   - `style.primaryColor`: 主题颜色（CSS颜色值）
   - `style.backgroundColor`: 背景颜色或渐变

## 示例修改

### 修改标题
```javascript
title: "张三生日快乐！",
subtitle: "祝你25岁生日快乐！",
```

### 添加照片
1. 将您的照片放入 `images` 文件夹
2. 在配置文件中修改 `photos` 数组：
```javascript
photos: [
    { src: "images/photo1.jpg", caption: "我们的第一次旅行" },
    { src: "images/photo2.jpg", caption: "去年的生日派对" },
    // 添加更多照片...
]
```

### 修改留言内容
```javascript
message: {
    greeting: "亲爱的张三，",
    content: [
        "在你的25岁生日之际，我想对你说：遇见你是我生命中最美好的事情。",
        "感谢你带给我的所有快乐和温暖。",
        "愿你的生日充满欢笑，愿你的每一天都被爱包围。"
    ],
    signature: "爱你的李四"
}
```

### 添加背景音乐
1. 将音乐文件放入 `music` 文件夹
2. 修改配置：
```javascript
music: {
    src: "music/birthday_song.mp3",
    autoplay: true,
    volume: 0.5
}
```

## 注意事项

1. 修改配置文件后保存，然后刷新网页即可看到更改
2. 图片建议使用相对较小的文件以提高加载速度
3. 如果音乐不自动播放，这可能是浏览器策略限制，用户需要点击页面后才能播放

## 技术支持

如有任何问题，请联系网站制作者获取帮助。