var app = angular.module('app', []);

// DI is working fine, but 
// DICE and ADJACENCIES aren't actually needed in the whole app ...
// move into the Board service ?
// ... unless DICE should be configurable or we wanna build the 
// ADJACENCIES list dynamically 
app.constant('DICE', ['PCHOAS', 'OATTOW', 'LRYTTE', 'VTHRWE',
	'EGHWNE', 'SEOTIS', 'ANAEEG', 'IDSYTT',
	'MTOICU', 'AFPKFS', 'XLDERI', 'ENSIEU',
	'YLDEVR', 'ZNRNHL', 'NMIQHU', 'OBBAOJ'
]);

app.constant('ADJACENCIES', [
	[1, 4, 5],
	[0, 2, 4, 5, 6],
	[1, 3, 5, 6, 7],
	[2, 6, 7],
	[0, 1, 5, 8, 9],
	[0, 1, 2, 4, 6, 8, 9, 10],
	[1, 2, 3, 5, 7, 9, 10, 11],
	[2, 3, 6, 10, 11],
	[4, 5, 9, 12, 13],
	[4, 5, 6, 8, 10, 12, 13, 14],
	[5, 6, 7, 9, 11, 13, 14, 15],
	[6, 7, 10, 14, 15],
	[8, 9, 13],
	[8, 9, 10, 12, 14],
	[9, 10, 11, 13, 15],
	[10, 11, 14]
]);
