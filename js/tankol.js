//枚举常量
var TANKOL_STATE = {
        playing:1,
        init:2,
        loading:3,
        over:4,
        select:5,
        start:6
    },
    TANKOL_KEY = {
        k_up : 38,
        k_down : 40,
        k_right : 39,
        k_left : 37,
        k_space : 32,
        k_tab : 9,
        k_enter : 13,
        k_ctrl : 17,
        k_alt : 18,
        k_0 : 48,
        k_1 : 49,
        k_2 : 50,
        k_3 : 51,
        k_4 : 52,
        k_5 : 53,
        k_6 : 54,
        k_7 : 55,
        k_8 : 56,
        k_9 : 57,
        k_a : 65,
        k_b : 66,
        k_c : 67,
        k_d : 68,
        k_e : 69,
        k_f : 70,
        k_g : 71,
        k_h : 72,
        k_i : 73,
        k_j : 74,
        k_k : 75,
        k_l : 76,
        k_m : 77,
        k_n : 78,
        k_o : 79,
        k_p : 80,
        k_q : 81,
        k_r : 82,
        k_s : 83,
        k_t : 84,
        k_u : 85,
        k_v : 86,
        k_w : 87,
        k_x : 88,
        k_y : 89,
        k_z : 90
    },
    TANKOL_MAP = {
        non : 0,
        wall : 1,
        grid : 2,
        grass : 3,
        water : 4,
        ice : 5,
        boss : 9
    },
    TANKOL_TANK_TYPE = {
        player:1,
        computer:2,
        remote:3
    },
    TANKOL_TANK_DIRECT = {
        up : 0,
        down : 1,
        left : 2,
        right : 3
    },
    TANKOL_TIMER;

//皮肤 ==================================================================================
function GameSkin(){
    this._intro_img64 = "data:image/gif;base64,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";
    this._skin = new Image();
    this._skin.src = "img/skin.gif";
    this.position = new Array();
    with(this){
        position["cursor"] = [128,96];
        position["level"] = [396,96];
        position["level_num"] = [256,96];
        position["boss"] = [256,0];
        position["map"] = [0,96];
        position["player1"] = [0,0];
        position["player2"] = [128,0];
        position["tank1"] = [0,32];
        position["tank2"] = [128,32];
        position["tank3"] = [0,64];
        position["tank4"] = [128,64];
        position["tank5"] = [256,64];
        position["anime_1"] = [256,32];
        position["anime_2"] = [0,160];
        position["aureole"] = [160,96];  //光环
        position["bullet"] = [80,96];
        position["bulletanime"] = [320,0]; //子弹动画

        position["tankNum"] = [0,112];
        position["food"] = [256,110];
        position["score"] = [192,96];
        position["gameOver"] = [384,64];
    }

    this.getintro_img = function(){
        return this._intro_img64;
    }

    this.getImages = function(key){
        if(!key){
            return this.position;
        }else{
            if(this.position.hasOwnProperty(key)){
                return this.position[key];
            }else{
                return null;
            }
        }
    }

    this.getSkin  = function(){
        return this._skin;
    }

}



//屏幕对象 ==================================================================================
function GameScreen()
{
    this.x = 0;
    this.y = gameCfg.height;
    this.bgcolor = "#fff";
    this.elm = gameCanvas.getElm("screen");
    this.intro_img = new Image();
    this.intro_img.src = gameSkin.getintro_img();
}


GameScreen.prototype.draw = function()
{
    var g = this.elm.getContext("2d");
    if(this.y == gameCfg.width)
    {
        g.fillStyle = this.bgcolor;
        g.fillRect(0, 0, gameCfg.width, gameCfg.height);
    }
    g.drawImage(this.intro_img, this.x, this.y, gameCfg.width, gameCfg.height);
    if(this.y <= 0) 
    {
        this.y = 0;
        g.drawImage(this.intro_img, this.x, this.y, gameCfg.width, gameCfg.height);
        g.fillStyle = this.bgcolor;
        var s = gameState.setState("select");
        if(!s){ console.warn("更改状态失败");}
        this.y = gameCfg.width;
    }
    this.y -= 55;
}


//光标 ==================================================================================
function GameCursor()
{
    this.left = parseInt(gameCfg.width*0.25);    
    this._ys = [
        parseInt(gameCfg.height*0.55), 
        parseInt(gameCfg.height*0.63), 
        parseInt(gameCfg.height*0.7)
    ];

    //this.elm = document.getElementById(id);
    this.elm = gameCanvas.getElm("scene");
    this._num = 0;
    this._time = 0;
    this.xy = gameSkin.getImages("cursor");
    this.wh = [27,27];

    this.getNum = function(){
        return this._num;
    }

}

GameCursor.prototype.draw = function(){
    var g = this.elm.getContext("2d");
    var img = gameSkin.getSkin();
    this._time ++;
    var temp;
    temp = ( parseInt(this._time / 6) % 2 == 0)?0:27;
    g.drawImage(img, this.xy[0],this.xy[1] + temp, this.wh[0],this.wh[1], this.left, this._ys[this._num], this.wh[0],this.wh[1] )
}

GameCursor.prototype.destroy = function(){
    var g = this.elm.getContext("2d");
    g.clearRect(this.left, this._ys[this._num], this.wh[0],this.wh[1]);
    gameState.setGameMode(this._num);
    this._time = 0;
    this._num = 0;
}

GameCursor.prototype.next = function(n){
    var g = this.elm.getContext("2d");
    g.clearRect(this.left, this._ys[this._num], 27, 27);
    if(n == 1) 
    {
        if(this._num == 2) 
        {
            this._num = 0;
            return;
        }
        this._num ++;
    }
    else 
    {
        if(this._num == 0) 
        {
            this._num = 2;
            return;
        }
        this._num --;
    }
}




