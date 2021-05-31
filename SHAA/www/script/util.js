/* 
    автор(с): Кудуштеев Алексей
    простые Русские шашки, без всяких минимакс и т.п. алгоритмов, просто "тупо" в лоб наивное решение...
    игра создана при помощи JavaScript ES6 HTML5, браузер FireFox Quantum
*/


//рисование шашек и дамок
function build_checkers(chks, size, bgcolor){
	let hdc = chks.getContext("2d");
	hdc.fillStyle = bgcolor;		
	hdc.fillRect(0, 0, chks.width, chks.height);

	const crad = size * 0.35;
	const irad = size * 0.24;
	const krad = size * 0.29;
	const mrad = size * 0.1;
	const cols = ["#FFFFFF", "#111111"];
	const gray = "#AAAAAA";
	const black= "#000000";
	const king = "#FF7711";
	const  mid = size >>> 1;
	const  ang = Math.PI * 2;

	let tmp, x, y, one;
	for(let i = 0; i < 4; ++i){
		hdc.lineWidth   = 1;
		hdc.strokeStyle = black;
		hdc.beginPath();
		hdc.arc(i * size + mid, mid, crad, 0, ang);
		hdc.stroke();

		let rdx = hdc.createRadialGradient(i*size + mid, krad, krad, i*size + mid, mid, mid);
		let inx = (i < 2) ? 0 : 1;
		rdx.addColorStop(0, cols[inx]);
		rdx.addColorStop(1, cols[inx ^ 1]);

		tmp = hdc.shadowBlur;
		hdc.fillStyle   = rdx;
		hdc.shadowBlur  = mrad;
		hdc.shadowColor = black;

		hdc.beginPath();
		hdc.arc(i * size + mid, mid, crad, 0, ang);
		hdc.fill();
		hdc.shadowBlur = tmp;
		delete rdx;
		rdx = null;

		//вывести корону
		one = ((i & 1) == 1);
		if(one){
			hdc.fillStyle = king;
			draw_king(hdc, i * size + mid, mid, mrad, size, mid);
		}

		hdc.lineWidth   = 3;
		hdc.strokeStyle = gray;
		hdc.beginPath();
		hdc.arc(i * size + mid, mid, ((i & 1) == 1) ? krad : irad, 0, ang);
		hdc.stroke();

		if(one)
			continue;

		hdc.lineWidth   = 2;
		hdc.strokeStyle = gray;
		hdc.beginPath();
		hdc.arc(i * size + mid, mid, mrad, 0, ang);
		hdc.stroke();
	}
	return crad;
}


//рисование короны для дамки
function draw_king(hdc, x, y, rad, size, mid){
	let   cx = rad * 0.3;
	let left = x - mid + cx + (size - cx * 6)/2;
	for(let i = 0; i < 3; ++i, left += cx * 2){
		hdc.beginPath();
		hdc.moveTo(left - cx, mid + rad);
		hdc.lineTo(left, y - rad);
		hdc.lineTo(left + cx, mid + rad);
		hdc.closePath();
		hdc.fill();
	}
}


function matrix_create(num){
	let mat = [];
	for(let i = 0; i < num; ++i){
		mat.push(new Array(num));
		for(let j = 0; j < mat[i].length; ++j)
			mat[i][j] = new xcell(0, 0);

	}
	return mat;
}


function matrix_free(mat){
	for(let i = 0; i < mat.length; ++i){
		for(let j = 0; j < mat[i].length; ++j){
			if(mat[i][j] != null){
				delete mat[i][j];
				mat[i][j] = null;
			}
		}
		delete mat[i];
		mat[i] = null;
	}
}


//хранение координат(8-бит)
function array_coord(count) {
	this.pos = new Uint16Array(count);
	this.cnt = 0;

	this.add = (row, col) => {
		if(this.cnt < this.pos.length)
			this.pos[this.cnt++] = ((row & 0xFF) << 8) | (col & 0xFF);
	}

	this.add_unique = (row, col) => {
		if(!this.is_find(row, col))
			this.add(row, col);
	}

	this.append = (arr) => {
		for(let i = 0; i < arr.getCount(); ++i){
			if(this.cnt < this.pos.length)
				this.pos[this.cnt++] = arr.getAt(i);
		}
	}

	this.copy = (arr) => {
		if(arr instanceof array_coord){
			this.pos.set(arr.pos, 0);
			this.cnt = arr.getCount();
		}
	}

	this.reset = () => {
		this.cnt = 0;
	}

	this.max_size = () => {
		return this.pos.length;
	}

	this.getCount = () => {
		return this.cnt;
	}

	this.getRow = (i) => {
		return (this.pos[i] >>> 8) & 0xFF;
	}

	this.getCol = (i) => {
		return this.pos[i] & 0xFF;
	}

	this.setRow = (i, row) => {
		this.pos[i] = (this.pos[i] & 0x00FF) | ((row & 0xFF) << 8);
	}

	this.setCol = (i, col) => {
		this.pos[i] = (this.pos[i] & 0xFF00) | (col & 0xFF);
	}

	this.setAt = (i, val) => {
		this.pos[i] = val;
	}

	this.getAt = (i) => {
		return this.pos[i];
	}

	this.pop = () => {
		if(this.cnt > 0)
			--this.cnt;
	}

	this.backRow = () => {
		return (this.pos[this.cnt - 1] >>> 8) & 0xFF;
	}
	
	this.backCol = () => {
		return this.pos[this.cnt - 1] & 0xFF;
	}	

	this.is_find = (row, col) => {
		let val = ((row & 0xFF) << 8) | (col & 0xFF);
		for(let i = 0; i < this.cnt; ++i){
			if(this.pos[i] == val)
				return true;
		}
		return false;
	}

	this.isEmpty = () => {
		return (this.cnt == 0);
	}

	this.free = () => {
		if(this.pos != null){
			delete this.pos;
			this.pos = null;
		}
		this.cnt = 0;
	}
}


function objAt(name){
	if(document.getElementById)
		return document.getElementById(name);
	return document.all[name];
}


function setText(o, s){
	if(o.innerText)
		o.innerText = s;
	else
		o.innerHTML = s;
}


var setVisible = (o) => {
	o.style.visibility = "visible";
}


//ячейка
function xcell(id, type) {
	this.id   = id;
	this.type = type;
}


function isPointRect(px, py, x, y, w, h){
	return ((px >= x) && (px <= (x + w)) && (py >= y) && (py <= (y + h)));
}
