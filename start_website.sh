#!/bin/bash

# 学习网站一键启动脚本
# 《打造超人學習能力》网站启动器

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 项目路径
PROJECT_DIR="/Users/liyanan/Documents/GitHub/learn-hack"
SITE_DIR="$PROJECT_DIR/site"
DOCS_DIR="$PROJECT_DIR/docs"

# 显示启动信息
echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║                    🚀 打造超人學習能力 🚀                    ║${NC}"
echo -e "${PURPLE}║                    网站一键启动器 v1.0                      ║${NC}"
echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 检查项目目录是否存在
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ 错误：项目目录不存在${NC}"
    echo -e "${RED}   路径：$PROJECT_DIR${NC}"
    exit 1
fi

# 进入项目目录
cd "$PROJECT_DIR" || exit 1

# 检查site目录是否存在
if [ ! -d "$SITE_DIR" ]; then
    echo -e "${YELLOW}⚠️  警告：site目录不存在，正在构建网站...${NC}"
    
    # 检查是否安装了MkDocs
    if ! command -v mkdocs &> /dev/null; then
        echo -e "${RED}❌ 错误：未安装MkDocs${NC}"
        echo -e "${YELLOW}请运行以下命令安装：${NC}"
        echo -e "${CYAN}pip install mkdocs mkdocs-material${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}📦 正在构建网站...${NC}"
    mkdocs build
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 构建失败${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ 网站构建完成${NC}"
fi

# 检查Python是否可用
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ 错误：未找到Python3${NC}"
    exit 1
fi

# 启动HTTP服务器
echo -e "${BLUE}🌐 正在启动本地服务器...${NC}"
echo -e "${CYAN}📍 网站地址：http://127.0.0.1:8000${NC}"
echo -e "${CYAN}📁 服务目录：$SITE_DIR${NC}"
echo ""

# 在后台启动服务器
cd "$SITE_DIR"
python3 -m http.server 8000 &
SERVER_PID=$!

# 等待服务器启动
sleep 2

# 检查服务器是否成功启动
if ps -p $SERVER_PID > /dev/null; then
    echo -e "${GREEN}✅ 服务器启动成功！${NC}"
    echo -e "${GREEN}🆔 进程ID：$SERVER_PID${NC}"
    echo ""
    
    # 自动打开浏览器
    echo -e "${BLUE}🌍 正在打开浏览器...${NC}"
    open "http://127.0.0.1:8000"
    
    echo ""
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║                        🎉 启动完成！                        ║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}💡 使用说明：${NC}"
    echo -e "${CYAN}   • 网站已在浏览器中打开${NC}"
    echo -e "${CYAN}   • 按 Ctrl+C 停止服务器${NC}"
    echo -e "${CYAN}   • 支持中文搜索功能${NC}"
    echo -e "${CYAN}   • 支持暗黑/明亮主题切换${NC}"
    echo -e "${CYAN}   • 支持响应式设计（手机/平板/桌面）${NC}"
    echo ""
    echo -e "${GREEN}🚀 享受你的学习之旅！${NC}"
    echo ""
    
    # 等待用户中断
    echo -e "${YELLOW}按 Ctrl+C 停止服务器...${NC}"
    wait $SERVER_PID
else
    echo -e "${RED}❌ 服务器启动失败${NC}"
    exit 1
fi
