// 记忆配对游戏逻辑
document.addEventListener('DOMContentLoaded', function() {
    const memoryGame = document.getElementById('memory-game');
    const startButton = document.getElementById('start-game');
    const restartButton = document.getElementById('restart-game');
    const playAgainButton = document.getElementById('play-again');
    const timerElement = document.getElementById('timer');
    const movesElement = document.getElementById('moves');
    const resultModal = document.getElementById('result-modal');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const prizeDisplay = document.getElementById('prize-display');
    
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let matches = 0;
    let mistakes = 0;
    let timer = 60;
    let timerInterval;
    let gameStarted = false;
    
    // 游戏图标
    const icons = [
        'images/GAME01.png', 'images/GAME02.png', 'images/GAME03.png', 'images/GAME04.png', 
        'images/GAME05.png', 'images/GAME06.png', 'images/GAME07.png', 'images/GAME08.png'
    ];
    
    // 初始化游戏
    function initGame() {
        // 清空游戏区域
        memoryGame.innerHTML = '';
        
        // 创建卡片对（每个图标两张卡片）
        const gameIcons = [...icons, ...icons];
        
        // 随机排序图标
        shuffleArray(gameIcons);
        
        // 创建卡片元素
        gameIcons.forEach((icon, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.icon = icon;
            
            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            frontFace.innerHTML = `<img src="../${icon}" alt="Game Image" class="card-image">`;
            
            const backFace = document.createElement('div');
            backFace.classList.add('back-face');
            backFace.innerHTML = '<i class="fas fa-question"></i>';
            
            card.appendChild(frontFace);
            card.appendChild(backFace);
            
            card.addEventListener('click', flipCard);
            
            memoryGame.appendChild(card);
        });
        
        // 重置游戏状态
        moves = 0;
        matches = 0;
        mistakes = 0;
        timer = 60;
        movesElement.textContent = moves;
        timerElement.textContent = timer;
        
        cards = document.querySelectorAll('.memory-card');
    }
    
    // 开始游戏
    function startGame() {
        gameStarted = true;
        startButton.classList.add('hidden');
        restartButton.classList.remove('hidden');
        
        // 开始计时器
        timerInterval = setInterval(() => {
            timer--;
            timerElement.textContent = timer;
            
            if (timer <= 0) {
                clearInterval(timerInterval);
                endGame(false);
            }
        }, 1000);
    }
    
    // 重新开始游戏
    function restartGame() {
        clearInterval(timerInterval);
        resetBoard();
        initGame();
        startGame();
    }
    
    // 翻转卡片
    function flipCard() {
        if (!gameStarted) return;
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add('flip');
        
        if (!hasFlippedCard) {
            // 第一次点击
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        // 第二次点击
        secondCard = this;
        moves++;
        movesElement.textContent = moves;
        
        checkForMatch();
    }
    
    // 检查是否匹配
    function checkForMatch() {
        // 检查firstCard和secondCard是否存在
        if (!firstCard || !secondCard) {
            console.error('firstCard或secondCard为null');
            return;
        }
        
        const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
        
        if (isMatch) {
            matches++;
            
            // 添加匹配效果（在重置之前）
            const card1 = firstCard;
            const card2 = secondCard;
            
            card1.classList.add('matched');
            card2.classList.add('matched');
            
            // 禁用卡片
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            
            // 重置状态
            resetBoard();
            
            // 检查是否完成所有匹配
            console.log(`当前匹配数: ${matches}, 需要匹配数: ${icons.length}, 总卡片数: ${document.querySelectorAll('.memory-card').length}`);
            if (matches === icons.length) {
                console.log('游戏应该结束了！');
                clearInterval(timerInterval);
                setTimeout(() => {
                    endGame(true);
                }, 500);
            }
        } else {
            mistakes++;
            unflipCards();
        }
    }
    
    // 禁用已匹配的卡片
    function disableCards() {
        // 这个函数现在不再需要，因为逻辑已经移到checkForMatch中
        resetBoard();
    }
    
    // 翻回不匹配的卡片
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            if (firstCard && secondCard) {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }
            
            resetBoard();
        }, 1000);
    }
    
    // 重置翻牌状态
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    // 结束游戏
    function endGame(isWin) {
        gameStarted = false;
        
        if (isWin) {
            resultTitle.textContent = '恭喜你赢了！';
            resultMessage.textContent = `你用了${moves}步和${60 - timer}秒完成了所有配对！`;
            prizeDisplay.classList.remove('hidden');
            
            // 设置游戏为已完成（统一键名）
            localStorage.setItem('memoryGameCompleted', 'true');
            
            // 成就联动
            if (window.achievementSystem) {
                window.achievementSystem.checkMemoryGameAchievements({
                    time: 60 - timer,
                    mistakes: mistakes
                });
            }
        } else {
            resultTitle.textContent = '时间到！';
            resultMessage.textContent = '很遗憾，你没能在规定时间内完成所有配对。再试一次吧！';
            prizeDisplay.classList.add('hidden');
        }
        
        resultModal.classList.add('show');
    }
    
    // 辅助函数：随机排序数组
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // 事件监听
    startButton.addEventListener('click', () => {
        initGame();
        startGame();
    });
    
    restartButton.addEventListener('click', restartGame);
    
    playAgainButton.addEventListener('click', () => {
        resultModal.classList.remove('show');
        restartGame();
    });
    
    // 初始化游戏界面
    initGame();
});