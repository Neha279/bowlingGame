function test1(){
	var bwtest = bowlingGame(10);
	var score= 0;
	for(var i=0; i<=10; i++){
	 	bwtest.roll([10,0]); //  strike
	}
	score = bwtest.score();
	console.log("test 1 result:", score, score === 300 ? "PASSED!" : "FAILED!");
	bwtest.reset();
}

function test2(){
	 var bwtest = bowlingGame(10);
	 var score= 0;
	 for(var i=0; i<=10; i++){ 	
	 	if(i==10){  bwtest.roll([0,9]); } 
	 	else bwtest.roll([9,1]); // spare
	 }
	 score = bwtest.score();
	console.log("test2 result:", score , score === 198 ? "PASSED!" : "FAILED!");
	bwtest.reset();
}

function test3(){
	 var bwtest = bowlingGame(10);
	 var score= 0;
	 for(var i=0; i<=10; i++){ //no all 
	 	if(i==9){
	 		bwtest.roll([3,4]);
	 	} else {
	 	  bwtest.roll([8,0]);
	    }
	}
	score = bwtest.score();
	console.log("test3 result:",score , score === 79 ? "PASSED!" : "FAILED!");
	bwtest.reset();
}


