#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
创建罗小黑PNG图片
基于用户提供的图片特征生成罗小黑电子宠物图片
"""

from PIL import Image, ImageDraw
import os

def create_luoxiaohei_png():
    """
    创建罗小黑PNG图片
    基于用户之前提供的图片特征：黑色身体，大眼睛，坐姿
    """
    # 创建画布 (100x100像素，透明背景)
    size = (100, 100)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 定义颜色
    black = (0, 0, 0, 255)
    white = (255, 255, 255, 255)
    cream = (255, 248, 220, 255)
    dark_brown = (101, 67, 33, 255)
    
    # 绘制身体 (椭圆形)
    body_bbox = [25, 45, 75, 85]
    draw.ellipse(body_bbox, fill=black)
    
    # 绘制头部 (圆形)
    head_bbox = [20, 15, 80, 65]
    draw.ellipse(head_bbox, fill=black)
    
    # 绘制耳朵
    # 左耳
    left_ear = [(25, 20), (35, 10), (45, 25)]
    draw.polygon(left_ear, fill=black)
    # 右耳
    right_ear = [(55, 25), (65, 10), (75, 20)]
    draw.polygon(right_ear, fill=black)
    
    # 绘制耳朵内侧
    left_ear_inner = [(28, 22), (35, 15), (42, 25)]
    draw.polygon(left_ear_inner, fill=cream)
    right_ear_inner = [(58, 25), (65, 15), (72, 22)]
    draw.polygon(right_ear_inner, fill=cream)
    
    # 绘制眼睛 (大眼睛是罗小黑的特征)
    # 左眼外圈
    left_eye_outer = [28, 30, 45, 50]
    draw.ellipse(left_eye_outer, fill=cream)
    # 右眼外圈
    right_eye_outer = [55, 30, 72, 50]
    draw.ellipse(right_eye_outer, fill=cream)
    
    # 左眼瞳孔
    left_pupil = [32, 35, 41, 45]
    draw.ellipse(left_pupil, fill=black)
    # 右眼瞳孔
    right_pupil = [59, 35, 68, 45]
    draw.ellipse(right_pupil, fill=black)
    
    # 绘制鼻子 (小三角形)
    nose = [(48, 52), (52, 52), (50, 55)]
    draw.polygon(nose, fill=black)
    
    # 绘制嘴巴 (小弧线)
    # 用小圆圈模拟嘴巴
    mouth = [47, 57, 53, 60]
    draw.arc(mouth, start=0, end=180, fill=black, width=2)
    
    # 绘制前爪
    # 左前爪
    left_paw = [30, 70, 40, 80]
    draw.ellipse(left_paw, fill=black)
    # 右前爪
    right_paw = [60, 70, 70, 80]
    draw.ellipse(right_paw, fill=black)
    
    # 绘制尾巴 (弯曲的椭圆)
    tail = [75, 50, 95, 70]
    draw.ellipse(tail, fill=black)
    
    # 保存图片
    output_path = "images/luoxiaohei.png"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')
    
    print(f"✅ 罗小黑PNG图片已创建: {output_path}")
    print("图片特征:")
    print("- 尺寸: 100x100像素")
    print("- 背景: 透明")
    print("- 特征: 黑色身体，大眼睛，坐姿")
    
    return True

if __name__ == "__main__":
    print("=== 创建罗小黑PNG图片 ===")
    create_luoxiaohei_png()