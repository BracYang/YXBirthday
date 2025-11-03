#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
创建更新的罗小黑PNG图片
基于用户提供的新图片特征：更精致的黑色小猫，清晰轮廓，异色眼睛
"""

from PIL import Image, ImageDraw
import os

def create_updated_luoxiaohei_png():
    """
    创建更新的罗小黑PNG图片
    特征：黑色身体，棕色轮廓，一只蓝绿色眼睛，一只绿色眼睛，坐姿
    """
    # 创建画布 (100x100像素，透明背景)
    size = (100, 100)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 定义颜色
    black = (20, 20, 20, 255)  # 深黑色
    brown_outline = (139, 69, 19, 255)  # 棕色轮廓
    light_teal = (64, 224, 208, 255)  # 青绿色眼睛
    light_green = (144, 238, 144, 255)  # 浅绿色眼睛
    cream = (245, 222, 179, 255)  # 奶油色（鼻子区域）
    white = (255, 255, 255, 255)
    
    # 绘制身体轮廓 (椭圆形，坐姿)
    body_outline = [23, 48, 77, 87]
    draw.ellipse(body_outline, fill=brown_outline)
    body_inner = [25, 50, 75, 85]
    draw.ellipse(body_inner, fill=black)
    
    # 绘制头部轮廓
    head_outline = [16, 18, 84, 72]
    draw.ellipse(head_outline, fill=brown_outline)
    head_inner = [18, 20, 82, 70]
    draw.ellipse(head_inner, fill=black)
    
    # 绘制耳朵轮廓
    # 左耳轮廓
    left_ear_outline = [(20, 27), (30, 10), (44, 30)]
    draw.polygon(left_ear_outline, fill=brown_outline)
    left_ear_inner = [(22, 28), (32, 14), (42, 30)]
    draw.polygon(left_ear_inner, fill=black)
    
    # 右耳轮廓
    right_ear_outline = [(56, 30), (70, 10), (80, 27)]
    draw.polygon(right_ear_outline, fill=brown_outline)
    right_ear_inner = [(58, 30), (68, 14), (78, 28)]
    draw.polygon(right_ear_inner, fill=black)
    
    # 绘制耳朵内侧
    left_ear_detail = [(26, 28), (32, 20), (38, 30)]
    draw.polygon(left_ear_detail, fill=cream)
    right_ear_detail = [(62, 30), (68, 20), (74, 28)]
    draw.polygon(right_ear_detail, fill=cream)
    
    # 绘制眼睛 (异色眼睛)
    # 左眼 (青绿色)
    left_eye_bbox = [26, 30, 44, 50]
    draw.ellipse(left_eye_bbox, fill=light_teal)
    # 右眼 (浅绿色)
    right_eye_bbox = [56, 30, 74, 50]
    draw.ellipse(right_eye_bbox, fill=light_green)
    
    # 眼睛高光
    left_highlight = [30, 33, 38, 43]
    draw.ellipse(left_highlight, fill=white)
    right_highlight = [60, 33, 68, 43]
    draw.ellipse(right_highlight, fill=white)
    
    # 小的瞳孔反光点
    left_pupil_light = [33, 36, 35, 38]
    draw.ellipse(left_pupil_light, fill=white)
    right_pupil_light = [63, 36, 65, 38]
    draw.ellipse(right_pupil_light, fill=white)
    
    # 绘制鼻子区域
    nose_area = [46, 50, 54, 58]
    draw.ellipse(nose_area, fill=cream)
    
    # 绘制鼻子 (小三角形)
    nose = [(48, 52), (52, 52), (50, 56)]
    draw.polygon(nose, fill=brown_outline)
    
    # 绘制嘴巴
    mouth_bbox = [45, 58, 55, 65]
    draw.arc(mouth_bbox, start=0, end=180, fill=brown_outline, width=2)
    
    # 绘制前爪轮廓
    # 左前爪
    left_paw_outline = [30, 70, 42, 84]
    draw.ellipse(left_paw_outline, fill=brown_outline)
    left_paw_inner = [32, 72, 40, 82]
    draw.ellipse(left_paw_inner, fill=black)
    
    # 右前爪
    right_paw_outline = [58, 70, 70, 84]
    draw.ellipse(right_paw_outline, fill=brown_outline)
    right_paw_inner = [60, 72, 68, 82]
    draw.ellipse(right_paw_inner, fill=black)
    
    # 绘制尾巴轮廓
    tail_outline = [73, 43, 97, 72]
    draw.ellipse(tail_outline, fill=brown_outline)
    tail_inner = [75, 45, 95, 70]
    draw.ellipse(tail_inner, fill=black)
    
    # 保存图片
    output_path = "images/luoxiaohei.png"
    
    # 备份现有图片
    if os.path.exists(output_path):
        backup_path = "images/luoxiaohei_old.png"
        if os.path.exists(backup_path):
            os.remove(backup_path)
        os.rename(output_path, backup_path)
        print(f"已备份原图片到: {backup_path}")
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')
    
    print(f"✅ 更新的罗小黑PNG图片已创建: {output_path}")
    print("图片特征:")
    print("- 尺寸: 100x100像素")
    print("- 背景: 透明")
    print("- 特征: 黑色身体，棕色轮廓，异色眼睛（青绿+浅绿），坐姿")
    print("- 风格: 更精致，有清晰的轮廓线")
    
    return True

if __name__ == "__main__":
    print("=== 创建更新的罗小黑PNG图片 ===")
    create_updated_luoxiaohei_png()