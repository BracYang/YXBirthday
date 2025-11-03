// 网站配置文件 - 修改此文件来更新网站内容
const websiteConfig = {
    // 网站标题和副标题
    title: "生日快乐宝贝！",
    //subtitle: "爱你爱你爱你！",
    
    // 生日日期 (YYYY-MM-DD 格式)
    birthdayDate: "2024-11-01",
    
    // 照片墙配置 - 自定义照片墙显示数量和方式
    photoWallConfig: {
        // 显示照片数量 - 可以设置为任意数字，会从photoWall数组中取前N张照片
        // 如果设置为0或不设置，则显示所有照片
        // 示例：
        // displayCount: 0,    // 显示所有照片（默认）
        // displayCount: 3,    // 只显示前3张照片
        // displayCount: 4,    // 只显示前4张照片
        displayCount: 0,
        
        // 是否随机显示照片（当displayCount小于总照片数时）
        // true: 从所有照片中随机选择指定数量的照片
        // false: 按顺序显示前N张照片（默认）
        randomDisplay: false
    },
    
    // 照片墙数据 - 添加或修改照片信息
    photoWall: [
        { 
            src: 'images/816YC.jpg', 
            title: '夏天',
            date: '2025-08-16',
            description: '夏天 阳光 泳池 笑容 你',
            size: 'large',
            rotation: -3
        },
        { 
            src: 'images/816MS.jpg', 
            title: '一起',
            date: '2025-08-16',
            description: '上山下海看剧旅游，我们还有好多好多要去的地方',
            size: 'medium',
            rotation: 5
        },
        { 
            src: 'images/DYCKR.jpg', 
            title: '日常',
            date: '2025-05-25',
            description: '吃饭的时候还是爱看你',
            size: 'small',
            rotation: -2
        },
        { 
            src: 'images/1031HGJ.jpg', 
            title: '就吃一点点',
            date: '2025-10-30',
            description: '一起变胖！',
            size: 'large',
            rotation: 4
        },
        { 
            src: 'images/520LW.jpg', 
            title: '感动',
            date: '2025-05-20',
            description: '不来接我你会后悔的，我家宝宝如是说',
            size: 'large',
            rotation: -1
        },
        { 
            src: 'images/0704YYJ.jpg', 
            title: '嗨起来',
            date: '2025-07-04',
            description: '一起一起 这里那里',
            size: 'medium',
            rotation: 3
        }
    ],
    
    // 留言内容 - 修改你想对她说的话
    message: {
        greeting: "哎呦喂",
        content: [
            "今天谁过生日啊",
            "是我家伊雪！",
            "生日快乐宝贝儿",
            "这是我们第一次一起过哎，祥瑞之兆",
            "我们一起走过山趟过水，看过星空淋过雨，吃过最嫩的牛肉，摔过最狠的跤，泡过温泉喝过酒",
            "最让我开心的是，遇到了对的人",
            "有人说过如果你遇到一个可以随意在他面前放臭屁的人，那就是对的人",
            "哈哈哈哈我就是这个人",
            "门口的树叶已经黄灿灿了",
            "接下来我们要一起看雪",
            "去年的这个时候我还在给自己录伤感视频",
            "今年根本没有时间，所有时间都用来大笑和疯癫",
            "谢谢你，谢谢自己",
            "因为你，我对这个世界有了很多期待",
            "因为你，我对这个世界少了很多恐惧",
            "生日快乐宝贝儿，这辈子请多指教啦"
        ],
        signature: "杨帆"
    },
    
    // 时间线数据 - 添加或修改你们的故事
    timelineEvents: [
        { date: '我们相识的日子', content: '那天，我们的故事开始了...' },
        { date: '第一次约会', content: '记得那天你穿着漂亮的裙子，我们一起看了电影...' },
        { date: '第一次旅行', content: '我们一起去了那个美丽的地方，留下了美好的回忆...' },
        { date: '特别的日子', content: '那是个特别的日子，我们...' },
        { date: '今天', content: '祝你生日快乐！愿我们的故事继续...' }
    ],
    
    // 背景音乐设置
    music: {
        src: "#", // 替换为你的音乐文件路径，例如 "music/background.mp3"
        autoplay: true,
        volume: 0.5
    },
    
    // 页脚信息
    footer: {
        text: ""
    },
    
    // 样式设置
    style: {
        primaryColor: "#e83e8c", // 主题色
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" // 背景渐变
    }
};

// 不要修改这一行，它用于导出配置
if (typeof module !== 'undefined') {
    module.exports = websiteConfig;
}