//状态对象  ==================================================================================
function GameState(){
    this._state = TANKOL_STATE.start;
    this._game_mode = 0;
    this.gameLevel = new GameLevel(this._level);

    this.key_down = new Array();

    this.getGameMode = function(){
        return this._game_mode;
    }

    this.setGameMode = function(mode){
        this._game_mode = mode;
        return;
    }


    this.setState = function(state){
        if(!state){return false;}
        else{
            if(!TANKOL_STATE.hasOwnProperty(state)){
                return false;
            }else{
                this._state = TANKOL_STATE[state];
                return true;
            }
        }
    }

    this.getState = function(){
        return this._state;
    }


    this.setLevel = function(l){
        this.gameLevel.level = l;
        return;
    }

    this.getLevel = function(){
        return this.gameLevel.level;
    }

}




GameState.prototype.gameInit = function()
{
    var game_mode = gameState.getGameMode();

    //根据游戏模式初始化
    switch(game_mode){
        case 1 : 
            var opts = {
                    x    : 256,
                    y    : 385,
                    name : "player2",
                    type : TANKOL_TANK_TYPE['player'],
                    model:'2'
                };
            gameFactory.createTank(opts);
        case 0: 

            var opts = {
                    x    : 129,
                    y    : 385,
                    name : "player1",
                    type : TANKOL_TANK_TYPE['player'],
                    model:'1'
                };
            gameFactory.createTank(opts);
            gameFactory.initComputerTanks();

        break;

        case 2:

        break
    }

    gameScene.init();
    return;
}

