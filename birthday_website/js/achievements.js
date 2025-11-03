// 成就系统
class AchievementSystem {
    constructor() {
        this.achievements = {
            // 记忆配对游戏成就
            memory_first_win: {
                id: 'memory_first_win',
                name: '初次胜利',
                description: '完成第一次记忆配对游戏',
                icon: '🎯',
                unlocked: false,
                category: 'memory'
            },
            memory_speed_demon: {
                id: 'memory_speed_demon',
                name: '速度恶魔',
                description: '在60秒内完成记忆配对游戏',
                icon: '⚡',
                unlocked: false,
                category: 'memory'
            },
            memory_perfect_game: {
                id: 'memory_perfect_game',
                name: '完美游戏',
                description: '记忆配对游戏中没有错误匹配',
                icon: '💎',
                unlocked: false,
                category: 'memory'
            },
            
            // 单词拼图成就
            word_puzzle_master: {
                id: 'word_puzzle_master',
                name: '拼图大师',
                description: '完成所有单词拼图',
                icon: '📝',
                unlocked: false,
                category: 'word'
            },
            word_puzzle_no_hints: {
                id: 'word_puzzle_no_hints',
                name: '独立思考',
                description: '不使用提示完成单词拼图',
                icon: '🤔',
                unlocked: false,
                category: 'word'
            },
            
            // 颜色匹配成就
            color_match_champion: {
                id: 'color_match_champion',
                name: '配色冠军',
                description: '颜色匹配游戏得分超过1000',
                icon: '🌈',
                unlocked: false,
                category: 'color'
            },
            color_match_efficient: {
                id: 'color_match_efficient',
                name: '高效匹配',
                description: '用最少步数完成颜色匹配',
                icon: '🎯',
                unlocked: false,
                category: 'color'
            },
            
            // 综合成就
            game_explorer: {
                id: 'game_explorer',
                name: '游戏探索者',
                description: '尝试所有游戏',
                icon: '🗺️',
                unlocked: false,
                category: 'general'
            },
            achievement_hunter: {
                id: 'achievement_hunter',
                name: '成就猎人',
                description: '解锁10个成就',
                icon: '🏆',
                unlocked: false,
                category: 'general'
            },
            birthday_champion: {
                id: 'birthday_champion',
                name: '生日冠军',
                description: '解锁所有成就',
                icon: '👑',
                unlocked: false,
                category: 'general'
            }
        };
        
        this.loadAchievements();
        this.initializeUI();
    }
    
    // 加载已保存的成就数据
    loadAchievements() {
        const saved = localStorage.getItem('birthdayAchievements');
        if (saved) {
            const savedAchievements = JSON.parse(saved);
            Object.keys(savedAchievements).forEach(key => {
                if (this.achievements[key]) {
                    this.achievements[key].unlocked = savedAchievements[key].unlocked;
                    this.achievements[key].unlockedAt = savedAchievements[key].unlockedAt;
                }
            });
        }
    }
    
    // 保存成就数据
    saveAchievements() {
        localStorage.setItem('birthdayAchievements', JSON.stringify(this.achievements));
    }
    
    // 解锁成就
    unlockAchievement(achievementId) {
        if (this.achievements[achievementId] && !this.achievements[achievementId].unlocked) {
            this.achievements[achievementId].unlocked = true;
            this.achievements[achievementId].unlockedAt = new Date().toISOString();
            this.saveAchievements();
            this.showAchievementNotification(this.achievements[achievementId]);
            this.updateAchievementDisplay();
            
            // 检查综合成就
            this.checkGeneralAchievements();
            
            return true;
        }
        return false;
    }
    
    // 检查综合成就
    checkGeneralAchievements() {
        // 游戏探索者 - 由于只有一个游戏，调整逻辑
        const memoryCompleted = localStorage.getItem('memoryGameCompleted') === 'true';
        if (memoryCompleted) {
            this.unlockAchievement('game_explorer');
        }
        
        // 成就猎人
        const unlockedCount = Object.values(this.achievements).filter(a => a.unlocked).length;
        if (unlockedCount >= 5) { // 调整为更合理的数量
            this.unlockAchievement('achievement_hunter');
        }
        
        // 生日冠军
        const totalAchievements = Object.keys(this.achievements).length;
        if (unlockedCount >= totalAchievements - 1) { // 除了自己
            this.unlockAchievement('birthday_champion');
        }
    }
    
    // 显示成就通知
    showAchievementNotification(achievement) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <div class="achievement-title">成就解锁！</div>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                </div>
            </div>
        `;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.5s ease;
            max-width: 300px;
            font-family: Arial, sans-serif;
        `;
        
        document.body.appendChild(notification);
        
