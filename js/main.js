let turn = 'x';
var title = document.querySelector('.title')
let squares = [];

// ده الكسابن
function end(num1,num2,num3){
     title.innerHTML = `${'you'} win`;
 document.getElementById('item' +num1). style.background ='#00ff04ff';
 document.getElementById('item' +num2). style.background ='#00ff04ff';
 document.getElementById('item' +num3). style.background ='#00ff04ff';

 setInterval(function(){title.innerHTML += '.'},1000)
 setTimeout(function(){location.reload()},3000 )
}


// حالة الخسارة / التعادل
function lose(){
    title.innerHTML = `You Lose`;
    // فتح كل البوكسات باللون الأحمر
    for(let i=1; i<10; i++){
        document.getElementById('item'+i).style.background = '#ff0000';
    }
    setInterval(function(){title.innerHTML += '😭'},1000)
    setTimeout(function(){location.reload()},3000 )
}


function winnner()
{



for(let i = 1; i<10;i++)
{  
 squares[i] = document.getElementById('item' + i).innerHTML;
}

if(squares[1] == squares[2] && squares[2] == squares[3] && squares[1] != '')
{
end(1,2,3);
}
else if(squares[7] == squares[8] && squares[8] == squares[9] && squares[8] != '')
    {
end(7,8,9);
    }
    else if(squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != '')
    {
end(1,4,7);
    }
        else if(squares[4] == squares[5] && squares[5] == squares[6] && squares[5] != '')
    {
end(4,5,6);
    }
        else if(squares[2] == squares[5] && squares[5] == squares[8] && squares[5] != '')
    {
end(2,5,8);
    }
        else if(squares[3] == squares[6] && squares[6] == squares[9] && squares[6] != '')
    {
end(3,6,9);
    }
        else if(squares[1] == squares[5] && squares[5] == squares[9] && squares[1] != '')
    {
end(1,5,9);
    }
        else if(squares[3] == squares[5] && squares[5] == squares[7] && squares[5] != '')
    {
end(3,5,7);
    }
    else {
        // هنا الشرط لو مفيش ولا واحدة فاضية ومفيش كسبان
        if(squares.every((sq, i) => i === 0 || sq !== '')) {
            lose();
        }

    }
}

function game(id)
{
    let element = document.getElementById(id);

    // اللاعب X (أنت فقط)
    if (turn === 'x' && element.innerHTML == '')
    {
        element.innerHTML = 'X';
        turn = 'o';

        winnner();

        // تشغيل الروبوت بعد حركة اللاعب
        setTimeout(aiMove, 400);
    }
}
function aiMove() {
    let empty = [];

    for (let i = 1; i < 10; i++) {
        let cell = document.getElementById('item' + i);
        if (cell.innerHTML === '') {
            empty.push(i); // نخزن الرقم مش العنصر
        }
    }

    if (empty.length === 0) return;

    let move;

    // 🧠 50% ذكاء - 50% عشوائي
    let smart = Math.random() < 0.5;

    if (smart) {
        // 1) لو يقدر يكسب يعملها
        move = findBestMove('O');

        // 2) لو مفيش فرصة كسب، حاول يمنعك تكسب
        if (move === null) {
            move = findBestMove('X');
        }

        // 3) لو مفيش حاجة، عشوائي
        if (move === null) {
            move = empty[Math.floor(Math.random() * empty.length)];
        }
    } else {
        // عشوائي
        move = empty[Math.floor(Math.random() * empty.length)];
    }

    document.getElementById('item' + move).innerHTML = 'O';
    turn = 'x';

    winnner();
}
function findBestMove(player) {
    const winPatterns = [
        [1,2,3],[7,8,9],[1,4,7],
        [4,5,6],[2,5,8],[3,6,9],
        [1,5,9],[3,5,7]
    ];

    for (let pattern of winPatterns) {
        let [a,b,c] = pattern;

        let valA = document.getElementById('item' + a).innerHTML;
        let valB = document.getElementById('item' + b).innerHTML;
        let valC = document.getElementById('item' + c).innerHTML;

        // لو في خط فيه مكان فاضي + اتنين نفس اللاعب
        if (valA === player && valB === player && valC === '') return c;
        if (valA === player && valC === player && valB === '') return b;
        if (valB === player && valC === player && valA === '') return a;
    }

    return null;
}


winnner();
function end(num1,num2,num3){

    let winner = document.getElementById('item' + num1).innerHTML;

    if(winner === 'X'){
        title.innerHTML = 'You Win 🎉';
    }else{
        title.innerHTML = 'You Lose 😭';
    }

    document.getElementById('item' + num1).style.background ='#00ff04';
    document.getElementById('item' + num2).style.background ='#00ff04';
    document.getElementById('item' + num3).style.background ='#00ff04';

    setInterval(function(){
        title.innerHTML += '.';
    },1000);

    setTimeout(function(){
        location.reload();
    },3000);
}
if(squares.every((sq, i) => i === 0 || sq !== '')) {

    title.innerHTML = 'Draw 🤝';

    for(let i=1; i<10; i++){
        document.getElementById('item'+i).style.background = '#ffaa00';
    }

    setTimeout(function(){
        location.reload();
    },3000);
}