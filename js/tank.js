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
        //this.drawBullets();
        //this.drawBombs();
    }

    this.update = function(){
        this.updateTanks();
        //this.drawUpdate();
        //this.drawUpdate();
        this.updateControl();
    }
}

GameM.prototype.drawTanks  = function(){

    var tanks = gameFactory.tanks;
    for (var i = 0; i < tanks.length; i++) {    
        if(tanks[i].anime && tanks[i].anime.state){
            tanks[i].anime.draw("actor"); 
        }else{
            tanks[i].draw("actor"); 
        }
    };

}

GameM.prototype.updateTanks = function(){
    
    var tanks = gameFactory.tanks;
    for (var i = 0; i < tanks.length; i++) {    
        if(tanks[i].anime){
            tanks[i].anime.update(); 
        }else{
            tanks[i].update(); 
        }
    };

}


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
            if(key_down[TANKOL_KEY['k_space']] || key_down[TANKOL_KEY['k_enter']]) {player1.shot();}
        }else if(players[i].name == "player2"){
            var player2 = players[i];
            if(key_down[TANKOL_KEY['k_w']]) {player2.move(TANKOL_TANK_DIRECT.up);}
            else if(key_down[TANKOL_KEY['k_s']]) {player2.move(TANKOL_TANK_DIRECT.down);}
            else if(key_down[TANKOL_KEY['k_a']]) {player2.move(TANKOL_TANK_DIRECT.left);}
            else if(key_down[TANKOL_KEY['k_d']]) {player2.move(TANKOL_TANK_DIRECT.right);}
            if(key_down[TANKOL_KEY['k_j']]) {player2.shot();}
        }
    }
}




//工厂类 ==================================================================================
function GameFactory(){
    this.players    = new Array();
    this.tanks      = new Array();
    this.tankAnimes = new Array();
    this.bullet     = new Array();
    this.bomb       = new Array();

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
        tank.anime = new TankAnime(opts.x,opts.y,"anime",30);
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




//tank对象基类 ==================================================================================
function TankAnime(x, y, skin, size){   
    GameObj.call(this, x, y, skin, 32);
    this.step = 0;
    this.time =  0;
    this.state = 1;
}

TankAnime.prototype = new GameObj();

TankAnime.prototype.draw = function(id){
    var elm = gameCanvas.getElm(id),
        g   = elm.getContext("2d"),
        img = gameSkin.getSkin(),
        offerX = gameCfg.padding_x,
        offerY = gameCfg.padding_y,
        images = gameSkin.getImages(this.skin);
        g.drawImage(img, this.size * this.step + images[0], images[1], this.size, this.size, this.x + offerX,this.y + offerY,this.size,this.size) ;    
    return;
};


TankAnime.prototype.update = function(){
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
    this.speed = 1;
    this.type = 0;
    this.fired = false;
    this.time = 0;
    this.fire_speed = 70;
    this.life = 1;
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

};

TankBase.prototype.changeDirect = function(){
    //1:上下  2;左右
    var l_direct = this.l_direct < 2 ? 1:2,
        direct   = this.direct < 2 ? 1:2,
        cell_size =  gameCfg.cell_size;

    if(l_direct != direct || 1){
        
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
                //return !this.checkHit(tanks);
                return true;
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
                //return !this.checkHit(tanks);
                return true;
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
                //return !this.checkHit(tanks);
                return true;
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
                //return !this.checkHit(tanks);
                return true;
            }
            break;
        }
        
        default:break;
    }
    //console.info("走不动了" ,this.x,this.y);
    return false;
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





TankBase.prototype.shot = function(){
    if(!this.fired)
    {   
        this.fired = true;
        //var bullet = new Bullet(this.x,this.y,this.type,this.dir);
        //bullets.push(bullet);
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
    opts['size'] = 32;
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