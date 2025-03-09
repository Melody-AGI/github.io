# 太空射击游戏

一个简单的太空射击游戏，使用HTML5 Canvas和JavaScript实现。

## 游戏说明

- 使用左右方向键控制飞船移动
- 按空格键发射子弹
- 击中敌人获得10分
- 被敌人碰到游戏结束
- 游戏结束后按R键重新开始

## 如何部署

这个游戏是一个纯前端项目，可以通过以下几种方式部署：

### 1. 使用GitHub Pages

1. 在GitHub上创建一个新的仓库
2. 将游戏文件上传到仓库中
3. 在仓库设置中启用GitHub Pages
4. 选择main分支作为源
5. 等待几分钟后，游戏就可以通过GitHub Pages提供的URL访问了

### 2. 使用Netlify

1. 注册Netlify账号
2. 点击"New site from Git"
3. 选择包含游戏代码的Git仓库
4. 等待部署完成
5. 使用Netlify提供的URL或设置自定义域名

### 3. 使用Vercel

1. 注册Vercel账号
2. 导入游戏项目的Git仓库
3. 等待自动部署完成
4. 使用Vercel提供的URL或设置自定义域名

## 项目文件说明

- `index.html`: 游戏的主页面
- `game.js`: 游戏的核心逻辑代码
- `README.md`: 项目说明文档

## 本地测试

由于游戏是纯前端项目，你可以直接在浏览器中打开index.html文件来运行游戏。或者使用简单的HTTP服务器：

```bash
# 使用Python启动简单的HTTP服务器
python -m http.server 8000

# 或使用Node.js的http-server
npx http-server
```

然后在浏览器中访问 `http://localhost:8000` 即可。