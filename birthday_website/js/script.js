// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 应用配置
    applyConfig();
    
    // 初始化组件
    initSlideshow();
    initPhotoWall(); // 初始化照片墙
    initTimeline();
    initParticles();
    initPetInteraction(); // 初始化宠物交互
    
    // 添加模态框关闭事件监听
    const modal = document.getElementById('photo-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePhotoModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePhotoModal();
            }
        });
    }
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePhotoModal();
        }
    });
});

// 应用网站配置
function applyConfig() {
    // 设置标题和副标题
    document.getElementById('site-title').textContent = websiteConfig.title;
    document.getElementById('site-subtitle').textContent = websiteConfig.subtitle;
    
    // 设置留言内容
    const messageContent = document.getElementById('message-content');
    messageContent.innerHTML = ''; // 清空现有内容
    
    // 添加问候语
    const greeting = document.createElement('p');
    greeting.textContent = websiteConfig.message.greeting;
    messageContent.appendChild(greeting);
    
    // 添加正文内容
    websiteConfig.message.content.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        messageContent.appendChild(p);
    });
    
    // 添加签名
    const signature = document.createElement('p');
    signature.className = 'signature';
    signature.textContent = websiteConfig.message.signature;
    messageContent.appendChild(signature);
    
    // 设置页脚文本
    document.getElementById('footer-text').textContent = websiteConfig.footer.text;
    
    // 设置背景音乐
    const bgMusic = document.getElementById('background-music');
    if (bgMusic && websiteConfig.music.src !== "#") {
        bgMusic.querySelector('source').src = websiteConfig.music.src;
        bgMusic.load();
    }
    
    // 应用样式设置
    document.documentElement.style.setProperty('--primary-color', websiteConfig.style.primaryColor);
    document.body.style.background = websiteConfig.style.backgroundColor;
    
    // 自动播放背景音乐
    if (bgMusic) {
        bgMusic.volume = websiteConfig.music.volume;
        // 用户交互后播放音乐
        if (websiteConfig.music.autoplay) {
            document.addEventListener('click', function() {
                bgMusic.play().catch(e => console.log('无法自动播放音乐:', e));
            }, { once: true });
        }
    }
}

// 初始化照片轮播
function initSlideshow() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (!slideshowContainer) return;
    
    // 检查是否存在photos配置，如果不存在则使用photoWall的前几张照片
    const photos = websiteConfig.photos || websiteConfig.photoWall.slice(0, 3);
    
    // 添加照片到轮播
    photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        if (index === 0) slide.classList.add('active');
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption || photo.title;
        
        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.textContent = photo.caption || photo.title;
        
        slide.appendChild(img);
        slide.appendChild(caption);
        slideshowContainer.appendChild(slide);
    });
}

// 切换照片
let slideIndex = 0;
function changeSlide(n) {
    const slides = document.querySelectorAll('.slide');
    
    // 隐藏当前照片
    slides[slideIndex].classList.remove('active');
    
    // 计算新的索引
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    
    // 显示新照片
    slides[slideIndex].classList.add('active');
}

// 自动轮播
setInterval(() => {
    changeSlide(1);
}, 5000);

// 初始化照片墙
function initPhotoWall() {
    const photoGrid = document.querySelector('.photo-grid');
    if (!photoGrid) return;
    
    // 清空现有内容
    photoGrid.innerHTML = '';
    
    // 获取照片墙配置
    const config = websiteConfig.photoWallConfig || {};
    const displayCount = config.displayCount || 0;
    const randomDisplay = config.randomDisplay || false;
    
    // 获取要显示的照片
    let photosToShow = [...websiteConfig.photoWall];
    
    // 如果设置了显示数量且大于0
    if (displayCount > 0 && displayCount < photosToShow.length) {
        if (randomDisplay) {
            // 随机选择照片
            photosToShow = photosToShow.sort(() => Math.random() - 0.5).slice(0, displayCount);
        } else {
            // 取前N张照片
            photosToShow = photosToShow.slice(0, displayCount);
        }
    }
    
    // 添加照片到网格
    photosToShow.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = `photo-item ${photo.size}`;
        
        // 添加随机旋转角度
        const rotation = photo.rotation || (Math.random() - 0.5) * 20; // -10到10度
        photoItem.style.transform = `rotate(${rotation}deg)`;
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.title;
        
        const overlay = document.createElement('div');
        overlay.className = 'photo-overlay';
        
        const title = document.createElement('h3');
        title.textContent = photo.title;
        
        const date = document.createElement('p');
        date.className = 'photo-date';
        date.textContent = photo.date;
        
        overlay.appendChild(title);
        overlay.appendChild(date);
        
        photoItem.appendChild(img);
        photoItem.appendChild(overlay);
        
        // 添加点击事件
        photoItem.addEventListener('click', () => openPhotoModal(photo));
        
        photoGrid.appendChild(photoItem);
    });
}