//游戏级别切换 ===============================================================================
 function GameLevel(){
    this.level = 1;
    this.tanks_battles = [
            null,
            [1,1,1,4,5,1],
            [3,2,1,4,5,1]
        ];
    this.maps = [
        null,
        [
            [0,0,0,0,0,0,2,2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,2,2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,2,2,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
            [0,0,1,1,0,0,2,2,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
            [0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,2,2,1,1,0,0],
            [0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,2,2,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0],
            [3,3,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,1,1,3,3,1,1,2,2],
            [3,3,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,1,1,3,3,1,1,2,2],
            [3,3,3,3,0,0,0,0,0,0,1,1,0,0,0,0,2,2,0,0,3,3,0,0,0,0],
            [3,3,3,3,0,0,0,0,0,0,1,1,0,0,0,0,2,2,0,0,3,3,0,0,0,0],
            [0,0,1,1,1,1,1,1,3,3,3,3,3,3,2,2,0,0,0,0,3,3,1,1,0,0],
            [0,0,1,1,1,1,1,1,3,3,3,3,3,3,2,2,0,0,0,0,3,3,1,1,0,0],
            [0,0,0,0,0,0,2,2,3,3,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
            [0,0,0,0,0,0,2,2,3,3,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
            [2,2,1,1,0,0,2,2,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0],
            [2,2,1,1,0,0,2,2,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0],
            [0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,2,2,1,1,0,0],
            [0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,2,2,1,1,0,0],
            [0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,0,0],
            [0,0,1,1,0,0,1,1,0,0,0,1,9,8,1,0,0,0,1,1,1,1,1,1,0,0],
            [0,0,1,1,0,0,1,1,0,0,0,1,8,8,1,0,0,0,1,1,1,1,1,1,0,0]
        ]
    ];
 }   

GameLevel.prototype.getCurrentMap   = function(){

    return this.maps[this.level];

}

GameLevel.prototype.getCurrentTanksBattle   = function(){

    return this.tanks_battles[this.level];
}


GameLevel.prototype.draw = function(id, x, y, num, type){
    //var elm = document.getElementById(id);
    var elm = gameCanvas.getElm(id);
    var g = elm.getContext("2d");
    var img = gameSkin.getSkin();
    
    if(num < 0) {num = 0;}
    var temp = num;
    var len = 0;
    var no = 0;
    var numx = gameSkin.getImages("level_num")[0];
    var numy = gameSkin.getImages("level_num")[1];
    if(type && num != 0)
    {
        while( temp != 0 )
        {
            temp =parseInt(temp / 10) ;
            len ++;
        }   
        x += ( (len - 1)  * 16 - 2 );
    }
    do
    {
        no = num % 10 ;
        g.clearRect(x , y , 14, 14) ;    
        g.drawImage(img,no * 14 + numx, numy, 14, 14, x ,y , 14, 14) ;   
        x -= 16 ;
        num = parseInt(num / 10);
    }while( num != 0 );
    
    return;
};



//场景切换 ===============================================================================
function GameScene()
{
    this._time = 0;
    this._temp = 0;
    this._px_per_time = 0;
    this._stand_times = 0;
    this._move_times = 0;
    this.bgcolor = "#7f7f7f";
    //this.elm = document.getElementById(id);
    this.elm = gameCanvas.getElm("scene");
    this.level = gameState.getLevel();
}



GameScene.prototype.init = function(){
    //通过设定move时间计算相关参数
    var move_time = 200,              //过场总计400毫秒 
        standing_time = 100,           //停留1000毫秒
        frame_rate = gameCfg.refresh_rate,
        move_times = move_time/frame_rate,
        stand_times = standing_time/frame_rate,
        px_per_time = (gameCfg.height/2)/move_times;

    this._time = 0;
    this._temp = 0;
    this._px_per_time = parseInt(px_per_time)+1;
    this._stand_times = stand_times;
    this._move_times = move_times;

    var s = gameState.setState("loading");
    if(!s){console.error("变更状态失败!");}
}


GameScene.prototype.draw = function(){
    var time = this._time,
        px_per_time = this._px_per_time,
        stand_times = this._stand_times,
        move_times = this._move_times,
        temp = this._temp,
        g = this.elm.getContext("2d"),
        img = gameSkin.getSkin();

        g.fillStyle = this.bgcolor;
    
    if( time <= move_times ){
        g.fillRect(0, temp, gameCfg.width, px_per_time);
        g.fillRect(0, gameCfg.height - temp - px_per_time , gameCfg.width, px_per_time);
        this._temp+=px_per_time;
    }else if(time > move_times && time < (move_times)+stand_times ){
        var x = gameSkin.getImages("level")[0];
        var y = gameSkin.getImages("level")[1];
        if(this.level) 
        {   //194 208
            g.drawImage(img, x, y, 78, 14, parseInt(0.38 * gameCfg.width), parseInt(0.46 * gameCfg.height), 78, 14);
            gameState.gameLevel.draw("scene", parseInt(0.38 * gameCfg.width)+120, parseInt(0.46 * gameCfg.height), this.level, false);  
        }
        this._temp = gameCfg.height/2;
    }else if( time <= (stand_times+move_times*2) ){
        g.clearRect(0, temp-px_per_time, gameCfg.width, px_per_time);
        g.clearRect(0, gameCfg.height - temp, gameCfg.width, px_per_time);
        this._temp-=px_per_time;
    }else{
        gameSound.play("start");
        gameState.setState("playing");
        gameMap = new GameMap();
        gameMap.draw();
        return;
    }
    this._time++;
}



//地图对象 ==================================================================================

function GameMap(){
    this.elm = gameCanvas.getElm("map");
    this._current_map_data = gameState.gameLevel.getCurrentMap();
}

GameMap.prototype.draw = function(){
    var elm = this.elm,
        map = this._current_map_data,
        width =  gameCfg.width,
        height = gameCfg.height,
        g = elm.getContext("2d"),
        offerX =  gameCfg.padding_x,
        offerY =  gameCfg.padding_y,
        cell_size   =  gameCfg.cell_size,
        cell_x   =  gameCfg.cell_x,
        cell_y   =  gameCfg.cell_y,
        img = gameSkin.getSkin();

    var elm_bg = gameCanvas.getElm("background"),
        g_bg  = elm_bg.getContext("2d");
    g_bg.fillStyle = "#7f7f7f";
    g_bg.fillRect(0,0,width,height);
    g_bg.fillStyle = "#000";
    g_bg.fillRect(offerX,offerY,height-offerY*2,height-offerY*2);
    

    //测试网格
    var test_img = new Image();
    test_img.src = "img/test.gif";
    //g_bg.drawImage(test_img,0,0);
    //return;


    var mapx = gameSkin.getImages("map")[0];
    var mapy = gameSkin.getImages("map")[1];
    
    var homex = gameSkin.getImages("boss")[0];
    var homey = gameSkin.getImages("boss")[1];

    /*       
        non : 0,
        wall : 1,
        grid : 2,
        grass : 3,
        water : 4,
        ice : 5,
        boss : 9
    */
    //每一格为16*16
    for(var i=0;i<cell_x;i++)
    {
        for(var j=0;j<cell_y;j++)
        {   
            if(map[i][j] == TANKOL_MAP['wall']) 
            {   
                g.drawImage(img,mapx, mapy,cell_size,cell_size,j*cell_size + offerX, i*cell_size + offerY,cell_size,cell_size) ;
            }
            else if(map[i][j]== TANKOL_MAP['grid']) 
            {
                g.drawImage(img,cell_size + mapx, mapy,cell_size,cell_size,j*cell_size + offerX, i*cell_size + offerY,cell_size,cell_size) ;
            }
            else if(map[i][j]== TANKOL_MAP['water'])
            {
                g.drawImage(img,cell_size*3 + mapx, mapy,cell_size,cell_size,j*cell_size + offerX, i*cell_size + offerY,cell_size,cell_size) ;
            }
            else if(map[i][j]== TANKOL_MAP['ice']) 
            {
                g.drawImage(img,cell_size*4 + mapx, mapy,cell_size,cell_size,j*cell_size + offerX, i*cell_size + offerY,cell_size,cell_size) ;
            }
            else if(map[i][j]== TANKOL_MAP['boss'])
            {
                g.drawImage(img,0 + homex, homey, cell_size*2, cell_size*2, j*cell_size + offerX, i*cell_size + offerY, cell_size*2, cell_size*2) ;
            }else if(map[i][j]== TANKOL_MAP['grass'])
            {
                var g_mask = gameCanvas.getElm("mask").getContext("2d");
                g_mask.drawImage(img,cell_size*2 + mapx, mapy, cell_size, cell_size, j*cell_size + offerX, i*cell_size + offerY, cell_size, cell_size) ;
            }
            /*
            else if(map[i][j]==10)
            {
                g.drawImage(img, 0 + mapx, mapy, 16, 8, j*16 + offerX, i*16 + offerY, 16, 8) ;
            }
            else if(map[i][j]==11)
            {
                g.drawImage(img, 0 + mapx, 8 + mapy, 16, 8, j*16 + offerX,i*16+8 + offerY, 16, 8) ;
            }
            else if(map[i][j]==12)
            {
                g.drawImage(img, 0 + mapx, mapy, 8,16, j*16 + offerX, i*16 + offerY, 8, 16) ;
            }
            else if(map[i][j]==13)
            {
                g.drawImage(img, 8 + mapx, mapy, 8, 16, j*16+8 + offerX, i*16 + offerY, 8, 16) ;
            }
            else if(map[i][j]==88)
            {
                g.drawImage(img, 32 + mapx, mapy, 32, 32, j*16 + offerX, i*16 + offerY, 32, 32) ;
            }
            */
        }
    }
}




function GameCanvas(){
    this.canvas = ['scene','screen','actor','map','mask','background'];
    this.elm    = {};
    for (var i = 0; i < this.canvas.length; i++) { 
        var key = this.canvas[i],elm;
         elm = document.getElementById(key);
         elm.width = gameCfg.width;
         elm.height = gameCfg.height;
         this.elm[key] = elm;
    }
}

GameCanvas.prototype.getElm  = function(key){
    return this.elm[key];
}



//清理画布  ==================================================================================
function GameClear(){ 


}

GameClear.prototype.clearCanvas = function(id){
    var elm = gameCanvas.getElm(id);
    var g = elm.getContext("2d");
    var width  = elm.width;
    var height = elm.height;
    g.clearRect(0,0,width,height);  
}






function GameCfg(){
    this.width  = 512;
    this.height = 448;
    this.refresh_rate = 20;
    this.padding_x = 32;
    this.padding_y = 16;
    this.cell_size = 16;
    this.cell_x = 26;
    this.cell_y = 26;
    //TANKOL_REFRESH_RATE = 20,
    //TANKOL_SCREEN = [512,448],
}






//音效师 ==================================================================================
function GameSound(){
    this.play = function(name){
        var audio = document.getElementById(name);
        //audio.play();
    };
}


//绘制管理员类 ==================================================================================

function GameM(){

    this.draw = function(){
        gameClear.clearCanvas("actor");
        this.drawTanks();
        this.drawBullets();
    }

    this.update = function(){
        this.updateTanks();
        this.updateBullets();
        this.updateControl();
    }
}

GameM.prototype.drawTanks  = function(){

    var tanks = gameFactory.tanks;
    for (var i = 0; i < tanks.length; i++) {
        if(tanks[i].anime && tanks[i].anime.state){
            tanks[i].anime.draw("actor"); 
        }else if(tanks[i].life > 0 ){
            tanks[i].draw("actor"); 
        }
    };

}   

GameM.prototype.drawBullets  = function(){

    var bullets = gameFactory.bullets;
    for (var i = 0; i < bullets.length; i++) {
        if(bullets[i].anime && bullets[i].anime.state){
            bullets[i].anime.draw("actor");
        }else if(bullets[i].live > 0){
            bullets[i].draw("actor");
        }
    };
}



GameM.prototype.updateTanks = function(){

    var tanks = gameFactory.tanks;
    for (var i = 0; i < tanks.length; i++) {

        if(tanks[i].anime && tanks[i].anime.state){
            tanks[i].anime.update(); 
        }else if( tanks[i].life > 0 ){
            tanks[i].update(); 
        }else{
            tanks.splice(i,1);
        }
    };

}


GameM.prototype.updateBullets  = function(){
    var bullets = gameFactory.bullets;
    for(var i = 0;i < bullets.length;i++)
    {
        if(bullets[i].anime && bullets[i].anime.state){
            bullets[i].anime.update();
        }else if(bullets[i].live > 0){
            bullets[i].fly(i);
        }else{
            bullets.splice(i,1);
        }

    }

}  


//操作相关控制项
GameM.prototype.updateControl = function(){
    var players  = gameFactory.players,
        key_down  = gameState.key_down;
    for(var i = 0; i < players.length; i ++){
        if(players[i].live == 0) {continue;}
        if(players[i].name == "player1"){
            var player1 = players[i];
            if(key_down[TANKOL_KEY['k_up']]) {player1.move(TANKOL_TANK_DIRECT.up);}
            else if(key_down[TANKOL_KEY['k_down']]) {player1.move(TANKOL_TANK_DIRECT.down);}
            else if(key_down[TANKOL_KEY['k_left']]) {player1.move(TANKOL_TANK_DIRECT.left);}
            else if(key_down[TANKOL_KEY['k_right']]) {player1.move(TANKOL_TANK_DIRECT.right);}
            if(key_down[TANKOL_KEY['k_space']] || key_down[TANKOL_KEY['k_enter']]) {player1.fire();}
        }else if(players[i].name == "player2"){
            var player2 = players[i];
            if(key_down[TANKOL_KEY['k_w']]) {player2.move(TANKOL_TANK_DIRECT.up);}
            else if(key_down[TANKOL_KEY['k_s']]) {player2.move(TANKOL_TANK_DIRECT.down);}
            else if(key_down[TANKOL_KEY['k_a']]) {player2.move(TANKOL_TANK_DIRECT.left);}
            else if(key_down[TANKOL_KEY['k_d']]) {player2.move(TANKOL_TANK_DIRECT.right);}
            if(key_down[TANKOL_KEY['k_j']]) {player2.fire();}
        }
    }
}




//工厂类 ==================================================================================
function GameFactory(){
    this.players    = new Array();
    this.tanks      = new Array();
    this.tankAnimes = new Array();
    this.bullets     = new Array();
    this.bulletanimes= new Array();
    this.bombs       = new Array();

    this.tank_battle =  new Array();
}

//tank 专用工厂
GameFactory.prototype.createTank    =  function(opts){
    var type = opts['type'],
        tank,
        tankAnime;
    if(type === TANKOL_TANK_TYPE['player'] ){
        tank = new PlayerTank(opts);
        this.players.push(tank);
    }else if(type === TANKOL_TANK_TYPE['computer']){
        tank = new ComputerTank(opts);
        tank.anime = new TankAnime_1(opts.x,opts.y,"anime_1",32);
        //this.tankAnimes.push(tankAnime);
    }else if(type === TANKOL_TANK_TYPE['remote']){

    }else{
        return;
    }
    //实例化成功就将其放入队列
    if(tank){
         this.tanks.push(tank);   
    }
}

//bullet 专用工厂
GameFactory.prototype.createBullet    =  function(opts){
    var bullet = new Bullet(opts);
    if(bullet){
         this.bullets.push(bullet);   
     }
     //debugger;
     return;
}



GameFactory.prototype.initComputerTanks  = function(){
    var opt = {};
    var position = [192,0,384];
    this.tank_battle  = gameState.gameLevel.getCurrentTanksBattle();
    for (var i = 0; i < 3; i++) {
        opt.x = position[i];
        opt.y = 0;
        opt.type = TANKOL_TANK_TYPE['computer'];
        opt.name = "computer_"+String(Math.random()).slice(-4);
        opt.model = this.tank_battle.shift();
        this.createTank(opt);
    };

}


//对象基类 ==================================================================================

function GameObj(x,y,skin,size){
    this.x = x;
    this.y = y;
    this.skin = skin;
    this.size = size;
}

//碰撞检测
GameObj.prototype.impactTest = function(obj){
    var min1 = this.x > obj.x ? this.x :obj.x;
    var max1 = this.x + this.size < obj.x + obj.size ? this.x + this.size : obj.x + obj.size;
    var min2 = this.y > obj.y ? this.y : obj.y;
    var max2 = this.y + this.size < obj.y + obj.size ? this.y + this.size : obj.y + obj.size;
    if (min1 <= max1 && min2 <= max2) return true; else return false;
}

//子弹动画对象基类 ==================================================================================

function BulletAnime(x, y, skin, size){
    GameObj.call(this, x, y, skin, size);
    this.x = this.x - this.size/2;
    this.y = this.y - this.size/2;
    this.step = 0;
    this.time =  -3;
    this.state = 1;
}

BulletAnime.prototype = new GameObj();


BulletAnime.prototype.draw = function(id){
    var elm = gameCanvas.getElm(id),
        g   = elm.getContext("2d"),
        img = gameSkin.getSkin(),
        offerX = gameCfg.padding_x,
        offerY = gameCfg.padding_y,
        images = gameSkin.getImages(this.skin);
    g.drawImage(img,this.step * 32 + images[0], images[1], 32, 32, this.x + offerX, this.y + offerY, this.size, this.size) ;
    return;
};

BulletAnime.prototype.update = function(){
    if(this.time % 4 == 1) {this.step++;}
    if(this.step > 3) {this.state = 0; return;}
    this.time ++;
};





//tank动画对象基类 ==================================================================================
function TankAnime(x, y, skin, size){   
    GameObj.call(this, x, y, skin, size);
    this.step = 0;
    this.time =  0;
    this.state = 1;
}

TankAnime.prototype = new GameObj();


//诞生
function TankAnime_1(x, y, skin, size){
    TankAnime.call(this, x, y, skin, size);
    this.step = 0;
    this.time =  0;
    this.state = 1;
}
TankAnime_1.prototype = new TankAnime();

TankAnime_1.prototype.draw = function(id){
    var elm = gameCanvas.getElm(id),
        g   = elm.getContext("2d"),
        img = gameSkin.getSkin(),
        offerX = gameCfg.padding_x,
        offerY = gameCfg.padding_y,
        images = gameSkin.getImages(this.skin);
        g.drawImage(img, this.size * this.step + images[0], images[1], this.size, this.size, this.x + offerX,this.y + offerY,this.size,this.size) ;    
    return;
};


TankAnime_1.prototype.update = function(){
    if(this.time >= 35){
        this.state = 0;
    }
    if(this.time%5 == 1) {this.step++;}
    if(this.step > 5)  
    {
        this.step = 0;
    }
    this.time++;
};


//毁灭
function TankAnime_2(x, y, skin, size){
    TankAnime.call(this, x, y, skin, size);
    this.x = x - 16;
    this.y = y - 16;
    this.step = 0;
    this.time =  -10;
    this.state = 1;
}
TankAnime_2.prototype = new TankAnime();
TankAnime_2.prototype.draw = function(id){
    var elm = gameCanvas.getElm(id),
        g   = elm.getContext("2d"),
        img = gameSkin.getSkin(),
        offerX = gameCfg.padding_x,
        offerY = gameCfg.padding_y,
        images = gameSkin.getImages(this.skin);
    g.drawImage(img, this.size * this.step + images[0], images[1], this.size, this.size, this.x + offerX,this.y + offerY,this.size,this.size) ;
    return;
};


TankAnime_2.prototype.update = function(){
    if(this.time % 7 == 1)
    {
        this.step++;
    }
    if(this.step > 4)
    {
        this.state = 0;
        return;
    }
    this.time ++;
};








//子弹对象基类 ==================================================================================

function Bullet(opts){
    var x = ( opts && typeof(opts['x'])!=='undefined' )? opts['x']:0,
        y = ( opts && typeof(opts['y'])!=='undefined')? opts.y:0,
        skin = ( opts && typeof(opts['skin'])!=='undefined')? opts.skin:"bullet",
        size = ( opts && typeof(opts['size'])!=='undefined')? opts.size:6;
        GameObj.call(this, x, y, skin, size); 

    this.power = 0;
    this.speed = 5;
    this.direct = 0;
    this.fid = 0;
    this.live = 1;
    this.anime = null;
    //参数合并
    if(opts){
        for(var i in opts){
            if(this.hasOwnProperty(i)) this[i] = opts[i];
        }
    }

    this.directCorrective();

}

Bullet.prototype = new GameObj();

Bullet.prototype.directCorrective = function(){

    switch(this.direct){
        case TANKOL_TANK_DIRECT.up:
                this.x += 13;
                this.y -= 3;
                break;
            
        case TANKOL_TANK_DIRECT.down:
                this.x += 13;
                this.y += 32;
                break;
            
        case TANKOL_TANK_DIRECT.left:
                this.y += 13;
                this.x -= 3;
                break;
            
        case TANKOL_TANK_DIRECT.right:
                this.y += 13;
                this.x += 32;
                break;       
    }
    return;
}

Bullet.prototype.draw = function(id){
    var elm = gameCanvas.getElm(id),
        g   = elm.getContext("2d"),
        offerX =  gameCfg.padding_x,
        offerY =  gameCfg.padding_y,
        img = gameSkin.getSkin(),
        images = gameSkin.getImages("bullet");
    
    g.drawImage(img, 6 * this.direct + images[0], images[1], this.size, this.size, this.x + offerX, this.y + offerY, this.size, this.size);
}

//让子弹飞
Bullet.prototype.fly = function(index){
    this.move(index);
    this.flyAway(index);
    this.hitBuilding(index);
    this.hitTank(index);
    //this.hitBullet(index);
    return;
}


//子弹飞出去了
Bullet.prototype.flyAway = function(index){
    var cell_size = gameCfg.cell_size,
        cell_x    = gameCfg.cell_x,
        cell_y    = gameCfg.cell_y;
    if(this.x < 0 || this.y < 0 || this.x > cell_size*cell_x || this.y > cell_size*cell_y){
        if(this.x > cell_size*cell_x){
            this.x = this.x - this.speed;
        }else if(this.y > cell_size*cell_y){
            this.y = this.y - this.speed;
        }
        this.disappear(index);
    }
    return;
}



Bullet.prototype.move = function(index){

    switch(this.direct){
        case TANKOL_TANK_DIRECT.up:
            this.y -= this.speed;
            break;
        case TANKOL_TANK_DIRECT.down:
            this.y += this.speed;
            break;
        case TANKOL_TANK_DIRECT.left:
            this.x -= this.speed;
            break;
        case TANKOL_TANK_DIRECT.right:
            this.x += this.speed;
            break;   
    }
    return;
}



Bullet.prototype.destroyBuilding = function(x,y,new_map){
    var elm = gameCanvas.getElm("map"),
        g = elm.getContext("2d"),
        cell_size = gameCfg.cell_size,
        offerX = gameCfg.padding_x,
        offerY = gameCfg.padding_y,
        x = x * cell_size,
        y = y * cell_size;
    g.fillStyle = "#000000";
    switch(new_map){
        case  0 :g.clearRect(x + offerX, y + offerY,16,16);
            break;
        case 10 :g.clearRect(x + offerX,y + offerY + cell_size/2,cell_size,cell_size/2);
            break;
        case 11 :g.clearRect(x + offerX,y + offerY,cell_size,cell_size/2);
            break;
        case 12 :g.clearRect(x + offerX + cell_size/2,y + offerY,cell_size/2,cell_size);
            break;
        case 13 :g.clearRect(x + offerX,y + offerY,cell_size/2,cell_size);
            break;
    }
    return;
}


Bullet.prototype.hitTank = function(index){
    var tanks = gameFactory.tanks;
    //console.info("打坦克");
    var hited = false;
    for(var i = 0;i < tanks.length;i ++ )
    {
        var x = tanks[i].x;
        var y = tanks[i].y;

        if( tanks[i].life > 0 && this.impactTest(tanks[i])){
            hited = true;
            console.info("打到坦克",i,tanks[i].x,tanks[i].y,"子弹:",index,this.x,this.y);

            tanks[i].life --;

            if(tanks[i].life <= 0)
            {
                //console.info("坦克死了");
                tanks[i].anime = new TankAnime_2(tanks[i].x,tanks[i].y,"anime_2",66);
                //tanks.splice(i,1);
                //i --;
            }



            if(hited){
                this.disappear(index);
                break;
            }

            return;
        }
    }

    return;
};




Bullet.prototype.disappear = function(index){
    var bullets   =  gameFactory.bullets,
        bulletsanimes = gameFactory.bulletanimes;
    //bullets.splice(index,1);
    //console.info(bullets[index],index);
    bullets[index].live = 0;
    var anime = new BulletAnime(this.x+3,this.y+3,"bulletanime",20);
    bullets[index].anime = anime;
    //bulletsanimes.push(anime);
    return;
}


Bullet.prototype.hitBuilding = function(index){
    var map = gameState.gameLevel.getCurrentMap(),
        cell_x    =  gameCfg.cell_x-1,
        cell_y    =  gameCfg.cell_y-1,
        cell_size =  gameCfg.cell_size,
        x_l_m_r = [ parseInt((this.x - 4)/ cell_size), parseInt((this.x + this.size/2) / cell_size), parseInt((this.x + this.size+4) / cell_size)],
        y_t_m_b = [ parseInt((this.y - 4) / cell_size), parseInt((this.y + this.size/2) / cell_size), parseInt((this.y + this.size+4) / cell_size)],
        checkPosition_x,
        checkPosition_y,
        hited = false;

    x_l_m_r[2] = (x_l_m_r[2] > cell_x)?cell_x:x_l_m_r[2];
    y_t_m_b[2] = (y_t_m_b[2] > cell_y)?cell_y:y_t_m_b[2];
    x_l_m_r[1] = (x_l_m_r[1] > cell_x)?cell_x:x_l_m_r[1];
    y_t_m_b[1] = (y_t_m_b[1] > cell_y)?cell_y:y_t_m_b[1];
    x_l_m_r[0] = (x_l_m_r[0] > 0 )?x_l_m_r[0]:0;
    y_t_m_b[0] = (y_t_m_b[0] > 0 )?y_t_m_b[0]:0;

    for(var i = 0; i < 2; i++ ){
        if(this.direct == TANKOL_TANK_DIRECT.up || this.direct == TANKOL_TANK_DIRECT.down ){
            checkPosition_x = x_l_m_r[i];
            checkPosition_y = y_t_m_b[1];
        }else{
            checkPosition_x = x_l_m_r[1];
            checkPosition_y = y_t_m_b[i];
        }

        var checkPosition  = parseInt(map[checkPosition_y][checkPosition_x]);

        if( checkPosition == TANKOL_MAP.wall || checkPosition == TANKOL_MAP.grid || checkPosition > TANKOL_MAP.boss ){

            hited = true;

            if(checkPosition  ==  TANKOL_MAP.wall){
                var new_map = 10 + parseInt(this.direct);
                this.destroyBuilding(checkPosition_x,checkPosition_y,new_map);
                map[checkPosition_y][checkPosition_x] = new_map;
                console.info("击中",new_map);
            }else if(checkPosition == TANKOL_MAP.grid && this.power == 0){
                 //打了没有反应
                //console.info("打不动");
            }else if(checkPosition > TANKOL_MAP.boss){
                //console.info("打过了");
                map[checkPosition_y][checkPosition_x] = TANKOL_MAP.non;
                this.destroyBuilding(checkPosition_x,checkPosition_y,0);
                switch(checkPosition)
                {
                    case 10 :this.y -= 4;
                        break;
                    case 11 :this.y += 4;
                        break;
                    case 12 :this.x -= 4;
                        break;
                    case 13 :this.x += 4;
                        break;
                }
            }
            //debugger;
        }

    }

    if(hited){
        this.disappear(index);
    }



    return;
}



//tank对象基类 ==================================================================================

function TankBase(opts){
    var x = ( opts && typeof(opts['x'])!=='undefined' )? opts['x']:0,
        y = ( opts && typeof(opts['y'])!=='undefined')? opts.y:0,
        skin = ( opts && typeof(opts['skin'])!=='undefined')? opts.skin:"tank1",
        size = ( opts && typeof(opts['size'])!=='undefined')? opts.size:30;
    GameObj.call(this, x, y, skin, size);
    this.id =  String(Math.random()).slice(-4);
    this.name = "";
    this.direct = TANKOL_TANK_DIRECT['down'];
    this.l_direct = TANKOL_TANK_DIRECT['down'];
    this.speed = 4;
    this.type = 0;
    this.fired = false;
    this.fire_interval = 10;
    this.fire_time = 0;
    this.life = 10;
    this.live = 1;
    this.anime = null;

    //参数合并
    if(opts){
        for(var i in opts){
        if(this.hasOwnProperty(i)) this[i] = opts[i];
        }
    }
}

TankBase.prototype = new GameObj();

TankBase.prototype.draw = function(id){
    var elm = gameCanvas.getElm(id),
        g = elm.getContext("2d"),
        img = gameSkin.getSkin(),
        images = gameSkin.getImages(this.skin),
        offerX = gameCfg.padding_x,
        offerY = gameCfg.padding_y,
        xx = images[0],
        yy = images[1];
        g.drawImage(img,32 * this.direct + xx, yy, 32, 32,this.x + offerX,this.y + offerY,32,32);
    return;
};


TankBase.prototype.update = function(id){

    if(this.fired && this.fire_time < this.fire_interval){
        this.fire_time ++;
    }else{
        this.fired = false;
        this.fire_time = 0;
    }
};

TankBase.prototype.changeDirect = function(){
    //1:上下  2;左右
    var l_direct = this.l_direct < 2 ? 1:2,
        direct   = this.direct < 2 ? 1:2,
        cell_size =  gameCfg.cell_size;

    if(l_direct != direct){
        
        var f;
        switch(this.direct)
        {
            case TANKOL_TANK_DIRECT.up:
            case TANKOL_TANK_DIRECT.down:
                f = parseInt((this.x + cell_size/2) / cell_size);
                f = f * cell_size;
                this.x = f; 
                break;
            
            case TANKOL_TANK_DIRECT.left:
            case TANKOL_TANK_DIRECT.right:
                f = parseInt((this.y + cell_size/2) / cell_size);
                f = f * cell_size;
                this.y = f ;
                break;
        }

    }
    this.l_direct = this.direct;    
};

TankBase.prototype.move = function(direct){
    switch(direct)
    {
        case TANKOL_TANK_DIRECT.up :
        {   

            if(this.checkMove(direct)) 
            {

                this.y -= this.speed;return true;
            } 
            
            break;
        }
        case TANKOL_TANK_DIRECT.down:
        {
            if(this.checkMove(direct)) 
            {
                this.y += this.speed;return true;
            } 
            break;
        }
        case TANKOL_TANK_DIRECT.left:
        {
            if(this.checkMove(direct)) 
            {
                this.x -= this.speed;return true;
            } 
            break;
        }
        case TANKOL_TANK_DIRECT.right:
        {
            if(this.checkMove(direct)) 
            {
                this.x += this.speed;return true;
            } 
            break;
        }
        
        default:break;
    }
    return false;
};

TankBase.prototype.checkMove = function(direct){
    this.direct = direct;
    this.changeDirect();
    var cell_size =  gameCfg.cell_size,
        cell_x    =  gameCfg.cell_x,
        cell_y    =  gameCfg.cell_y;
    switch(direct)
    {
        case TANKOL_TANK_DIRECT.up :
        {   //161 129 
            var dist_y = parseInt((this.y - this.speed)/cell_size), //10
                dist_x_l = parseInt(this.x /cell_size),  //8
                dist_x_m = parseInt( (this.x + this.size) /cell_size), //11.9 11
                dist_x_r = parseInt( (this.x +(this.size/2) )/cell_size); // 11
                dist_y   = dist_y<0?0:dist_y;
            if(this.y - this.speed > -1 && this.checkMap(dist_x_l,dist_y) && this.checkMap(dist_x_m,dist_y) && this.checkMap(dist_x_r,dist_y))
            {

                return !this.hitTank();
            }

            break;
        }
        case TANKOL_TANK_DIRECT.down:
        {
            
            var dist_y = parseInt((this.y + this.speed + this.size)/cell_size),
                dist_x_l = parseInt(this.x /cell_size),
                dist_x_m = parseInt( (this.x + this.size) /cell_size),
                dist_x_r = parseInt( (this.x +(this.size/2) )/cell_size);
            
            if(this.y + this.speed + this.size < cell_size*cell_y && this.checkMap(dist_x_l,dist_y) && this.checkMap(dist_x_m,dist_y) && this.checkMap(dist_x_r,dist_y))
            {
                return !this.hitTank();
            }

            break;
        }
        case TANKOL_TANK_DIRECT.left:
        {

            var dist_x = parseInt((this.x - this.speed)/cell_size),
                dist_y_t = parseInt(this.y /cell_size),
                dist_y_m = parseInt( (this.y + this.size) /cell_size),
                dist_y_b = parseInt( (this.y +(this.size/2) )/cell_size),
                dist_x   = dist_x<0?0:dist_x;

            if(this.x - this.speed > -1 && this.checkMap(dist_x,dist_y_t) && this.checkMap(dist_x,dist_y_m) && this.checkMap(dist_x,dist_y_b))
            {
                return !this.hitTank();
            }
            break;
        }
        case TANKOL_TANK_DIRECT.right:
        {
            var dist_x   = parseInt((this.x + this.speed + this.size)/cell_size),
                dist_y_t = parseInt(this.y /cell_size),
                dist_y_m = parseInt( (this.y + this.size) /cell_size),
                dist_y_b = parseInt( (this.y +(this.size/2) )/cell_size);
            
            if(this.x + this.speed + this.size < cell_size*cell_x && this.checkMap(dist_x,dist_y_t) && this.checkMap(dist_x,dist_y_m) && this.checkMap(dist_x,dist_y_b))
            {
                return !this.hitTank();
            }
            break;
        }
        
        default:break;
    }
    //console.info("走不动了" ,this.x,this.y);
    return false;
}


TankBase.prototype.hitTank = function(){
    var tanks = gameFactory.tanks;
    for(var i in tanks){
        if(tanks[i] === this){
            continue;
        }else{
            var that    = tanks[i];
            var this_xy = this.getLastXY(this);
            var that_xy = this.getLastXY(that);


            var min1 = this_xy[0] > that_xy[0] ? this_xy[0] : that_xy[0];
            var max1 = this_xy[0] + this.size < that_xy[0] + that.size ? this_xy[0] + this.size : that_xy[0] + that.size;
            var min2 = this_xy[1] > that_xy[1] ? this_xy[1] : that_xy[1];
            var max2 = this_xy[1] + this.size < that_xy[1] + that.size ? this_xy[1] + this.size : that_xy[1] + that.size;
            if (min1 <= max1 && min2 <= max2){
                var hited = true;

                if(hited){
                    switch(this.direct){
                        case TANKOL_TANK_DIRECT.up:
                        {
                            xy = [x,y-speed];
                            break;
                        }
                        case TANKOL_TANK_DIRECT.down:
                        {
                            xy = [x,y+speed];
                            break;
                        }
                        case TANKOL_TANK_DIRECT.left:
                        {
                            xy = [x-speed,y];
                            break;
                        }
                        case TANKOL_TANK_DIRECT.right:
                        {
                            xy = [x+speed,y];
                            break;
                        }
                        default:break;
                    }
                }

                return hited;
            }

        }
    }
    return false;
}

TankBase.prototype.getLastXY = function(obj){
    var direct = obj.direct,
        x = obj.x,
        y = obj.y,
        speed = obj.speed,
        xy = new Array();

    switch(direct){
        case TANKOL_TANK_DIRECT.up:
        {
            xy = [x,y-speed];
            break;
        }
        case TANKOL_TANK_DIRECT.down:
        {
            xy = [x,y+speed];
            break;
        }
        case TANKOL_TANK_DIRECT.left:
        {
            xy = [x-speed,y];
            break;
        }
        case TANKOL_TANK_DIRECT.right:
        {
            xy = [x+speed,y];
            break;
        }
        default:break;
    }

    return xy;

}



TankBase.prototype.checkMap = function(x,y){
    var cell_size =  gameCfg.cell_size,
        cell_x    =  gameCfg.cell_x-1,
        cell_y    =  gameCfg.cell_y-1,
        map = gameState.gameLevel.getCurrentMap(),
        y = y > cell_y?cell_y:y,
        y = y < 0?0:y,
        x = x > cell_x?cell_x:x,
        x = x < 0?0:x;
        if( map[y][x] == TANKOL_MAP.non || map[y][x] == TANKOL_MAP.grass || map[y][x] == TANKOL_MAP.ice ) return true; 
        else   return false;
}





TankBase.prototype.fire = function(){
    if(!this.fired)
    {   
        this.fired = true;
            gameFactory.createBullet({x:this.x,y:this.y,type:this.type,direct:this.direct,fid:this.id});
    }
};


//Playertank 子类 ==================================================================================

function PlayerTank(opts){

    var model = opts['model'];
    if(model == 1){
        opts['skin'] = "player1";
    }else{
        opts['skin'] = "player2";
    }
    opts['size'] = 30;

    TankBase.call(this,opts);
    this.direct   = TANKOL_TANK_DIRECT['up'];
    this.l_direct = TANKOL_TANK_DIRECT['up'];
    //参数合并
    if(opts){
        for(var i in opts){
            if(this.hasOwnProperty(i)) this[i] = opts[i];
        }
    }

}


PlayerTank.prototype = new TankBase();



//Computertank 子类 ==================================================================================

function ComputerTank(opts){
    var model = opts['model'];
    opts['skin'] = "tank"+model;
    opts['size'] = 30;
    TankBase.call(this,opts);
    this.direct   = TANKOL_TANK_DIRECT['down'];
    this.l_direct = TANKOL_TANK_DIRECT['down'];
    //参数合并
    if(opts){
        for(var i in opts){
            if(this.hasOwnProperty(i)) this[i] = opts[i];
        }
    }

}


ComputerTank.prototype = new TankBase();










//辅函数=======================================================================================

//帧刷新
function refresh(){
    var now_state = gameState.getState();
    console.info(now_state);
    switch (now_state){
        case TANKOL_STATE.playing:
            gameM.draw();
            gameM.update();

        break;
        
        case TANKOL_STATE.init:
             gameState.gameInit();
        break;
        
        case TANKOL_STATE.loading:
             gameScene.draw();
        break;
        
        case TANKOL_STATE.over:

        break;
        
        case TANKOL_STATE.select:
            gameCursor.draw();
        break;
        
        case TANKOL_STATE.start:
            gameScreen.draw();
        break;          
    }
}

//运行时
function runtime(){
    gameFactory = new GameFactory();
    gameM      = new GameM();
    gameSound  = new GameSound();
    gameCfg    = new GameCfg();
    gameSkin   = new GameSkin();
    gameState  = new GameState();
    gameCanvas = new GameCanvas();
    gameScreen = new GameScreen();
    gameScene =  new GameScene();
    gameCursor = new GameCursor();
    gameClear =  new GameClear();



    TANKOL_TIMER = setInterval(refresh,gameCfg.refresh_rate);
}

document.onkeydown = function(e){
        var now_state = gameState.getState();
        var key_down  = gameState.key_down;
        var cursor_index = gameCursor.getNum();

        var key_code = e.keyCode;
        e.preventDefault();
        key_down[key_code] = true;

        switch (now_state){
            case TANKOL_STATE.playing:
            
            break;
            
            case TANKOL_STATE.loading:

            break;
            
            case TANKOL_STATE.over:

            break;
            
            case TANKOL_STATE.select:
                if(key_code == TANKOL_KEY['k_up']) { gameCursor.next(-1); }
                else if(key_code == TANKOL_KEY['k_down']){ gameCursor.next(1); }

                if( key_code == TANKOL_KEY['k_space'] || key_code == TANKOL_KEY['k_enter']){
                    if( cursor_index == 0) {      }
                    else if( cursor_index == 1) {    }
                    else {return;}
                    gameState.setState("init");
                    gameCursor.destroy();
                    gameClear.clearCanvas("screen");
                }

            break;
            
            case TANKOL_STATE.start:

            break;          
        }

    
}


document.onkeyup = function(e){
    var key_down  = gameState.key_down;
    var key_code = e.keyCode;
    key_down[key_code] = false;
}

window.onload = runtime;