#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
创建新的罗小黑PNG图片
基于用户提供的图片特征：黑色小猫，异色眼睛，透明背景
"""

from PIL import Image, ImageDraw
import os

def create_new_luoxiaohei_png():
    """
    创建新的罗小黑PNG图片
    特征：黑色身体，一只蓝绿色眼睛，一只绿色眼睛，坐姿
    """
    # 创建画布 (100x100像素，透明背景)
    size = (100, 100)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 定义颜色
    black = (26, 26, 26, 255)  # 深黑色
    light_blue = (77, 208, 225, 255)  # 浅蓝色眼睛
    light_green = (129, 199, 132, 255)  # 浅绿色眼睛
    brown = (212, 165, 116, 255)  # 棕色（鼻子、耳朵内侧）
    white = (255, 255, 255, 255)
    
    # 绘制身体 (椭圆形，坐姿)
    body_bbox = [25, 50, 75, 85]
    draw.ellipse(body_bbox, fill=black)
    
    # 绘制头部 (圆形)
    head_bbox = [18, 20, 82, 70]
    draw.ellipse(head_bbox, fill=black)
    
    # 绘制耳朵
    # 左耳
    left_ear = [(22, 25), (32, 12), (42, 28)]
    draw.polygon(left_ear, fill=black)
    # 右耳
    right_ear = [(58, 28), (68, 12), (78, 25)]
    draw.polygon(right_ear, fill=black)
    
    # 绘制耳朵内侧
    left_ear_inner = [(26, 26), (32, 18), (38, 28)]
    draw.polygon(left_ear_inner, fill=brown)
    right_ear_inner = [(62, 28), (68, 18), (74, 26)]
    draw.polygon(right_ear_inner, fill=brown)
    
    # 绘制眼睛 (异色眼睛是特色)
    # 左眼 (蓝绿色)
    left_eye_bbox = [28, 32, 42, 48]
    draw.ellipse(left_eye_bbox, fill=light_blue)
    # 右眼 (绿色)
    right_eye_bbox = [58, 32, 72, 48]
    draw.ellipse(right_eye_bbox, fill=light_green)
    
    # 眼睛高光
    left_highlight = [32, 35, 38, 42]
    draw.ellipse(left_highlight, fill=white)
    right_highlight = [62, 35, 68, 42]
    draw.ellipse(right_highlight, fill=white)
    
    # 绘制鼻子 (小三角形)
    nose = [(48, 52), (52, 52), (50, 56)]
    draw.polygon(nose, fill=brown)
    
    # 绘制嘴巴 (小弧线)
    # 用椭圆弧模拟嘴巴
    mouth_bbox = [46, 58, 54, 64]
    draw.arc(mouth_bbox, start=0, end=180, fill=brown, width=2)
    
    # 绘制前爪
    # 左前爪
    left_paw = [32, 72, 42, 82]
    draw.ellipse(left_paw, fill=black)
    # 右前爪
    right_paw = [58, 72, 68, 82]
    draw.ellipse(right_paw, fill=black)
    
    # 绘制尾巴 (弯曲的椭圆)
    tail = [75, 45, 95, 70]
    draw.ellipse(tail, fill=black)
    
    # 保存图片
    output_path = "images/luoxiaohei.png"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')
    
    print(f"✅ 新罗小黑PNG图片已创建: {output_path}")
    print("图片特征:")
    print("- 尺寸: 100x100像素")
    print("- 背景: 透明")
    print("- 特征: 黑色身体，异色眼睛（蓝绿+绿色），坐姿")
    
    return True

if __name__ == "__main__":
    print("=== 创建新罗小黑PNG图片 ===")
    create_new_luoxiaohei_png()