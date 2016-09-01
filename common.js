$(function() {
	var recipe;
	$(".form-input").hide();
	
	// アニメーション禁止
	$.support.transition = false;
	// クリップボード
	var clipboard = new Clipboard('.copy');
	clipboard.on('success', function(e) {
		e.clearSelection();
		$('#tab-recipe').tab('show');
	});

	recipeList = [];
	$("#recipe-list").on("click", "button", function(event) {
		recipe = recipeList[$(this).data("index")];
		$("#recipe").val(recipe.command);
		$("#description").html(recipe.description);
		$(".form-input").hide();
		if (recipe.input1 != null) {
			$("#form1").show();
			$("#desc-input1").html(recipe.input1);
			$('#input1').focus();
		} else {
			$('#recipe').focus();
		}
		if (recipe.input2 != null) {
			$("#form2").show();
			$("#desc-input2").html(recipe.input2);
		}
		if (recipe.input3 != null) {
			$("#form3").show();
			$("#desc-input3").html(recipe.input3);
		}
		if (recipe.input4 != null) {
			$("#form4").show();
			$("#desc-input4").html(recipe.input4);
		}
		if (recipe.input5 != null) {
			$("#form5").show();
			$("#desc-input5").html(recipe.input5);
		}
		
		$(".input").val("");
		changeCommand();
	});
	$("body").on("keypress", "input", function(event) {
		changeCommand();
	});
	$("body").on("keyup", "input", function(event) {
		changeCommand();
	});

	function changeCommand() {
		var command = $("#recipe").val();
		command = command.replace("[@1]", $("#input1").val() ? $("#input1").val() : recipe.input1);
		command = command.replace("[@2]", $("#input2").val() ? $("#input2").val() : recipe.input2);
		command = command.replace("[@3]", $("#input3").val() ? $("#input3").val() : recipe.input3);
		command = command.replace("[@4]", $("#input4").val() ? $("#input4").val() : recipe.input4);
		command = command.replace("[@5]", $("#input5").val() ? $("#input5").val() : recipe.input5);
		$("#command").html(command);
	}

	$.getJSON("recipe.json", null, // 送信データ
	function(data, status) {
		$("#recipe-list").html("");
		recipeList = data.rows;
		var isTitle = true;
		var i = 0;
		$(data.rows).each(function() {
			if (this.type == "title") {
				if (!isTitle) {
					$("</div>").appendTo('#recipe-list');
				}
				$("<h4>" + this.name + "</h4>").appendTo('#recipe-list');
				isTitle = true;
			} else {
				if (isTitle) {
					$("<div class=\"list-group\">").appendTo('#recipe-list');
				}
				$("<button type=\"button\" data-index=\"" + i + "\" class=\"list-group-item action-select-recipe\">" + this.name + "</button>").appendTo('#recipe-list');
				isTitle = false;
			}
			i++;
		})
		if (!isTitle) {
			$("</div>").appendTo('#recipe-list');
		}
	});
});
