/* BowlingGame class 
    X == Strike 
    / == Spare
    - == Not All
*/
var bowlingGame = function (nPins) {
    var bowlingGame = {};
    var options = {};
    var dFrame = {'1':0 , '2' :0 , 'T' : '-'}; //default frame 
    options.noOfPins = nPins;
    options.bonusRound = nPins + 1;
    var isBonus = false;
    
// ==== public methods ====
    bowlingGame.reset = function() {
        options.frame = new Array();
        options.rolls = {};
        options.tries =2;
        options.score =0;
        options.start = 1;
        options.isBonus = false;
        document.getElementById('frame').innerHTML ='';
        document.getElementById('score').innerHTML ='';
    }
    bowlingGame.reset();
    
    /* roll method 
     Paramter val [] = val[4,5] is optional in case its not set its randon numbers under noOfPins
    */ 
    bowlingGame.roll = function(val) { 

        if(isGameOver() && !isBonusRound()) return; // Game Over

        for (var i=options.start; i<=options.tries; i++) {
          switch(i){           
            case 1:{
                options.rolls['1'] = setRoll(val, i, options.noOfPins) ;
                if(options.rolls['1'] >= options.noOfPins){ // strike - change frame stop 2nd try 
                   options.rolls['2'] = 0;
                   options.rolls['T'] = 'X'; 
                   updateFrame();
                   return;
                }
                break;
            }
            case 2:{
                if(options.start==options.tries) { options.rolls['1'] = 0;} // start is 2 then set 1 roll 0
                var leftPins = options.noOfPins - options.rolls['1'];
                options.rolls['2'] = setRoll(val, i, leftPins) ;
                var frameScore = options.rolls['1'] + options.rolls['2'];
                if( frameScore >= options.noOfPins){ // spare 
                    options.rolls['T'] = '/';
                 } else {  // not all 
                    options.rolls['T'] = '-';
                }
                updateFrame();
                break;
            }
          }
        }   
    }
    
    /* score method
    */
    bowlingGame.score = function() {
        var len = options.frame.length; var total = 0;
        //console.log("frame : " + len);
        for(var i =0 ; i<len; i++){
            
            var n1Roll = (i+3 <= len)? options.frame[i+2] : dFrame; // 2 next
            var n2Roll = (i+2 <= len)? options.frame[i+1] : dFrame; // 1 next
            var cRoll = options.frame[i]; //current
            var cScore = cRoll['1'] + cRoll['2'];
            var n1Score = n1Roll['1'] + n1Roll['2'];
            var n2Score = n2Roll['1'] + n2Roll['2'];
            if(cRoll['T']=='X'){
                total = total + cScore + n1Score + n2Score;     
            } else if(cRoll['T']=='/'){
                total = total + cScore + n1Score;
            } else {
                total = total + cScore;   
            }
        }
        options.score = total;
        return options.score;
    }
    /* display method
    */
    bowlingGame.display = function(){
         document.getElementById('frame').innerHTML  = JSON.stringify(options.frame);
         var message = '';
         if(isGameOver()) {
            if (isBonusRound()) {
                console.log("bonus");
               message = options.score + " Bonus Round! " ;
            }
           else
              message = options.score + "  Game Over! Please re-start ..."
         } else {
            message = options.score ;
         }
        document.getElementById('score').innerHTML  = message;
    }

// ==== private methods =======
    function setRoll(val, i, pins){
       return (val == null ) ? Math.floor(Math.random() * pins) + 1 : val[i-1];
    }
    function updateFrame() {
        options.frame.push(options.rolls);
        options.rolls = {};
    }
    function isGameOver(){
        return options.frame.length >= options.noOfPins;
    }
    function isBonusRound(){
        var t = options.frame[options.frame.length-1]['T'];
        if( (t == '-' && options.frame.length == options.noOfPins) 
               || options.frame.length == options.bonusRound) { //bonus over
             return false;
        } else {
            if(t == '/') { options.start=2;}
            return true;
        }       
    }

    return bowlingGame;
}