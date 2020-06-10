$(document).contextmenu(function() {
    return false;
});

$(document).ready(function(){
let n=15;
let unactive=[0,1,2,3,4,5,6,7,8,9,10,11,12,24,36,48,60,72,84,96,108,120,132,,23,35,47,59,71,83,95,107,119,131,143,,142,141,140,139,138,137,136,135,134,133,132];
let home2=[-10,-9,1]
let home=[-1,1,-12,-13,-11,13,12,11];
let count=0;
let j;
let k;
let flag=true;
let i;
let counter=0
function look(x) {
	for(let j=0;j<144;j++){
		if(x.attr("class")==="box "+j+" checked"){
			for( let p=0;p<8;p++){
				if(!$(".box").eq(j-home[p]).hasClass("unactive") && !$(".box").eq(j-home[p]).hasClass("checked")){
					play($(".box").eq(j-home[p]));
				}
			}
		}
	}
}	


function play(x){
	let count=0;
	for(var i=13;i<131;i++){
		if(x.attr("class")==="box "+i){
			break;
		}
	}
	for( var k=0;k<8;k++){	
		if($(".box").eq(i-home[k]).hasClass("mine")){
			count++;	
		}
	}
	x.css("background-color","lightblue");
	x.addClass("checked");
	if(count!=0){
		x.text(count);
	}
	if(count===0){
		look(x);
	}
	
}
$(document).on("click",".green",function(){
	if(!$("#nob").val()){
		alert("please enter number of bombs first then click on start");
	}
	else{
		$(".green").attr("disabled",true);
		n=$("#nob").val();	
		for(i=0;i<144;i++){
			$(".main").append("<div class='box'></div>")
		}
		for(i=0;i<unactive.length;i++){
			$(".box").eq(unactive[i]).addClass("unactive");
		}
		for(i=0;i<144;i++){
			$(".box").eq(i).addClass(" "+i);
		}
		let mines=[];
		for(i=0;i<n;i++){
			mines.push(Math.floor(Math.random()*100));
			for(j=0;j<mines.length;j++){
				for(k=0;k<mines.length;k++){
					if(mines[j]===mines[k] && j!=k){
						mines[k]=Math.floor(Math.random()*100);
					}
				}
			}
		}
		for(i=0;i<n;i++){
			$(".box").not(".unactive").eq(mines[i]).attr("id","mine"+i);
			$("#mine"+i).addClass("mine");
			$(".mine").html('<i class="fa fa-bomb" style="color: red; font-size: 30px"></i>');
			//$(".fa-bomb").addClass("bombNone");
		}
		$(document).on("mousedown", ".mine",function(event){
			if(flag){
				let id=$(this).attr("id");
				switch (event.which) {
		        case 1:
		            $("#"+id +" .fa").removeClass("bombNone");
					$(this).css("background-color","black");
					$(".statusBox").addClass("block");
		        	break;
		        case 3:
		        	if($(this).hasClass("flag")){
		        		$(this).removeClass("flag");
		        	}
		        	else{
		            $(this).addClass("flag");
		   			}
		            for(let q=0;q<n;q++){
						if($(".mine").eq(q).hasClass("flag")){
						counter++;
						}
					}
					if(counter===+n){
						$(".statusBox").html("You win");
						$(".statusBox").addClass("block");
						flag===false;
					}
					counter=0;
		            break;
		        default:
				}
			}
		
		})
		$(document).on("mousedown" ,".box:not(.mine , .unactive)",function(){
			if(flag){
				 switch (event.which) {
				
		        case 1:
		            play($(this));
		        	break;
		        case 3:
		        	if($(this).hasClass("flag")){
		        		$(this).removeClass("flag");
		        	}
		        	else{
		            $(this).addClass("flag");
		   			 }
		            break;
		        default:
	    		}
	    	}
			
		})
	}
})	

	
	
})