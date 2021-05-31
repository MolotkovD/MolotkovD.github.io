/* 
    автор(с): Кудуштеев Алексей
    простые Русские шашки, без всяких минимакс и т.п. алгоритмов, просто "тупо" в лоб наивное решение...
    игра создана при помощи JavaScript ES6 HTML5, браузер FireFox Quantum
*/

const FIELD_NUM  = 8;
const TIMER_SHOW = 1000;
const FONT_FACE  = "px Georgia,Verdana,Arial,Tahoma,Helvetica,Sans-serif";
const g_colors   = ["#d4d593", "#897b3c"];
const g_lcolor   = "rgba(255,0,0,0.5)";
const g_scolor   = "rgba(255,0,255,0.3)";
const g_bcolor   = "rgba(0,0,0,0.5)";
const text_dlg   = ["Вы хотите ходить первым? Да или Нет?","ДА","НЕТ"];
const check_color= { WHITE:0, BLACK:2 };
const check_type = { NONE:-2, EMPTY:-1, PAWN:0, KING:1, NOT:3 };
const g_dirs     = [[1,1], [-1,1], [-1,-1], [1,-1]];
const g_invalid  = (row, col) => ((row < 0) || (col < 0) || (row >= FIELD_NUM) || (col >= FIELD_NUM));

var g_field = null;
var g_hdc   = null;
var g_chks  = null;
var g_size  = 1;
var g_mid   = 1;
var g_user  = check_color.WHITE;
var g_cpu   = check_color.BLACK;
var g_sel   = { row:0, col:0, select:false, next:false };
var g_ckrad = 0;
var g_carr  = null;
var g_path  = null;
var g_vec   = [[0,0],[0,0]];
var g_vec3  = [[0,0],[0,0],[0,0]];
var g_steps = null;
var g_curve = null;
var g_timer = null;
var g_width = 0;
var g_height= 0;
let g_n_user= 0;
let g_n_cpu = 0;
var g_cpu_first  = false;
var g_title_menu = true;
var     g_status = null;
let   g_show_sel = false;
let    g_bwidth  = 0;
let    g_bheight = 0;


//рисование начальной картинки
function menu_init(hdc, width, height){
	g_status = objAt("stx");

	let st = objAt("status");
	st.style.width  = width  + "px";
	let ph = Math.floor(height * 0.06);
	st.style.height = ph + "px";
	st.style.fontSize = Math.floor(ph * 0.7) + "px";

	let bar = objAt("bar");
	bar.style.width  = width  + "px";
	ph = Math.floor(height * 0.05);
	bar.style.height   = ph + "px";
	bar.style.fontSize = Math.floor(ph * 0.5) + "px";

	hdc.fillStyle = "#000044";
	hdc.fillRect(0, 0, width, height);

	ph = Math.floor(height * 0.1);
	hdc.font = ph + FONT_FACE;

	let m = ph * 0.25;
	hdc.strokeStyle = "#0000FF";
	hdc.strokeRect(m, m, width - m*2, height - m*2);

	const rus = "Русские шашки";
	let tmp = hdc.shadowBlur;
	hdc.shadowBlur  = Math.floor(ph);
	hdc.shadowColor = "#FF00FF";

	let sz = hdc.measureText(rus);
	hdc.fillStyle = "#AAAA00";

	for(let i = 3; i >= 0; --i)
		hdc.fillText(rus, (width - sz.width)/2 - i, (height - ph)/3 - i);

	hdc.shadowBlur = tmp;
	hdc.fillStyle  = "#FFFF00";
	hdc.fillText(rus, (width - sz.width)/2 + 1, (height - ph)/3 + 1);

	let cx = Math.floor(width  * 0.75);
	let cy = Math.floor(height * 0.22);
	let  x = (width  - cx)/2;
	let  y = (height - cy)/2 + cy;

	let ld = hdc.createLinearGradient(0, 0, cx, 0);
	ld.addColorStop(0, "#005580");
	ld.addColorStop(1, "#885522");

	hdc.fillStyle = ld;
	hdc.fillRect(x, y, cx, cy);

	hdc.strokeStyle = "#11AA11";
	hdc.strokeRect(x, y, cx, cy);

	const game = "нажмите чтобы играть";
	ph = Math.floor(height * 0.05);
	hdc.font = ph + FONT_FACE;
	hdc.fillStyle = "#25FF25";
	hdc.fillText(game, (width - hdc.measureText(game).width)/2, y + ph*2 + ph/2);
	delete ld;
	ld = null;
}


