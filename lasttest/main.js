const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const btnStart = $(".btn__start");
const btnReset = $(".reset");
const dicesItem = $$(".figure:not(.figure--small) .figure__item");
const dices = $$(".figure--small .figure__item");
var figures = [
    {
        index: 0,
        image: 'image/bau.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 1,
        image: 'image/ca.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 2,
        image: 'image/cua.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 3,
        image: 'image/tom.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 4,
        image: 'image/huou.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 5,
        image: 'image/ga.png',
        percent: 16.6666,
        coin: 0,
    },
];
// Khởi tạo trò chơi
var user = {
    coin: 3,
    betTable: 1
}
function updateData() {
    
    var headerBet = $('.header__bet');
    var headerMoney = $('.header__money');
    
    dicesItem.forEach((e, index) => {
        var img = e.querySelector('.figure__item--group img');
        var labelCoin = e.querySelector('.figure__item--group label');
        img.src = figures[index].image;
        labelCoin.innerHTML = figures[index].coin;
    });
}
updateData();
// Lấy ngẫu nhiên một phần tử trong danh sách figures theo tỉ lệ
var randomFigure = () => {
    var value = Math.random() * 100;
    var sum = 0;
    var element;
    for (var i = 0; i < figures.length; i++) {
        sum += figures[i].percent;
        if (sum > value) {
            element = figures[i];
            break;
        }
    }
    return element;
}
// Xử lý lắc xúc sắc
btnStart.onclick = () => {
    // Kiểm tra người chơi đã đặt cược chưa?
    var flag = false;
    for (var i = 0; i < figures.length; i++)
        if (figures[i].coin > 0) {
            flag = true;
            break;
        }
    if (!flag)
        return;
    var wins = [];
    var t = 0;
    var timer = setInterval(() => {
        t += 100;
        if (t >= 500) {
            clearInterval(timer);
            winOfLose(wins);
        } else {
            wins = [randomFigure(), randomFigure(), randomFigure()];
            dices[0].querySelector('img').src = wins[0].image;
            dices[1].querySelector('img').src = wins[1].image;
            dices[2].querySelector('img').src = wins[2].image;
        }
    }, 100);
}
btnReset.onclick = () => {
    
}

// Đặt tiền
dicesItem.forEach((e) => {
    e.onclick = (e) => {
        if (user.coin >= user.betTable) {
            var item = e.target.parentElement.parentElement;
            user.coin -= user.betTable;
            figures[item.dataset.id].coin += user.betTable;
            updateData();
        }
    }
})

// Xử lý thắng thua
function winOfLose(wins) {
    var winCoin = 0;
    for (var i = 0; i < wins.length; i++) {
        for (var j = 0; j < figures.length; j++) {
            if (wins[i].index == figures[j].index) {
                winCoin += wins[i].coin * 2;
            }
        }
    }
    for (var j = 0; j < figures.length; j++) {
        figures[j].coin = 0;
    }
    user.coin += winCoin;
    updateData();
    if (winCoin > 0)
        alert("Bạn thắng " + winCoin + " đồng");
}