app.service('Board', function Board(DICE, ADJACENCIES) {
	this.new_board = function() {
		var board = [];
		var i;

		// pick random letter from each die
		for (i = 0; i < 16; i += 1) {
			board[i] = DICE[i].charAt(Math.floor(Math.random() * 6));
		}

		// knuth shuffle
		for (i = 15; i > 0; i -= 1) {
			var j = Math.floor(Math.random() * (i + 1));
			var tmp = board[i];
			board[i] = board[j];
			board[j] = tmp;
		}

		return board;
	};


	// returns an array of valid paths to make the specified word on the
	// board.  each path is an array of board positions 0-15.  a valid
	// path can use each position only once, and each position must be
	// adjacent to the previous position.
	this.paths_for_word = function(board, word) {
		// if !word.length throw error or return false
		var valid_paths = [];

		var check_path = function(word, path, positions_to_try) {
			// base case: the whole word has been consumed.  path is valid.
			if (word.length === 0) {
				valid_paths.push(path); // <-- here's where we compose the valid_paths list
				return;
			}

			// otherwise, try to match each available position against the
			// first letter of the word, avoiding any positions that are
			// already used by the path.  for each of those matches, descend
			// recursively, passing the remainder of the word, the accumulated
			// path, and the positions adjacent to the match.

			for (var i = 0; i < positions_to_try.length; i++) {
				var pos = positions_to_try[i];
				// if letter in that position is the current one we're looking for
				// 		and
				// it has not yet been used i.e. placed in the path array
				// then this is a valid continuation path sofar so continue checking from next char
				// with this as the prefix path
				if (board[pos] === word[0] && path.indexOf(pos) === -1)
					check_path(word.slice(1), // cdr of word
						path.concat([pos]), // append matching loc to path
						ADJACENCIES[pos]); // only look at surrounding tiles
			}
		};

		// start recursive search w/ full word, empty path, and all tiles
		// available for the first letter.
		check_path(word, [], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

		return valid_paths;
	};


});