//вывод диалога
function draw_dialog(){
	let w = Math.round(g_width  * 0.7);
	let h = Math.round(g_height * 0.26);
	let x = (g_width  - w)/2;
	let y = (g_height - h)/2;

	let off = Math.floor(Math.min(w, h)) * 0.05;
	g_hdc.fillStyle = g_bcolor;
	g_hdc.fillRect(x + off, y + off, w + off, h + off);


	g_hdc.fillStyle = "#0044AA";
	g_hdc.fillRect(x, y, w, h);

	g_hdc.strokeStyle = "#0087DF";
	g_hdc.strokeRect(x, y, w, h);

	let fh = Math.floor(h * 0.12);
	g_hdc.font = fh + FONT_FACE;

	g_hdc.fillStyle = "#fffa12";
	g_hdc.fillText(text_dlg[0], (g_width - g_hdc.measureText(text_dlg[0]).width)/2, g_height * 0.45);

	//вывести кнопки
	g_bwidth  = Math.floor(w * 0.25);
	g_bheight = Math.floor(h * 0.32);

	off *= 2;
	g_vec[0][1] = g_vec[1][1] = y + (h - g_bheight)/2 + off;

	off *= 2;
	g_vec[0][0] = x + (w - (off + g_bwidth * 2))/2;
	g_vec[1][0] = g_vec[0][0] + g_bwidth + off;

	g_hdc.fillStyle = "#007700";
	g_hdc.strokeStyle = "#00CC00";
	for(let i = 0; i < g_vec.length; ++i){
		g_hdc.fillRect(g_vec[i][0], g_vec[i][1], g_bwidth, g_bheight);
		g_hdc.strokeRect(g_vec[i][0], g_vec[i][1], g_bwidth, g_bheight);		
	}

	g_hdc.fillStyle = "#48FF4F";
	fh = (g_bheight - fh)/2 + fh;
	for(let i = 1; i < text_dlg.length; ++i)
		g_hdc.fillText(text_dlg[i], g_vec[i-1][0] + (g_bwidth - g_hdc.measureText(text_dlg[i]).width)/2, g_vec[i-1][1] + fh);
}


function is_dialog_show(){
	return g_show_sel;
}


function setStatus(str, color){
	g_status.style.color = color;
	setText(g_status, str);
}


function state_game(){
	alert("Число побед пользователя: " + g_n_user + "\nЧисло побед компьютера: " + g_n_cpu);
}


//выбор кто ходит первый
function attack_first(x, y){
	if(g_timer != null)
		clearTimeout(g_timer);
	g_timer = null;

	g_path.reset();
	g_steps.reset();
	g_curve.reset();

	setStatus("", "#0");
	let next = false;

	if(!g_show_sel)
		draw_dialog();
	g_show_sel = true;

	for(let i = 0; i < g_vec.length; ++i){
		if(isPointRect(x, y, g_vec[i][0], g_vec[i][1], g_bwidth, g_bheight)){
			g_cpu_first = (i == 1);
			g_show_sel  = false;
			next = true;
			break;
		}
	}
	return next;
}


//выбор цвета шашек
function select_color(obj){
	if(g_show_sel)
		return;

	let cpu  = g_user;
	let user = g_cpu;

	if(user == check_color.WHITE)
		setText(obj, "Играть чёрными ⚫");
	else
		setText(obj, "Играть белыми ⚪");

	for(let i = 0; i < FIELD_NUM; ++i){
		for(let j = 0; j < FIELD_NUM; ++j){
			if(g_field[i][j].id == check_type.NONE)
				continue;
			else if(g_field[i][j].type == g_user)
				g_field[i][j].type = user;
			else if(g_field[i][j].type == g_cpu)
				g_field[i][j].type = cpu;
		}
	}
	g_user = user;
	g_cpu  = cpu;
	redraw_board();
}


//ход компьютера
function run_cpu(){
	if(g_cpu_first){
		setStatus("Компьютер ходит", "#33CCFF");
		if(!cpu_attack()){
			setStatus("Вы выиграли игру! 😃", "#22FF22");
			g_hdc.fillStyle = g_bcolor;
			g_hdc.fillRect(0, 0, g_width, g_height);
			++g_n_user;
			return;
		}

		if(!game_over(true)){
			if(g_path.isEmpty())
				go_user_next();
		}
	}
}


//ход пользователя
function go_user_next(){
	g_timer = null;
	setStatus("Ваш ход", "#FFFFAA");
	g_steps.reset();
	g_curve.reset();
	g_path.reset();
	g_cpu_first = false;

	if(!game_over(false))
		game_over(true);
}


//проверка на состояние игры
function game_over(post){
	let res = false;
	if(!post){
		//считаем кол-во шашек/дамок игрока и компьютера
		let user = 0, cpu = 0;
		for(let i = 0; i < FIELD_NUM; ++i){
			for(let j = 0; j < FIELD_NUM; ++j){
				if(g_field[i][j].id != check_type.NONE){
					if(g_field[i][j].type == g_user)
						++user;
					else if(g_field[i][j].type == g_cpu)
						++cpu;
				}
			}
		}

		if((cpu > 0) && (user == 0)) //cpu выиграл
			res = true;
	} else {
		//проверка пользовательских шашек/дамок на патовую ситуацию
		let r, c, id;
		for(let i = 0; i < FIELD_NUM; ++i){
			for(let j = 0; j < FIELD_NUM; ++j){
				id = g_field[i][j].id;
				if((id == check_type.NONE) || (id == check_type.EMPTY))
					continue;
				else if(g_field[i][j].type == g_user){
					if(is_look_free(i, j, (id == check_type.PAWN) ? 2 : 0, 4))
						return false;
				}
			}
		}
		res = true;
	}

	if(res) {
		setStatus("Вы проиграли компьютеру !😢", "#FF3111");
		g_hdc.fillStyle = g_lcolor;
		g_hdc.fillRect(0, 0, g_width, g_height);
		++g_n_cpu;
	}
	return res;
}