// 打开照片模态框
function openPhotoModal(photo) {
    const modal = document.getElementById('photo-modal');
    const modalImg = modal.querySelector('.modal-content img');
    const modalTitle = modal.querySelector('.photo-story h3');
    const modalDate = modal.querySelector('.photo-story .photo-date');
    const modalDescription = modal.querySelector('.photo-story .photo-description');
    
    modalImg.src = photo.src;
    modalImg.alt = photo.title;
    modalTitle.textContent = photo.title;
    modalDate.textContent = photo.date;
    modalDescription.textContent = photo.description;
    
    modal.style.display = 'block';
    
    // 添加淡入动画
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// 关闭照片模态框
function closePhotoModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// 初始化时间线（保留原有功能）
function initTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    websiteConfig.timelineEvents.forEach((event, index) => {
        const item = document.createElement('div');
        item.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        
        const content = document.createElement('div');
        content.className = 'timeline-content';
        
        const date = document.createElement('div');
        date.className = 'timeline-date';
        date.textContent = event.date;
        
        const text = document.createElement('p');
        text.textContent = event.content;
        
        content.appendChild(date);
        content.appendChild(text);
        item.appendChild(content);
        timeline.appendChild(item);
    });
}

// 背景音乐控制
function toggleMusic() {
    const music = document.getElementById('background-music');
    const button = document.getElementById('music-toggle');
    
    if (music.paused) {
        music.play();
        button.innerHTML = '<i class="fas fa-pause"></i> 暂停音乐';
    } else {
        music.pause();
        button.innerHTML = '<i class="fas fa-music"></i> 播放音乐';
    }
}

// 创建漂浮爱心
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            // 随机位置和大小
            const size = Math.random() * 20 + 10;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 4 + 3;
            const delay = Math.random() * 5;
            
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.left = `${left}%`;
            heart.style.bottom = '-20px';
            heart.style.animationDuration = `${animationDuration}s`;
            heart.style.animationDelay = `${delay}s`;
            
            container.appendChild(heart);
            
            // 动画结束后移除
            setTimeout(() => {
                heart.remove();
                createHeart(); // 创建新的心形
            }, (animationDuration + delay) * 1000);
        }, i * 300);
    }
}

// 创建单个爱心
function createHeart() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    // 随机位置和大小
    const size = Math.random() * 20 + 10;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 4 + 3;
    
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${left}%`;
    heart.style.bottom = '-20px';
    heart.style.animationDuration = `${animationDuration}s`;
    
    container.appendChild(heart);
    
    // 动画结束后移除
    setTimeout(() => {
        heart.remove();
        createHeart(); // 创建新的心形
    }, animationDuration * 1000);
}

// 粒子动画初始化
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#e83e8c' },
                shape: {
                    type: 'circle',
                    stroke: { width: 0, color: '#000000' },
                    polygon: { nb_sides: 5 }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#e83e8c',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }
}

// 初始化宠物交互功能
function initPetInteraction() {
    const petImage = document.querySelector('.pet-image');
    if (!petImage) return;
    
    // 添加点击事件监听器
    petImage.addEventListener('click', function(e) {
        showMeowText(e.clientX, e.clientY);
    });
    
    // 添加鼠标悬停效果
    petImage.style.cursor = 'pointer';
    petImage.style.transition = 'transform 0.3s ease';
    
    petImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    petImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// 显示"生日快乐"文字
function showMeowText(x, y) {
    // 创建文字元素
    const meowText = document.createElement('div');
    meowText.textContent = '生日快乐';
    meowText.className = 'meow-text';
    
    // 设置位置（相对于视口），文字显示在宠物上方更远的位置
    meowText.style.position = 'fixed';
    meowText.style.left = (x - 60) + 'px'; // 向左偏移更多，调整文字位置
    meowText.style.top = (y - 120) + 'px'; // 向上偏移更多，避免遮挡宠物
    meowText.style.zIndex = '9999';
    meowText.style.pointerEvents = 'none';
    
    // 添加到页面
    document.body.appendChild(meowText);
    
    // 添加动画类
    setTimeout(() => {
        meowText.classList.add('show');
    }, 10);
    
    // 2秒后移除
    setTimeout(() => {
        meowText.classList.add('fade-out');
        setTimeout(() => {
            if (meowText.parentNode) {
                meowText.parentNode.removeChild(meowText);
            }
        }, 500);
    }, 2000);
}

// 重置成就和游戏状态
function resetAllProgress() {
    // 确认对话框
    if (!confirm('确定要重置所有成就和游戏进度吗？此操作不可撤销！')) {
        return;
    }
    
    try {
        // 清除成就数据
        localStorage.removeItem('birthdayAchievements');
        
        // 清除游戏状态数据
        localStorage.removeItem('memoryGameCompleted');
        
        // 清除其他可能的游戏数据
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.includes('Game') || key.includes('Achievement') || key.includes('birthday'))) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // 重新初始化成就系统
        if (window.achievementSystem) {
            window.achievementSystem.loadAchievements();
            window.achievementSystem.updateAchievementDisplay();
        }
        
        // 显示成功消息
        alert('所有成就和游戏进度已重置！页面将刷新以更新显示。');
        
        // 刷新页面以更新所有状态显示
        window.location.reload();
        
    } catch (error) {
        console.error('重置过程中出现错误:', error);
        alert('重置过程中出现错误，请刷新页面后重试。');
    }
}