function rand(){return Random.I.v()}function randF(t,e){return Random.I.f(t,e)}function randI(t,e){return Random.I.i(t,e)}function randBool(){return Random.I.bool()}var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);i.prototype=e.prototype,t.prototype=new i},GameObject=function(){function t(){this.display=null,t.objects.push(this)}return t.prototype.destroy=function(){this.deleteFlag=!0},t.prototype.onDestroy=function(){},t.initial=function(e){t.display=e},t.process=function(){t.objects.forEach(function(t){return t.update()}),t.objects=t.objects.filter(function(t){return t.deleteFlag&&t["delete"](),!t.deleteFlag}),t.transit&&(t.dispose(),t.transit(),t.transit=null)},t.dispose=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t["delete"](),!1})},t.prototype["delete"]=function(){this.onDestroy(),this.display&&(t.display.removeChild(this.display),this.display=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var PhysicsObject=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.onDestroy=function(){this.body&&(e.world.removeBody(this.body),this.body.displays=[],this.body=null)},e.prototype.update=function(){if(this.display){var t=this.body,e=this.display;e.x=this.px,e.y=this.py,e.rotation=180*t.angle/Math.PI}this.fixedUpdate()},e.prepare=function(t){e.pixelPerMeter=t,e.meterPerPixel=1/t,e.width=e.pixelToMeter(Util.width),e.height=e.pixelToMeter(Util.height),e.world=new p2.World,e.world.gravity=[0,.04*e.height],e.world.defaultContactMaterial.friction*=2,e.lastTime=Date.now(),e.deltaScale=1},e.progress=function(){var t=Date.now(),i=(t-this.lastTime)*this.deltaScale;this.lastTime=t,i>0&&e.world.step(1/60*this.deltaScale,i,4)},e.pixelToMeter=function(t){return t*e.meterPerPixel},e.meterToPixel=function(t){return t*e.pixelPerMeter},e.prototype.m2p=function(t){return e.meterToPixel(t)},e.prototype.p2m=function(t){return e.pixelToMeter(t)},Object.defineProperty(e.prototype,"px",{get:function(){return e.meterToPixel(this.mx)},set:function(t){this.mx=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"py",{get:function(){return e.meterToPixel(this.my)},set:function(t){this.my=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"mx",{get:function(){return this.body.position[0]},set:function(t){this.body.position[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"my",{get:function(){return this.body.position[1]},set:function(t){this.body.position[1]=t},enumerable:!0,configurable:!0}),e.deltaScale=1,e}(GameObject);__reflect(PhysicsObject.prototype,"PhysicsObject");var Button=function(t){function e(e,i,o,s,r,a,n,h,l,p){var c=t.call(this)||this;c.text=null,c.onTap=null,c.press=!1,c.touch=!1,c.x=0,c.y=0;var d=new egret.Shape;GameObject.display.addChild(d),d.graphics.beginFill(h,l);var y=a*Util.width,u=n*Util.height;return d.graphics.drawRoundRect(-.5*y,-.5*u,y,u,.2*y),d.graphics.endFill(),d.touchEnabled=!0,d.x=s*Util.width,d.y=r*Util.height,c.display=d,e&&(c.text=Util.newTextField(e,i,o,s,r,!0,!1),GameObject.display.addChild(c.text)),c.onTap=p,c.onTap&&c.display.addEventListener(egret.TouchEvent.TOUCH_TAP,c.onTap,c),c.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,c.touchBegin,c),c.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,c.touchMove,c),c.display.addEventListener(egret.TouchEvent.TOUCH_END,c.touchEnd,c),c}return __extends(e,t),e.prototype.onDestroy=function(){this.onTap&&this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this),this.text&&GameObject.display.removeChild(this.text)},e.prototype.update=function(){var t=this.touch?1.1:1;this.display.scaleX=this.display.scaleY=this.display.scaleX+.25*(t-this.display.scaleX),this.press=!1},e.prototype.touchBegin=function(t){this.x=t.stageX,this.y=t.stageY,this.press=!0,this.touch=!0},e.prototype.touchMove=function(t){this.x=t.stageX,this.y=t.stageY,this.touch=!0},e.prototype.touchEnd=function(t){this.touch=!1},e}(GameObject);__reflect(Button.prototype,"Button");var Block=function(t){function e(i,o,s,r,a){var n=t.call(this)||this;return e.blocks.push(n),n.sizeW=s,n.sizeH=r,n.color=BLOCK_COLOR,n.setDisplay(i,o),n.setBody(i,o),n.body.angle=a,n.display.rotation=180*n.body.angle/Math.PI,Camera2D.transform(n.display),n}return __extends(e,t),e.newBlock=function(t,i){var o=BLOCK_SIZE_PER_W*Util.width;new e(t,i,o,o,.25*Math.PI)},e.newFloor=function(t,i){var o=FLOOR_SIZE_PER_W*Util.width,s=Util.height-i;new e(t,i+.5*s,.7*o,s,0)},e.prototype.onDestroy=function(){var i=this;t.prototype.onDestroy.call(this),e.blocks=e.blocks.filter(function(t){return t!=i})},e.prototype.setDisplay=function(t,e){this.display&&GameObject.display.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.display.addChildAt(this.display,1),i.x=t,i.y=e,i.graphics.beginFill(this.color),i.graphics.drawRect(-.5*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH),i.graphics.endFill()},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:1,position:[this.p2m(t),this.p2m(e)],type:p2.Body.STATIC}),this.body.addShape(new p2.Box({width:this.p2m(this.sizeW),height:this.p2m(this.sizeH)}),[0,0],0),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.fixedUpdate=function(){Camera2D.transform(this.display),this.display.x<=-2*Util.width&&this.destroy()},e.blocks=[],e}(PhysicsObject);__reflect(Block.prototype,"Block");var PIXEL_PER_METER=10,PLAYER_RADIUS_PER_W=.025,HOOK_RADIUS_PER_W=1/60,BLOCK_SIZE_PER_W=.05,FLOOR_SIZE_PER_W=1/3,GRAVITY_PER_H=1/300,SAVE_KEY_BESTSCORE="hook-bestScore",BACK_COLOR=16772066,FONT_COLOR=14725216,PLAYER_COLOR=878974,COIN_COLOR=12619824,BLOCK_COLOR=12582939,FLOOR_COLOR=6324368,Game=function(){function t(){}return t.loadSceneGamePlay=function(){PhysicsObject.deltaScale=1,new Score,new Player(.2*Util.width,.2*Util.height),new Wave,new StartMessage},t}();__reflect(Game.prototype,"Game");var Hook=function(t){function e(i,o){var s=t.call(this)||this;return s.scale=1,e.hooks.push(s),s.px=i,s.py=o,s.setDisplay(i,o),Camera2D.transform(s.display),s}return __extends(e,t),e.prototype.onDestroy=function(){var i=this;t.prototype.onDestroy.call(this),e.hooks=e.hooks.filter(function(t){return t!=i})},e.prototype.setDisplay=function(t,e){this.display&&GameObject.display.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.display.addChildAt(this.display,1),i.x=t,i.y=e,i.graphics.lineStyle(4,PLAYER_COLOR),i.graphics.drawCircle(0,0,HOOK_RADIUS_PER_W*Util.width)},e.prototype.update=function(){this.scale+=.25*(1-this.scale),this.display.x=this.px,this.display.y=this.py,Camera2D.transform(this.display,this.scale),this.display.x<=-2*Util.width&&this.destroy()},e.detect=function(t,i){var o=null,s=Math.pow(.7*Util.width,2);return e.hooks.forEach(function(e){if(t<=e.px){var r=Math.pow(e.px-t,2)+Math.pow(e.py-i,2);s>r&&(s=r,o=e)}}),o&&(o.scale=1.5),o},e.prototype["catch"]=function(){this.scale=2.5},e.hooks=[],e}(GameObject);__reflect(Hook.prototype,"Hook");var Player=function(t){function e(i,o){var s=t.call(this)||this;return s.hookR=0,s.hook=null,s.wire=null,s.state=s.stateNone,s.step=0,e.I=s,s.radius=PLAYER_RADIUS_PER_W*Util.width,s.setDisplay(i,o),s.setBody(i,o),Camera2D.transform(s.display),s.button=new Button(null,0,0,.5,.5,1,1,0,0,null),s}return __extends(e,t),e.prototype.onDestroy=function(){t.prototype.onDestroy.call(this),this.button.destroy(),e.I=null},e.prototype.setDisplay=function(t,e){this.display&&GameObject.display.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.display.addChild(this.display),i.x=t,i.y=e,i.graphics.beginFill(PLAYER_COLOR),i.graphics.drawCircle(0,0,this.radius),i.graphics.endFill()},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:1,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Circle({radius:this.p2m(this.radius)})),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body),PhysicsObject.world.on("impact",this.conflict,this)},e.prototype.conflict=function(t){this.state!=this.stateNone&&(this.gameOver(),this.setStateNone())},e.prototype.fixedUpdate=function(){this.state(),Camera2D.x=this.px-.25*Util.width,Camera2D.transform(this.display)},e.prototype.setStateNone=function(){this.state=this.stateNone,this.wire&&(this.wire.rewind=!0,this.wire=null)},e.prototype.stateNone=function(){},e.prototype.setStateFree=function(){this.state=this.stateFree,this.step=0,this.body.gravityScale=1},e.prototype.stateFree=function(){this.step++;var t=Hook.detect(this.px,this.py);return t&&this.button.press?void this.setStateHang(t):void(this.body.velocity[1]>0&&this.display.y>Util.height&&(this.gameOver(),this.setStateNone()))},e.prototype.setStateHang=function(t){this.state=this.stateHang,this.hook=t,this.hook["catch"](),this.hookR=Math.sqrt(Math.pow(this.hook.px-this.px,2)+Math.pow(this.hook.py-this.py,2)),this.body.velocity[0]*=1.2,this.body.velocity[1]*=1.2,this.wire=new Wire(this.display,t.display)},e.prototype.stateHang=function(){var t=this.hook.px-this.px,e=this.hook.py-this.py,i=Math.sqrt(Math.pow(t,2)+Math.pow(e,2)),o=1/i;t*=o,e*=o,this.px=this.hook.px-t*this.hookR,this.py=this.hook.py-e*this.hookR,this.display.x=this.px,this.display.y=this.py;var s=this.body.velocity[0]*t+this.body.velocity[1]*e;this.body.velocity[0]-=t*s,this.body.velocity[1]-=e*s,this.body.velocity[0]*=1.01,this.body.velocity[1]*=1.01,0==this.button.touch&&(this.body.velocity[1]-=.005*Util.height,this.wire.rewind=!0,this.wire=null,this.setStateFree())},e.prototype.gameOver=function(){new GameOver,PhysicsObject.deltaScale=.1;for(var t=2*this.radius*Camera2D.scale,e=0;5>e;e++){var i=rand()*Math.PI*2,o=Math.cos(i),s=-Math.sin(i),r=t*(2+e);new EffectLine(this.display.x+o*t,this.display.y+s*t,o*r,s*r,PLAYER_COLOR)}new EffectCircle(this.display.x,this.display.y,t,PLAYER_COLOR)},e.I=null,e}(PhysicsObject);__reflect(Player.prototype,"Player");var Wave=function(t){function e(){var e=t.call(this)||this;return e.hardRate=0,e.fx=0,e.hx=.6*Util.width,new Hook(e.hx,.2*Util.height),e}return __extends(e,t),e.prototype.update=function(){if(this.hardRate=Util.clamp(this.fx/(20*Util.width),0,1),this.fx<Camera2D.x+1*Util.width){var t=FLOOR_SIZE_PER_W*Util.width;this.fx+=t;var e=this.fx,i=Util.height*randF(.7,.95);Block.newFloor(e,i),rand()<.5*this.hardRate&&Block.newBlock(e+randF(t*-.4,.4*t),randF(.1*Util.height,i))}this.hx<Camera2D.x+1*Util.width&&(this.hx+=randF(.2,.5+.5*this.hardRate)*Util.width,new Hook(this.hx,Util.height*randF(.05,.2+.3*this.hardRate)))},e}(GameObject);__reflect(Wave.prototype,"Wave");var Wire=function(t){function e(e,i){var o=t.call(this)||this;return o.rate=0,o.rewind=!1,o.player=e,o.hook=i,o.setDisplay(),Camera2D.transform(o.display),o}return __extends(e,t),e.prototype.onDestroy=function(){this.player=this.hook=null},e.prototype.setDisplay=function(){this.display&&GameObject.display.removeChild(this.display);var t=new egret.Shape;this.display=t,GameObject.display.addChild(this.display),t.graphics.lineStyle(4,PLAYER_COLOR),t.graphics.moveTo(this.player.x,this.player.y);var e=this.hook.x-this.player.x,i=this.hook.y-this.player.y;e=this.player.x+e*this.rate,i=this.player.y+i*this.rate,t.graphics.lineTo(e,i)},e.prototype.update=function(){if(this.rewind){if(this.rate-=.25,this.rate<=0)return void this.destroy()}else this.rate<1&&(this.rate+=.25);this.setDisplay()},e}(GameObject);__reflect(Wire.prototype,"Wire");var EffectCircle=function(t){function e(i,o,s,r){void 0===r&&(r=16760832);var a=t.call(this)||this;return a.frame=e.maxFrame,a.radius=s,a.color=r,a.setShape(i,o,a.radius),a}return __extends(e,t),e.prototype.setShape=function(t,i,o){var s=new egret.Shape;this.display&&GameObject.display.removeChild(this.display),this.display=s,GameObject.display.addChild(this.display),s.x=t,s.y=i,s.graphics.lineStyle(3+10*(this.frame/e.maxFrame),this.color),s.graphics.drawCircle(0,0,o)},e.prototype.update=function(){return--this.frame<=0?void this.destroy():(this.radius*=1.03,void this.setShape(this.display.x,this.display.y,this.radius))},e.maxFrame=30,e}(GameObject);__reflect(EffectCircle.prototype,"EffectCircle");var Camera2D=function(){function t(){}return t.initial=function(){t.x=0,t.y=0,t.scale=1},t.transform=function(e,i){void 0===i&&(i=1),e.x=t.transX(e.x),e.y=t.transY(e.y),e.scaleX=e.scaleY=t.scale*i},t.transX=function(e){return(e-t.x)*t.scale},t.transY=function(e){return(e-t.y)*t.scale},t.x=0,t.y=0,t.scale=1,t}();__reflect(Camera2D.prototype,"Camera2D");var Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){Util.init(this),GameObject.initial(this.stage),PhysicsObject.prepare(PIXEL_PER_METER),Camera2D.initial(),Game.loadSceneGamePlay(),egret.startTick(this.tickLoop,this)},e.prototype.tickLoop=function(t){return PhysicsObject.progress(),GameObject.process(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var EffectLine=function(t){function e(e,i,o,s,r){void 0===r&&(r=16760832);var a=t.call(this)||this;return a.frame=0,a.x=e,a.y=i,a.vx=o,a.vy=s,a.color=r,a.setShape(0),a}return __extends(e,t),e.prototype.setShape=function(t){var e=new egret.Shape;this.display&&GameObject.display.removeChild(this.display),this.display=e,GameObject.display.addChild(this.display),t=t*Math.PI*.5;var i=Math.sin(t),o=1-Math.cos(t);e.graphics.lineStyle(6,this.color),e.graphics.moveTo(this.x+this.vx*i,this.y+this.vy*i),e.graphics.lineTo(this.x+this.vx*o,this.y+this.vy*o)},e.prototype.update=function(){if(++this.frame>=e.maxFrame)return void this.destroy();var t=this.frame/e.maxFrame;this.setShape(t)},e.maxFrame=30,e}(GameObject);__reflect(EffectLine.prototype,"EffectLine");var Random=function(){function t(t){void 0===t&&(t=88675123),this.x=123456789,this.y=362436069,this.z=521288629,this.w=t}return t.prototype.v=function(){return(this.next()&t.max)/(t.max+1)},t.prototype.f=function(t,e){return t+this.v()*(e-t)},t.prototype.i=function(t,e){return Math.floor(this.f(t,e))},t.prototype.bool=function(){return 0!=(1&this.next())},t.prototype.next=function(){var t;return t=this.x^this.x<<11,this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>>19^(t^t>>>8)},t.max=268435455,t.I=new t(Math.floor(Math.random()*t.max)),t}();__reflect(Random.prototype,"Random");var Util=function(){function t(){}return t.init=function(t){this.height=t.stage.stageHeight,this.width=t.stage.stageWidth},t.clamp=function(t,e,i){return e>t&&(t=e),t>i&&(t=i),t},t.color=function(t,e,i){return 65536*Math.floor(255*t)+256*Math.floor(255*e)+Math.floor(255*i)},t.colorLerp=function(t,e,i){var o=1-i,s=((16711680&t)*o+(16711680&e)*i&16711680)+((65280&t)*o+(65280&e)*i&65280)+((255&t)*o+(255&e)*i&255);return s},t.newTextField=function(e,i,o,s,r,a,n){var h=new egret.TextField;return h.text=e,h.bold=a,h.size=i,h.textColor=o,n?(h.x=(t.width-h.width)*s,h.y=(t.height-h.height)*r):(h.x=t.width*s-.5*h.width,h.y=t.height*r-.5*h.height),h},t}();__reflect(Util.prototype,"Util");var GameOver=function(t){function e(){var e=t.call(this)||this;return e.textGameOver=null,e.textScore=null,e.retryButton=null,e.textGameOver=Util.newTextField("GAME OVER",Util.width/10,FONT_COLOR,.5,.4,!0,!1),GameObject.display.addChild(e.textGameOver),Score.I&&(Score.I.point>=Score.I.bestScore&&egret.localStorage.setItem(SAVE_KEY_BESTSCORE,Score.I.point.toFixed()),e.textScore=Util.newTextField("SCORE : "+Score.I.point.toFixed(),Util.width/14,FONT_COLOR,.5,.5,!0,!1),GameObject.display.addChild(e.textScore)),e.retryButton=new Button("リトライ",Util.width/16,BACK_COLOR,.5,.65,.4,.1,FONT_COLOR,1,e.onTapRetry),e}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.textGameOver),this.textGameOver=null,this.textScore&&(GameObject.display.removeChild(this.textScore),this.textScore=null)},e.prototype.update=function(){this.step++},e.prototype.onTapRetry=function(){GameObject.transit=Game.loadSceneGamePlay,this.destroy()},e}(GameObject);__reflect(GameOver.prototype,"GameOver");var Score=function(t){function e(){var i=t.call(this)||this;i.point=0,i.bestScore=0,i.text=null,i.textBest=null,e.I=i,i.point=0,i.text=Util.newTextField("0",Util.width/22,FONT_COLOR,.5,0,!0,!0),GameObject.display.addChild(i.text);var o=egret.localStorage.getItem(SAVE_KEY_BESTSCORE);return null==o&&(o="100",egret.localStorage.setItem(SAVE_KEY_BESTSCORE,o)),i.bestScore=parseInt(o),i.textBest=Util.newTextField("BEST:"+o,Util.width/22,FONT_COLOR,0,0,!0,!0),GameObject.display.addChild(i.textBest),i}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.text),this.text=null,GameObject.display.removeChild(this.textBest),this.textBest=null,e.I=null},e.prototype.update=function(){if(Player.I.state!=Player.I.stateNone){var t=Math.floor(.1*Player.I.px);this.point<t&&(this.point=t,this.text.text=""+this.point.toFixed(),this.bestScore<this.point&&(this.bestScore=this.point,this.textBest.text="BEST:"+this.point.toFixed()))}},e.I=null,e}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(t){function e(){var e=t.call(this)||this;return e.texts=[],e.texts[0]=Util.newTextField("サーカスジャンプ",Util.width/12,FONT_COLOR,.5,.3,!0,!1),e.texts[1]=Util.newTextField("タッチでフックして",Util.width/16,FONT_COLOR,.5,.5,!0,!1),e.texts[2]=Util.newTextField("振り子のようにジャンプ！",Util.width/16,FONT_COLOR,.5,.6,!0,!1),e.texts.forEach(function(t){GameObject.display.addChild(t)}),GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN,e.tap,e),e}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.display.removeChild(t)}),this.texts=null},e.prototype.update=function(){},e.prototype.tap=function(t){Player.I.setStateFree(),this.destroy()},e}(GameObject);__reflect(StartMessage.prototype,"StartMessage");