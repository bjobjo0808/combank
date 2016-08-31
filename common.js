$(function() {
	// アニメーション禁止
	$.support.transition = false;
	// クリップボード
	var clipboard = new Clipboard('.copy');
	clipboard.on('success', function(e) {
		e.clearSelection();
		$('#tab-recipe').tab('show');
		$().alert('close');
		$(".alert").show();
		setTimeout( function() {
			$(".alert").slideUp();
		}, 500 );
	});

	recipeList = [];
	$("#recipe-list").on("click", "button", function(event) {
		var row = recipeList[$(this).data("index")];
		$("#recipe").val(row.command);
		$("#description").html(row.description);
		$('#tab-input').tab('show');
		$('#recipe').focus();
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
		command = command.replace("[@1]", $("#input1").val() ? $("#input1").val() : "@1");
		command = command.replace("[@2]", $("#input2").val() ? $("#input2").val() : "@2");
		command = command.replace("[@3]", $("#input3").val() ? $("#input3").val() : "@3");
		command = command.replace("[@4]", $("#input4").val() ? $("#input4").val() : "@4");
		command = command.replace("[@5]", $("#input5").val() ? $("#input5").val() : "@5");
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
