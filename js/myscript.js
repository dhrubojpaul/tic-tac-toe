$(document).ready(function(){
	$("h1").animate({"font-size":"35px"});
	$("#hardnessDiv").hide();
	$("#gridSizeMessage").text("Please input an integer!");
	$("#gridSizeMessage").hide();
	$("#gridSize").val("");
	$("#secondPage").css("display", "none");
	$("#thirdPage").css("display", "none");
	var result="false";
	var winner="none";
	var player=1;
	var moveCount=0;
	
	$("#player2Go").css("background-color", "lightgray");
	$("#player1Go").css("background-color", "orange");
	
	var isComposedSomething=false;

	var saveRequest=function(e) {
		if(isComposedSomething){
			return "আপনি পত্র সংরক্ষিত হয় নাই ।  অন্য পেজে যেতে চাইলে Leave this page -তে ক্লিক করুন । ";
		}else{
			return;
		}
	};
	function windowBeforeUnload(){
		return confirm("আপনার  পত্র সংরক্ষিত হয় নাই । অন্য পেজে যেতে চাইলে OK -তে ক্লিক করুন । ");
	}
	window.onbeforeunload = saveRequest;
	
	
	//draw
	
	function populateHardness(){
		var gridSize=$("#gridSize").val();
		var i;
		$("#hardness").html("");
		for (i=3;i<=gridSize;i++){
			$("#hardness").append("<option value='"+i+"'>"+i+"</option>");
		}
	}
	
	function drawGrid(){
		var gridSize=$("#gridSize").val();
		var blockWidth=800-400*Math.pow(Math.E,-(parseInt(gridSize)*(0.05))); 
		var marginWidth=30/gridSize;
		
		var i,j;
		for (i=1;i<=gridSize;i++){
			$("#grid").append("<div id=col-"+i+" class='inline-row'></div");
			for(j=1;j<=gridSize;j++){
				$("#col-"+i+"").append("<div class=block id='row-"+j+"-col-"+i+"'></div>");
				//
				$("#row-"+j+"-col-"+i+"").css("height", "0px");
				$("#row-"+j+"-col-"+i+"").css("width", "100px");
				$("#row-"+j+"-col-"+i+"").animate({"height": ""+blockWidth/gridSize+"px"}, "fast");
				$("#row-"+j+"-col-"+i+"").animate({"width": ""+blockWidth/gridSize+"px"}, "fast");
			}			
		}
		$(".block").css({"margin-bottom": ""+marginWidth+"px", "margin-right": ""+marginWidth+"px"});
		
	}
	
	
	
	//check
	
	function rowMatch(row, col, hardness){
		
		var gridSize=$("#gridSize").val();
		var left, right, totalLength, value, tempRow, tempCol;
		left=0;
		right=0;
		tempRow=parseInt(row);
		tempCol=parseInt(col);
		console.log("rowmatch: "+tempRow+" "+tempCol);
		if(($("#row-"+row+"-col-"+col+"")).hasClass("round")){value=0;}else{value=1;}
		
		//console.log("value= "+value+", tempRow= "+tempRow+", tempCol= "+tempCol);
		
		if(value==0){
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempCol>0){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("round")){
					left++;
					tempCol--;
				}
				else{
					console.log("rowMatch-Left: "+left);
					break;					
				}
			}
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			console.log("GridSize "+gridSize);
			console.log("tempRow= "+tempRow+", tempCol= "+tempCol);
			while(parseInt(tempCol)<=parseInt(gridSize)){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("round")){
					right++;
					tempCol++;
				}
				else{
					console.log("rowMatch-Right: "+right);
					break;					
				}
			}
		}
		else{
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempCol>0){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("cross")){
					left++;
					tempCol--;
				}
				else{
					break;					
				}
			}
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(parseInt(tempCol)<=parseInt(gridSize)){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("cross")){
					right++;
					tempCol++;
				}
				else{
					break;					
				}
			}
		}
		totalLength=left+right-1;
		console.log("Longest Row: "+totalLength);
		if(totalLength>=hardness){
			return true;
		}
		return false;	
	}
	
	function colMatch(row, col, hardness){
		var gridSize=$("#gridSize").val();
		var up, down, totalLength, value, tempRow, tempCol;
		up=0;
		down=0;
		tempRow=parseInt(row);
		tempCol=parseInt(col);
		if(($("#row-"+row+"-col-"+col+"")).hasClass("round")){value=0;}else{value=1;}
		
		//console.log("value= "+value+", tempRow= "+tempRow+", tempCol= "+tempCol);
		
		if(value==0){
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow>0){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("round")){
					up++;
					tempRow--;
				}
				else{
					break;					
				}
			}
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow<=gridSize){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("round")){
					down++;
					tempRow++;
				}
				else{
					break;					
				}
			}
		}
		else{
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow>0){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("cross")){
					up++;
					tempRow--;
				}
				else{
					break;					
				}
			}
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow<=gridSize){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("cross")){
					down++;
					tempRow++;
				}
				else{
					break;					
				}
			}
		}
		
		totalLength=up+down-1;
		console.log("Longest Column: "+totalLength);
		if(totalLength>=hardness){
			return true;
		}
		return false;	
	}
	
	
	function positiveDiagonalMatch(row, col, hardness){
		var gridSize=$("#gridSize").val();
		var upRight, downLeft, totalLength, value, tempRow, tempCol;
		upRight=0;
		downLeft=0;
		tempRow=parseInt(row);
		tempCol=parseInt(col);
		if(($("#row-"+row+"-col-"+col+"")).hasClass("round")){value=0;}else{value=1;}
		
		if(value==0){
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow>0 && tempCol<=gridSize){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("round")){
					upRight++;
					tempRow--;
					tempCol++;
				}
				else{
					break;					
				}
			}
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow<=gridSize && tempCol>0){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("round")){
					downLeft++;
					tempRow++;
					tempCol--;
				}
				else{
					break;					
				}
			}
		}else{
			tempRow=parseInt(row);
			tempCol=parseInt(col);	
			while(tempRow>0 && tempCol<=gridSize){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("cross")){
					upRight++;
					tempRow--;
					tempCol++;
				}
				else{
					break;					
				}
			}
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow<=gridSize && tempCol>0){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("cross")){
					downLeft++;
					tempRow++;
					tempCol--;
				}
				else{
					break;					
				}
			}
		}
		totalLength=upRight+downLeft-1;
		console.log("Longest Positive Diagonal: "+totalLength);
		if(totalLength>=hardness){
			return true;
		}
		return false;	
	}
	
	function negativeDiagonalMatch(row, col, hardness){
		var gridSize=$("#gridSize").val();
		var upLeft, downRight, totalLength, value, tempRow, tempCol;
		upLeft=0;
		downRight=0;
		tempRow=parseInt(row);
		tempCol=parseInt(col);
		if(($("#row-"+row+"-col-"+col+"")).hasClass("round")){value=0;}else{value=1;}
		
		if(value==0){
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow>0 && tempCol>0){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("round")){
					upLeft++;
					tempRow--;
					tempCol--;
				}
				else{
					break;					
				}
			}
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow<=gridSize && tempCol<=gridSize){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("round")){
					downRight++;
					tempRow++;
					tempCol++;
				}
				else{
					break;					
				}
			}
		}else{
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow>0 && tempCol>0){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("cross")){
					upLeft++;
					tempRow--;
					tempCol--;
				}
				else{
					break;					
				}
			}
			tempRow=parseInt(row);
			tempCol=parseInt(col);
			while(tempRow<=gridSize && tempCol<=gridSize){
				if(($("#row-"+tempRow+"-col-"+tempCol+"")).hasClass("cross")){
					downRight++;
					tempRow++;
					tempCol++;
				}
				else{
					break;					
				}
			}
		}
		
		totalLength=upLeft+downRight-1;
		console.log("Longest Negative Diagonal: "+totalLength);
		if(totalLength>=hardness){
			return true;
		}
		return false;
	}
	
	
	function diagonalMatch(row, col, hardness){
		if(positiveDiagonalMatch(row, col, hardness) || negativeDiagonalMatch(row, col, hardness)){
			return true;
		}
		return false;	
	}
	
	
	function isGameFinished(row, col){
		var hardness=$("#hardness").val();
		if(rowMatch(row, col, hardness) || colMatch(row, col, hardness) || diagonalMatch(row, col, hardness)){
			return true;
		}
		return false;
	}
	
	function isGridFull(){
		var gridSize=$("#gridSize").val();
		var i,j;
		for(i=1;i<=parseInt(gridSize);i++){
			for(j=1;j<=parseInt(gridSize);j++){
				if(!(($("#row-"+i+"-col-"+j+"")).hasClass("checked"))){
					return false;
				}
			}
		}
		winner="none";
		return true;
	}
	
	
	function clearUpForRetry(){
		var gridSize=$("#gridSize").val();
		var i,j;
		for(i=1;i<=parseInt(gridSize);i++){
			for(j=1;j<=parseInt(gridSize);j++){
				if((($("#row-"+i+"-col-"+j+"")).hasClass("checked"))){
					($("#row-"+i+"-col-"+j+"")).removeClass("checked");
					if((($("#row-"+i+"-col-"+j+"")).hasClass("round"))){
						($("#row-"+i+"-col-"+j+"")).removeClass("round");
					}else{
						($("#row-"+i+"-col-"+j+"")).removeClass("cross");
					}
				}
			}
		}
		result="false";
		winner="none";
		player=1;
		moveCount=0;
		$("#gameStatus").text("");
		$("#player2Go").css("background-color", "lightgray");
		$("#player1Go").css("background-color", "orange");
	}
	
	function clearUpForRestart(){
		clearUpForRetry();
		$("#gridSize").val(null);
		$("#hardness").html("<option value='null'>Select Hardness</option>");
	}
	
	
	
	
	
	
	
	
    $("#gridSize").keyup(function(){
		var gridSize=$("#gridSize").val();
		
		if($("#gridSize").val().length===0){
			$("#gridSizeMessage").text("Do not keep it blank!");
			$("#gridSizeMessage").show();
			$("#hardnessDiv").slideUp();
		}
		else if(!isNaN(gridSize) && gridSize<3){
			$("#gridSizeMessage").text("Too small! Minimum grid size is 3.");
			$("#gridSizeMessage").show();
			$("#hardnessDiv").slideUp();
		}
		else if(!isNaN(gridSize) && gridSize>20){
			$("#gridSizeMessage").text("Too large!  Maximum grid size is 20.");
			$("#gridSizeMessage").show();
			$("#hardnessDiv").slideUp();
		}
		else if(!isNaN(gridSize) && Math.floor(gridSize) == gridSize){
			$("#gridSizeMessage").hide();
			populateHardness();
			$("#hardnessDiv").slideDown();			
		}else{
			$("#gridSizeMessage").text("Please input an integer!");
			$("#gridSizeMessage").show();
			$("#hardnessDiv").slideUp();
			
		}
	});
	
	$("#playButton").click(function(){
		if($("#hardness").val()=="null"){
			
		}
		else{
			$("#firstPage").slideUp();	
			$("#secondPage").show();
			//$("h1").animate({"font-size":"200px"}, "fast", "swing");
			$("#secondPage").css("display", "block");
			$("h1").animate({"font-size":"50px"});
			console.log($("#gridSize").val()+" "+$("#hardness").val());
			drawGrid();	
		}
		isComposedSomething=true;
		
	});
	
	
	
	
	
	
	//second page
	
	
	
	
	
	$("div").on("click", ".block", function(event){
		
		
		event.stopImmediatePropagation();
		
		player=1-player;
		
		if(result!="true"){
			if(!($(this).hasClass("checked"))){
				if(player==0){
					$(this).addClass("round");
					moveCount++;
				}else{
					$(this).addClass("cross");
				}	
				$(this).addClass("checked");
			}
			
			//var row=($(this).attr("id")).charAt(4);
			//var col=($(this).attr("id")).charAt(10);
			
			var currentPosId = $(this).attr("id");
			var splittedResult=	currentPosId.split("-"); 
			
			var row=splittedResult[1];
			var col=splittedResult[3];
			
			console.log("row: "+ row +" col: "+ col);
		
			if(isGameFinished(row, col)){
				result="true";
				winner=player+1;
			}
			else if (isGridFull()){
				result="true";
				console.log("Grid is Full, Winner: "+winner);
			}
			
			if(player==0){
				$("#player2Go").css("background-color", "orange");
				$("#player1Go").css("background-color", "lightgray");
			}else{
				$("#player2Go").css("background-color", "lightgray");
				$("#player1Go").css("background-color", "orange");
			}
			
			if(result=="true"){
				$("#gameStatus").text("Game Over");
				$("#secondPage").slideUp();
				$("#thirdPage").show();
				//$("#thirdPage").css("z-index",999);
				//$("#thirdPage").css("position","fixed");
				if(winner=="none"){
					$("#winnerAnnouncement").text("It's a Draw!!");
				}else{
					$("#winnerAnnouncement").text("Player "+winner+" Wins after "+moveCount+" moves!!");
				}
				
			}
			else{
				$("#gameStatus").text("Game Running");
			}
			console.log(result);
		
		}
		
		
			
	});
	
	
	$("div").on("click", "#retry", function(){
		$("#thirdPage").slideUp();$("#thirdPage").hide();
		clearUpForRetry();
		$("#secondPage").slideDown();
	});
	
	$("div").on("click", "#restart", function(){
		$("#thirdPage").slideUp();$("#thirdPage").hide();
		clearUpForRestart();
		$("#firstPage").slideDown();
		$("#hardnessDiv").hide();
	});
	
	

	
	
});
