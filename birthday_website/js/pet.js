// 罗小黑电子宠物交互功能
class LuoXiaoHeiPet {
    constructor() {
        this.petContainer = document.querySelector('.pet-container');
        this.petImage = document.querySelector('.pet-image');
        this.speechBubble = document.querySelector('.pet-speech-bubble');
        
        // 对话内容数组
        this.messages = [
            "生日快乐！🎉",
            "今天是特别的日子呢~",
            "许个愿望吧！✨",
            "要开心哦！😊",
            "罗小黑陪你过生日~",
            "祝你天天开心！",
            "愿所有美好都如期而至",
            "生日蛋糕在哪里？🎂",
            "今天的你最闪亮！⭐",
            "又长大一岁啦！",
            "要记得微笑哦~",
            "生日愿望会实现的！"
        ];
        
        // 状态变量
        this.isIdle = true;
        this.lastInteraction = Date.now();
        this.idleTimer = null;
        this.speechTimer = null;
        this.blinkTimer = null;
        
        this.init();
    }
    
    init() {
        // 绑定点击事件
        this.petContainer.addEventListener('click', () => this.onPetClick());
        
        // 绑定鼠标悬停事件
        this.petContainer.addEventListener('mouseenter', () => this.onMouseEnter());
        this.petContainer.addEventListener('mouseleave', () => this.onMouseLeave());
        
        // 启动空闲行为
        this.startIdleBehavior();
        
        // 启动随机眨眼
        this.startRandomBlink();
    }
    
    // 点击宠物时的行为
    onPetClick() {
        this.lastInteraction = Date.now();
        
        // 随机选择一个行为
        const behaviors = ['speak', 'jump', 'blink'];
        const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
        
        switch(randomBehavior) {
            case 'speak':
                this.speak();
                break;
            case 'jump':
                this.jump();
                break;
            case 'blink':
                this.blink();
                break;
        }
    }
    
    // 鼠标悬停时
    onMouseEnter() {
        // 有概率显示对话
        if (Math.random() < 0.3) {
            setTimeout(() => this.speak(), 500);
        }
        
        // 有概率眨眼
        if (Math.random() < 0.5) {
            setTimeout(() => this.blink(), 200);
        }
    }
    
    // 鼠标离开时
    onMouseLeave() {
        this.hideSpeech();
    }
    
    // 说话功能
    speak() {
        const randomMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
        this.speechBubble.textContent = randomMessage;
        this.speechBubble.classList.add('show');
        
        // 清除之前的定时器
        if (this.speechTimer) {
            clearTimeout(this.speechTimer);
        }
        
        // 3秒后隐藏对话框
        this.speechTimer = setTimeout(() => {
            this.hideSpeech();
        }, 3000);
    }
    
    // 隐藏对话框
    hideSpeech() {
        this.speechBubble.classList.remove('show');
    }
    
    // 跳跃动画
    jump() {
        this.petImage.classList.add('jump');
        setTimeout(() => {
            this.petImage.classList.remove('jump');
        }, 600);
    }
    
    // 眨眼动画
    blink() {
        this.petImage.classList.add('blink');
        setTimeout(() => {
            this.petImage.classList.remove('blink');
        }, 150);
    }
    
    // 启动空闲行为
    startIdleBehavior() {
        const checkIdle = () => {
            const now = Date.now();
            const timeSinceLastInteraction = now - this.lastInteraction;
            
            // 如果超过8秒没有交互，执行空闲行为
            if (timeSinceLastInteraction > 8000 && this.isIdle) {
                this.performIdleBehavior();
                this.lastInteraction = now; // 重置计时器
            }
            
            // 继续检查
            this.idleTimer = setTimeout(checkIdle, 2000);
        };
        
        checkIdle();
    }
    
    // 执行空闲行为
    performIdleBehavior() {
        const idleBehaviors = ['blink', 'speak'];
        const randomBehavior = idleBehaviors[Math.floor(Math.random() * idleBehaviors.length)];
        
        if (randomBehavior === 'blink') {
            this.blink();
        } else if (randomBehavior === 'speak') {
            const idleMessages = [
                "在想什么呢？",
                "要不要和我玩？",
                "罗小黑在这里哦~",
                "点击我试试看！"
            ];
            const randomMessage = idleMessages[Math.floor(Math.random() * idleMessages.length)];
            this.speechBubble.textContent = randomMessage;
            this.speechBubble.classList.add('show');
            
            setTimeout(() => {
                this.hideSpeech();
            }, 2000);
        }
    }
    
    // 启动随机眨眼
    startRandomBlink() {
        const performRandomBlink = () => {
            // 随机间隔3-8秒眨一次眼
            const randomInterval = 3000 + Math.random() * 5000;
            
            this.blinkTimer = setTimeout(() => {
                // 只有在没有用户交互时才执行随机眨眼
                const timeSinceLastInteraction = Date.now() - this.lastInteraction;
                if (timeSinceLastInteraction > 2000) {
                    this.blink();
                    
                    // 有时候连续眨两次
                    if (Math.random() < 0.3) {
                        setTimeout(() => this.blink(), 400);
                    }
                }
                
                performRandomBlink(); // 递归调用
            }, randomInterval);
        };
        
        performRandomBlink();
    }
    
    // 销毁方法（清理定时器）
    destroy() {
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
        }
        if (this.speechTimer) {
            clearTimeout(this.speechTimer);
        }
        if (this.blinkTimer) {
            clearTimeout(this.blinkTimer);
        }
    }
}

// 页面加载完成后初始化宠物
document.addEventListener('DOMContentLoaded', function() {
    // 确保宠物元素存在后再初始化
    if (document.querySelector('.pet-container')) {
        window.luoXiaoHeiPet = new LuoXiaoHeiPet();
        console.log('罗小黑电子宠物已初始化！');
    }
});

// 页面卸载时清理
window.addEventListener('beforeunload', function() {
    if (window.luoXiaoHeiPet) {
        window.luoXiaoHeiPet.destroy();
    }
});