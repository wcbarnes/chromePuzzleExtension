


html2canvas(document.body).then(function(canvas) {
	alert("As a security precaution, please piece the website back together before attempting to use it!");
	$("body").children().hide();
	$("body").css("position", "relative");

	let imagePieces = [];
	let columnsToCut = 3;
	let rowsToCut = 3;


	let pieceWidth = canvas.width/columnsToCut;
	let pieceHeight = canvas.height/rowsToCut;
	for (let x = 0; x < columnsToCut; ++x) {
		for (let y = 0; y < rowsToCut; ++y) {
			let pieceCanvas = document.createElement('canvas');
			pieceCanvas.width = pieceWidth;
			pieceCanvas.height = pieceHeight;
			let context = pieceCanvas.getContext('2d');
			context.drawImage(canvas, y * pieceWidth, x * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceCanvas.width, pieceCanvas.height);
			imagePieces.push(pieceCanvas.toDataURL());
		}
	}

	const imageArray = imagePieces;
	let originalPngStr = "";
	for (let i = 0; i < imageArray.length; i++) {
		originalPngStr += JSON.stringify(imageArray[i]);
	}

	for (let i = imagePieces.length-1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = imagePieces[i];
		imagePieces[i] = imagePieces[j];
		imagePieces[j] = temp;
	}

	for (let i = 0; i < rowsToCut * columnsToCut; i++) {

		$("body").append('<img class="puzzle" style="cursor:move" draggable="true" display="inline-block" width="33.33333333%" src="' + imagePieces[i] + '">');
	}



	let dragSrcEl = null;

function handleDragStart(e) {

	dragSrcEl = this;
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('image/png', this.src)
}

function handleDragOver (e) {
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.dataTransfer.dropEffect = "move";
	return false;
}

function handleDrop(e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	}
	if (dragSrcEl != this) {
		dragSrcEl.src = this.src;
		this.src = e.dataTransfer.getData('image/png');
	}
	let currentPngStr = "";
	let pieces = $('.puzzle').toArray();
	console.log(pieces)
	for (let i = 0; i < pieces.length; i++) {
		currentPngStr += JSON.stringify(pieces[i].src);
	}
	if (currentPngStr === originalPngStr) {
		$(".puzzle").remove();
		$("body").children().show();
		alert("You can now access this Website!");
	}
	return false;
}

let images = $('img').toArray();


[].forEach.call(images, function(image) {
	image.addEventListener('dragstart', handleDragStart, false);
	image.addEventListener('drop', handleDrop, false);
	image.addEventListener('dragover', handleDragOver, false);
});



});



