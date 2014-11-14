app.controller('MainCtrl', function MainCtrl($scope, Board) {
	$scope.isSelected = false;
	$scope.board = [];
	$scope.words = [];
	$scope.paths = $scope.in_a_path = $scope.last_in_a_path = [];

	$scope.startGame = function() {
		$scope.board = Board.new_board();

		console.log($scope.board);
	};

	// set selected positions
	// if keyCode == enter-key -> submitWord
	$scope.findWord = function($event) {
		var word, paths, status;



		// if blank, ignore, but clear coulda been deleting
		if (!$scope.word.length) {
			$scope.clearAll();
			return;
		}

		word = $scope.word.toUpperCase();
		console.log('findWord called, word is:', word)

		// if enterkey
		if ($event.keyCode == 13) {
			$scope.word = '';
			console.log(word);
			$scope.clearAll();

			paths = Board.paths_for_word($scope.board, word);
			console.log(paths);

			// if paths then submit to server
			// else drop it like its hot
			status = paths.length ? 'pending' : 'invalid';
				
			$scope.words.push({text: word, status: status});
		} else {
			set_selected_positions(word);
		}
	};

	$scope.isInPath = function(index){
		return $scope.in_a_path.indexOf(index) !== -1;
	};

	$scope.isLastInPath = function(index){
		return $scope.last_in_a_path.indexOf(index) !== -1;
	};

	$scope.highlighted = function(pos){
			if ($scope.last_in_a_path.indexOf(pos) !== -1)
				return 'last_in_path';
			else if ($scope.in_a_path.indexOf(pos) !== -1)
				return 'in_path';
			else
				return false;
	};

	$scope.clearAll = function(){
		$scope.paths = $scope.in_a_path = $scope.last_in_a_path = [];
	}

	var set_selected_positions = function(word) {
		$scope.paths = Board.paths_for_word($scope.board, word.toUpperCase());
		$scope.in_a_path = [];
		$scope.last_in_a_path = [];

		for (var i = 0; i < $scope.paths.length; i++) {
			$scope.in_a_path = $scope.in_a_path.concat($scope.paths[i]);
			$scope.last_in_a_path.push($scope.paths[i].slice(-1)[0]);
		}


		/*
		for (var pos = 0; pos < 16; pos++) {
			if (last_in_path.indexOf(pos) !== -1)
				Session.set('selected_' + pos, 'last_in_path');
			else if (in_a_path.indexOf(pos) !== -1)
				Session.set('selected_' + pos, 'in_path');
			else
				Session.set('selected_' + pos, false);
		}
		*/
	};
});