# Resume Site

一个可直接部署到 GitHub Pages 的轻量个人学术主页，目前只包含两个部分：

- `About`
- `Publications`

## 主要文件

- `index.html`: 页面结构
- `assets/styles.css`: 页面样式
- `assets/site-data.js`: 个人信息、联系方式、论文条目

## 你最常改的地方

- `assets/site-data.js`
  修改姓名、简介、研究方向、联系方式、论文标题、作者、链接。
- `profile.avatar`
  默认指向 `assets/avatar-placeholder.svg`，你可以改成自己的图片，比如 `assets/me.jpg`。
- `publications[*].image`
  默认是占位图，你可以改成自己的论文图或项目图，比如现有的 `assets/specvlm.png`、`assets/lvspec.png`。

## 本地预览

```bash
cd /ycji/code/resume
python3 -m http.server 8000
```

浏览器打开 `http://localhost:8000`

## 上传到 GitHub

如果你要把它作为个人主页，最推荐的仓库名是：

- `your-github-username.github.io`

如果你只是普通仓库，也可以，例如：

- `resume`

这两种都能正常工作，因为当前页面里的资源路径都是相对路径。

## 推荐上传流程

```bash
cd /ycji/code/resume
git init
git branch -M main
git add .
git commit -m "Initial resume site"
git remote add origin git@github.com:YOUR_NAME/YOUR_REPO.git
git push -u origin main
```

## 开启 GitHub Pages

上传后到 GitHub 仓库页面：

1. 进入 `Settings`
2. 打开 `Pages`
3. `Source` 选择 `Deploy from a branch`
4. 分支选择 `main`
5. 文件夹选择 `/ (root)`

几分钟后你就会得到访问链接：

- 如果仓库名是 `your-github-username.github.io`
  网址通常是 `https://your-github-username.github.io/`
- 如果仓库名是普通仓库，比如 `resume`
  网址通常是 `https://your-github-username.github.io/resume/`

## 说明

- `.nojekyll` 已经加好了，GitHub Pages 会按纯静态站点处理。
- `.gitignore` 已经加好了，避免把系统生成的小文件传上去。
