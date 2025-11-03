// 游戏状态管理
document.addEventListener('DOMContentLoaded', function() {
    // 初始化游戏状态
    initGameStatus();
    
    // 检查是否所有游戏都已完成
    checkAllGamesCompleted();
});

// 初始化游戏状态和奖品显示
function initGameStatus() {
    const games = ['memory'];
    const statusMap = {
        'memory': 'memoryGameCompleted'
    };
    
    games.forEach(game => {
        // 从本地存储获取游戏状态（统一键名）
        const isCompleted = localStorage.getItem(statusMap[game]) === 'true';
        
        // 更新游戏状态显示（DOM id 统一为 <game>-status）
        const statusElement = document.getElementById(`${game}-status`);
        if (statusElement) {
            if (isCompleted) {
                statusElement.textContent = '已完成';
                statusElement.classList.add('completed');
            } else {
                statusElement.textContent = '未完成';
            }
        }
        
        // 更新奖品显示
        updatePrizeDisplay(game, isCompleted);
    });
}

// 更新奖品显示
function updatePrizeDisplay(game, isCompleted) {
    const prizeContainer = document.getElementById('prizes-container');
    const prizePlaceholder = prizeContainer.querySelector(`[data-game="${game}"]`);
    
    if (prizePlaceholder && isCompleted) {
        // 替换为对应的奖品图标
        prizePlaceholder.classList.remove('prize-placeholder');
        prizePlaceholder.classList.add('prize-item');
        
        // 根据游戏类型设置不同的奖品图标（使用 Font Awesome 5 通用图标）
        let prizeIcon = '';
        switch(game) {
            case 'memory':
                prizeIcon = '<i class="fas fa-birthday-cake"></i>';
                break;
        }
        
        prizePlaceholder.innerHTML = prizeIcon;
    }
}

// 检查是否所有游戏都已完成
function checkAllGamesCompleted() {
    const games = ['memory'];
    const statusMap = {
        'memory': 'memoryGameCompleted'
    };
    const allCompleted = games.every(game => 
        localStorage.getItem(statusMap[game]) === 'true'
    );
    
    // 如果所有游戏都已完成，显示最终奖励区域，同时触发综合成就检查
    if (allCompleted) {
        const finalPrizeSection = document.getElementById('final-prize-section');
        if (finalPrizeSection) {
            finalPrizeSection.classList.remove('hidden');
        }
        if (window.achievementSystem) {
            window.achievementSystem.checkGeneralAchievements && window.achievementSystem.checkGeneralAchievements();
        }
    }
}

// 设置游戏完成状态的函数（供各个游戏页面调用）
function setGameCompleted(gameType) {
    const statusMap = {
        'memory': 'memoryGameCompleted'
    };
    const key = statusMap[gameType];
    if (key) {
        localStorage.setItem(key, 'true');
    }
}