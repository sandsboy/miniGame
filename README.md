# miniGame

微信小游戏。用微信开发者工具打开本仓库根目录，即可玩八关地标拧螺丝。

调试基础库为 `3.18.0`（2026-11-17 版本分布中占比最高的稳定版）。

## 导入项目

1. 安装并打开 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
2. 选择「导入」，项目目录选本仓库的根目录（包含 `project.config.json` 和 `game.json` 的那一层）。
3. AppID 保持 `touristappid` 即可先用游客模式预览，无需注册。
4. 确认项目类型为小游戏后导入。第一关会先显示「埃菲尔铁塔」。

## 替换 AppID

正式调试或上传前，把游客 AppID 换成你自己的小游戏 AppID：

1. 在 [微信公众平台](https://mp.weixin.qq.com/) 注册小游戏，于「开发」-「开发管理」-「开发设置」复制 AppID。
2. 打开仓库根目录的 `project.config.json`，把 `"appid"` 从 `touristappid` 改成该 AppID 并保存。
3. 若项目已经导入，在微信开发者工具的「详情」-「基本信息」中核对 AppID。在这里修改会写到本地的 `project.private.config.json`，不会改掉已提交的 `project.config.json`。要让仓库里的配置也换成正式 AppID，仍需修改 `project.config.json`。

`project.private.config.json` 已加入 `.gitignore`，不要提交。

## 怎么过关

每关是一座用图形画出来的地标，螺丝钉在建筑上。点一颗螺丝，它会拧下来，飞进底部暂存格。

拧够这一关要求的数量就过关，并自动进入下一关。要求一关比一关多。关卡开始时会先亮出建筑名字。

顺序是：埃菲尔铁塔、比萨斜塔、自由女神像、罗马斗兽场、悉尼歌剧院、泰姬陵、伦敦塔桥、哈利法塔。

进度用 `wx.setStorageSync` 记在本机。关掉开发者工具再打开，会从上次的关卡继续。右上角「重来」只重开当前这一关。

## 目录

- `game.js`：入口，启动主循环。
- `js/main.js`：创建全屏画布和动画循环，并把触摸交给场景。
- `js/scene.js`：玩法入口。主循环每帧调用这里的 `update` 和 `render`。
- `js/levels.js`：八座地标的画法和螺丝位置。
- `js/storage.js`：本地关卡进度。
- `images/`、`audio/`：图片与音频资源目录。