//выделить шашку
function checker_select(row, col){
	g_sel.row    = row;
	g_sel.col    = col;
	g_sel.select = true;
	g_hdc.beginPath();
	g_hdc.fillStyle = g_scolor;
	g_hdc.arc(col * g_size + g_mid, row * g_size + g_mid, g_ckrad, 0, Math.PI * 2);
	g_hdc.fill();
}


//рисование доски
function draw_board(){
	for(let i = 0; i < FIELD_NUM; ++i){
		for(let j = 0; j < FIELD_NUM; ++j){
			g_hdc.fillStyle = g_colors[(i + j) % 2];		
			g_hdc.fillRect(j * g_size, i * g_size, g_size, g_size);
		}
	}
}


//вывод пешки или дамки
function checker_draw(row, col){
	let id = g_field[row][col].id;
	if((id == check_type.NONE) || (id == check_type.EMPTY))
		return;

	let x = col * g_size;
	let y = row * g_size;
	let p = (id + g_field[row][col].type) * g_size;
	g_hdc.drawImage(g_chks, p, 0, g_size, g_size, x, y, g_size, g_size);
}


//ход на новое место предыдущее затирается
function checker_draw_place(prow, pcol, row, col){
	g_hdc.fillStyle = g_colors[1];		
	g_hdc.fillRect(pcol * g_size, prow * g_size, g_size, g_size);
	checker_draw(row, col);
}


//удаление вражеской шашки
function checker_erase(row, col){
	g_field[row][col].id   = check_type.EMPTY;
	g_field[row][col].type = check_type.NOT;
	g_hdc.fillStyle = g_colors[1];
	g_hdc.fillRect(col * g_size, row * g_size, g_size, g_size);
}


function checker_new_place(old_row, old_col, new_row, new_col){
	checker_swap(old_row, old_col, new_row, new_col);
	checker_erase(old_row, old_col);
	checker_draw(new_row, new_col);
}


//просмотр вокруг себя
function is_look_free(row, col, a, b){
	let r, c;
	for(let i = a; i < b; ++i){
		r = row + g_dirs[i][1];
		c = col + g_dirs[i][0];
		if(g_invalid(r, c))
			continue;
		else if(g_field[r][c].id == check_type.EMPTY)
			return true;
		else if(g_field[r][c].type == g_cpu){
			if(is_look_empty(r + g_dirs[i][1], c + g_dirs[i][0]))
				return true;
		}
	}
	return false;
}


//направление
function get_coord(r, c){
	if((r == 1) && (c == 1)){
		g_vec[0][0] = -1;
		g_vec[0][1] =  1;
		g_vec[1][0] =  1;
		g_vec[1][1] = -1;
	} else if((r == 1) && (c == -1)){
		g_vec[0][0] = -1;
		g_vec[0][1] = -1;
		g_vec[1][0] =  1;
		g_vec[1][1] =  1;
	} else if((r == -1) && (c == -1)){
		g_vec[0][0] =  1;
		g_vec[0][1] = -1;
		g_vec[1][0] = -1;
		g_vec[1][1] =  1;
	} else if((r == -1) && (c == 1)){
		g_vec[0][0] = -1;
		g_vec[0][1] = -1;
		g_vec[1][0] =  1;
		g_vec[1][1] =  1;
	}
}


//кол-во шашек/дамок
function cpu_count_kill(arr){
	let cnt = 0;
	for(let i = 0; i < arr.getCount(); ++i){
		if(g_field[arr.getRow(i)][arr.getCol(i)].type == g_user)
			++cnt;
	}
	return cnt;
}


//перерисовка
function redraw_board(){
	draw_board();
	for(let i = 0; i < g_field.length; ++i){
		for(let j = 0; j < g_field[i].length; ++j)
			checker_draw(i, j);
	}
}


//обмен
function checker_swap(from_row, from_col, to_row, to_col){
	g_field[to_row][to_col].id       = g_field[from_row][from_col].id;
	g_field[to_row][to_col].type     = g_field[from_row][from_col].type;
	g_field[from_row][from_col].id   = check_type.EMPTY;
	g_field[from_row][from_col].type = check_type.NOT;

	if((to_row == 0) && (g_field[to_row][to_col].type == g_user))//если строка нулевая то шашка превращается в дамку
		g_field[to_row][to_col].id = check_type.KING;
}


//просмотр вперёд на пустую клетку
function is_look_empty(row, col){
	if(g_invalid(row, col))
		return false;
	return (g_field[row][col].id == check_type.EMPTY);
}
