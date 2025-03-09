// 游戏配置
const config = {
    width: 800,
    height: 600,
    fps: 60
};

// 游戏状态
let gameState = {
    score: 0,
    isGameOver: false,
    enemySpawnTimer: 0
};

// 玩家类
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 5;
    }

    update() {
        if (keys.ArrowLeft && this.x > 0) {
            this.x -= this.speed;
        }
        if (keys.ArrowRight && this.x < config.width - this.width) {
            this.x += this.speed;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 子弹类
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.speed = 7;
    }

    update() {
        this.y -= this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 敌人类
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = 2;
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 游戏对象
let canvas, ctx;
let player;
let bullets = [];
let enemies = [];
let keys = {};

// 初始化游戏
function initGame() {
    canvas = document.getElementById('canvas');
    canvas.width = config.width;
    canvas.height = config.height;
    ctx = canvas.getContext('2d');

    player = new Player(config.width / 2 - 25, config.height - 70);

    // 键盘事件监听
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if (e.key === ' ' && !gameState.isGameOver) {
            bullets.push(new Bullet(player.x + player.width / 2 - 2.5, player.y));
        }
        if (e.key === 'r' && gameState.isGameOver) {
            resetGame();
        }
    });

    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    gameLoop();
}

// 游戏循环
function gameLoop() {
    if (!gameState.isGameOver) {
        update();
    }
    draw();
    requestAnimationFrame(gameLoop);
}

// 更新游戏状态
function update() {
    player.update();

    // 更新子弹
    bullets = bullets.filter(bullet => bullet.y > 0);
    bullets.forEach(bullet => bullet.update());

    // 更新敌人
    enemies = enemies.filter(enemy => enemy.y < config.height);
    enemies.forEach(enemy => enemy.update());

    // 生成敌人
    gameState.enemySpawnTimer++;
    if (gameState.enemySpawnTimer >= 60) {
        const x = Math.random() * (config.width - 40);
        enemies.push(new Enemy(x, 0));
        gameState.enemySpawnTimer = 0;
    }

    // 检测碰撞
    checkCollisions();
}

// 碰撞检测
function checkCollisions() {
    // 子弹和敌人的碰撞
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (isColliding(bullet, enemy)) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                gameState.score += 10;
            }
        });
    });

    // 玩家和敌人的碰撞
    enemies.forEach(enemy => {
        if (isColliding(player, enemy)) {
            gameState.isGameOver = true;
        }
    });
}

// 碰撞检测辅助函数
function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// 绘制游戏画面
function draw() {
    // 清空画布
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, config.width, config.height);

    if (!gameState.isGameOver) {
        // 绘制游戏对象
        player.draw(ctx);
        bullets.forEach(bullet => bullet.draw(ctx));
        enemies.forEach(enemy => enemy.draw(ctx));

        // 绘制分数
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText(`分数: ${gameState.score}`, 10, 30);
    } else {
        // 绘制游戏结束画面
        ctx.fillStyle = 'red';
        ctx.font = '36px Arial';
        ctx.fillText(`游戏结束! 最终分数: ${gameState.score}`, config.width / 2 - 150, config.height / 2);
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText('按 R 键重新开始', config.width / 2 - 100, config.height / 2 + 40);
    }
}

// 重置游戏
function resetGame() {
    gameState.score = 0;
    gameState.isGameOver = false;
    gameState.enemySpawnTimer = 0;
    player = new Player(config.width / 2 - 25, config.height - 70);
    bullets = [];
    enemies = [];
}

// 启动游戏
window.onload = initGame;