        // 动画显示
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 4000);
        
        // 播放音效（如果有的话）
        this.playAchievementSound();
    }
    
    // 播放成就音效
    playAchievementSound() {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
            audio.volume = 0.3;
            audio.play().catch(() => {}); // 忽略播放错误
        } catch (e) {
            // 忽略音效错误
        }
    }
    
    // 初始化UI
    initializeUI() {
        // 如果在游戏页面，添加成就按钮
        if (window.location.pathname.includes('games.html')) {
            this.addAchievementButton();
        }
    }
    
    // 添加成就按钮
    addAchievementButton() {
        const header = document.querySelector('header');
        if (header) {
            const achievementBtn = document.createElement('button');
            achievementBtn.className = 'achievement-btn';
            achievementBtn.innerHTML = '<i class="fas fa-trophy"></i> 成就';
            achievementBtn.onclick = () => this.showAchievementModal();
            
            achievementBtn.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                color: #333;
                border: none;
                padding: 10px 15px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                transition: transform 0.3s ease;
                z-index: 1000;
            `;
            
            achievementBtn.addEventListener('mouseenter', () => {
                achievementBtn.style.transform = 'scale(1.1)';
            });
            
            achievementBtn.addEventListener('mouseleave', () => {
                achievementBtn.style.transform = 'scale(1)';
            });
            
            document.body.appendChild(achievementBtn);
        }
    }
    
    // 显示成就模态框
    showAchievementModal() {
        const modal = document.createElement('div');
        modal.className = 'achievement-modal';
        modal.innerHTML = `
            <div class="achievement-modal-content">
                <div class="achievement-modal-header">
                    <h2><i class="fas fa-trophy"></i> 成就系统</h2>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="achievement-modal-body">
                    ${this.generateAchievementHTML()}
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // 生成成就HTML
    generateAchievementHTML() {
        const categories = {
            memory: '记忆配对',
            quiz: '问答挑战',
            word: '单词拼图',
            color: '颜色匹配',
            general: '综合成就'
        };
        
        let html = '';
        
        Object.keys(categories).forEach(category => {
            const categoryAchievements = Object.values(this.achievements)
                .filter(a => a.category === category);
            
            html += `
                <div class="achievement-category">
                    <h3>${categories[category]}</h3>
                    <div class="achievement-grid">
                        ${categoryAchievements.map(achievement => `
                            <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                                <div class="achievement-icon">${achievement.icon}</div>
                                <div class="achievement-info">
                                    <div class="achievement-name">${achievement.name}</div>
                                    <div class="achievement-description">${achievement.description}</div>
                                    ${achievement.unlocked ? `<div class="achievement-date">解锁于: ${new Date(achievement.unlockedAt).toLocaleDateString()}</div>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        return html;
    }
    
    // 更新成就显示
    updateAchievementDisplay() {
        const modal = document.querySelector('.achievement-modal');
        if (modal) {
            const body = modal.querySelector('.achievement-modal-body');
            body.innerHTML = this.generateAchievementHTML();
        }
    }
    
    // 检查记忆游戏成就
    checkMemoryGameAchievements(gameData) {
        this.unlockAchievement('memory_first_win');
        
        if (gameData.time <= 60) {
            this.unlockAchievement('memory_speed_demon');
        }
        
        if (gameData.mistakes === 0) {
            this.unlockAchievement('memory_perfect_game');
        }
    }
}

// 创建全局成就系统实例
window.achievementSystem = new AchievementSystem();

// 添加成就系统样式
const achievementStyles = document.createElement('style');
achievementStyles.textContent = `
    .achievement-modal-content {
        background: white;
        border-radius: 15px;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .achievement-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 15px 15px 0 0;
    }
    
    .achievement-modal-header h2 {
        margin: 0;
        font-size: 1.5rem;
    }
    
    .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .achievement-modal-body {
        padding: 20px;
    }
    
    .achievement-category {
        margin-bottom: 30px;
    }
    
    .achievement-category h3 {
        color: #333;
        border-bottom: 2px solid #e83e8c;
        padding-bottom: 10px;
        margin-bottom: 15px;
    }
    
    .achievement-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 15px;
    }
    
    .achievement-item {
        display: flex;
        align-items: center;
        padding: 15px;
        border-radius: 10px;
        transition: transform 0.3s ease;
    }
    
    .achievement-item.unlocked {
        background: linear-gradient(135deg, #d4edda, #c3e6cb);
        border: 2px solid #28a745;
    }
    
    .achievement-item.locked {
        background: #f8f9fa;
        border: 2px solid #dee2e6;
        opacity: 0.6;
    }
    
    .achievement-item:hover {
        transform: translateY(-2px);
    }
    
    .achievement-icon {
        font-size: 2rem;
        margin-right: 15px;
        min-width: 50px;
        text-align: center;
    }
    
    .achievement-info {
        flex: 1;
    }
    
    .achievement-name {
        font-weight: bold;
        font-size: 1.1rem;
        color: #333;
        margin-bottom: 5px;
    }
    
    .achievement-description {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 5px;
    }
    
    .achievement-date {
        color: #28a745;
        font-size: 0.8rem;
        font-style: italic;
    }
    
    .achievement-notification .achievement-content {
        display: flex;
        align-items: center;
    }
    
    .achievement-notification .achievement-icon {
        font-size: 2rem;
        margin-right: 15px;
    }
    
    .achievement-notification .achievement-title {
        font-weight: bold;
        font-size: 1.1rem;
        margin-bottom: 5px;
    }
    
    .achievement-notification .achievement-name {
        font-size: 1rem;
        margin-bottom: 3px;
    }
    
    .achievement-notification .achievement-desc {
        font-size: 0.9rem;
        opacity: 0.9;
    }
`;

document.head.appendChild(achievementStyles);