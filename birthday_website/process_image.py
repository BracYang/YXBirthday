#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
罗小黑图片处理脚本
用于将用户提供的图片进行抠图处理，去除背景
"""

import os
import sys
from PIL import Image, ImageFilter
import numpy as np

def remove_background_simple(image_path, output_path):
    """
    简单的背景移除方法
    适用于背景颜色相对单一的图片
    """
    try:
        # 打开图片
        img = Image.open(image_path)
        
        # 转换为RGBA模式
        img = img.convert("RGBA")
        
        # 获取图片数据
        data = np.array(img)
        
        # 获取图片的四个角落像素作为背景色参考
        corners = [
            data[0, 0],      # 左上角
            data[0, -1],     # 右上角
            data[-1, 0],     # 左下角
            data[-1, -1]     # 右下角
        ]
        
        # 计算平均背景色
        bg_color = np.mean(corners, axis=0)[:3]  # 只取RGB，不要Alpha
        
        # 设置容差值
        tolerance = 50
        
        # 创建掩码
        mask = np.all(np.abs(data[:, :, :3] - bg_color) < tolerance, axis=2)
        
        # 将背景设为透明
        data[mask] = [0, 0, 0, 0]
        
        # 创建新图片
        result = Image.fromarray(data, 'RGBA')
        
        # 保存结果
        result.save(output_path, 'PNG')
        print(f"抠图完成！保存到: {output_path}")
        return True
        
    except Exception as e:
        print(f"处理图片时出错: {e}")
        return False

def process_luoxiaohei_image():
    """
    处理罗小黑图片的主函数
    """
    # 可能的图片路径
    possible_paths = [
        "luoxiaohei.jpg",
        "luoxiaohei.png", 
        "罗小黑.jpg",
        "罗小黑.png",
        "../luoxiaohei.jpg",
        "../luoxiaohei.png",
        "images/luoxiaohei_original.jpg",
        "images/luoxiaohei_original.png"
    ]
    
    # 查找图片文件
    input_path = None
    for path in possible_paths:
        if os.path.exists(path):
            input_path = path
            break
    
    if not input_path:
        print("未找到罗小黑图片文件！")
        print("请将图片文件放在以下位置之一：")
        for path in possible_paths:
            print(f"  - {path}")
        return False
    
    # 输出路径
    output_path = "images/luoxiaohei.png"
    
    # 确保输出目录存在
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    print(f"找到图片: {input_path}")
    print("开始处理...")
    
    # 处理图片
    success = remove_background_simple(input_path, output_path)
    
    if success:
        print("✅ 罗小黑图片处理完成！")
        print(f"抠图后的图片保存在: {output_path}")
        return True
    else:
        print("❌ 图片处理失败！")
        return False

if __name__ == "__main__":
    print("=== 罗小黑图片处理工具 ===")
    process_luoxiaohei_image()