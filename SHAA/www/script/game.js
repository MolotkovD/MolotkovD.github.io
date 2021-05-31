/* 
    автор(с): Кудуштеев Алексей
    простые Русские шашки, без всяких минимакс и т.п. алгоритмов, просто "тупо" в лоб наивное решение...
    игра создана при помощи JavaScript ES6 HTML5, браузер FireFox Quantum
*/


//создание
function game_create(){
	g_carr  = new array_coord(32);
	g_path  = new array_coord(32);
	g_steps = new array_coord(32);
	g_curve = new array_coord(32);

	g_field = matrix_create(FIELD_NUM);
	let hbm = objAt("field");

	hbm.onclick = game_mouse_down;

	let  w = Math.ceil(window.innerWidth  * 0.85);
	let  h = Math.ceil(window.innerHeight * 0.85);

	let  m = Math.min(w, h);
	g_size = Math.round(m / FIELD_NUM) >>> 0;
	g_mid  = g_size >>> 1;
// ОКНА
	g_width    = g_size * FIELD_NUM;
	g_height   = g_size * FIELD_NUM;
	hbm.width  = g_width;
	hbm.height = g_height;

	g_hdc  = hbm.getContext("2d");
	g_chks = document.createElement("canvas");
	g_chks.width  = g_size * 4;
	g_chks.height = g_size;

	g_ckrad = build_checkers(g_chks, g_size, g_colors[1]);
	menu_init(g_hdc, hbm.width, hbm.height);

	setStatus("Alfa 0.0.1 beta", "#AAAAAA");
}


//вывод шашек в начале
function game_init(){
	g_sel.select = g_sel.next = false;
	draw_board();
	for(let i = 0; i < g_field.length; ++i){
		for(let j = 0; j < g_field[i].length; ++j){
			g_field[i][j].id   = check_type.NONE;
			g_field[i][j].type = check_type.NOT;
		}
	}

	//обнулить ходы пустые
	for(let i = 0; i < g_field.length; ++i){
		for(let j = (i & 1) ^ 1; j < g_field[i].length; j += 2){
			g_field[i][j].id   = check_type.EMPTY;
			g_field[i][j].type = check_type.NOT; 
		}
	}

	//расставить шашки
	let n = g_field.length - 1;
	for(let i = 0; i < 3; ++i){
		//шашки компьютера
		for(let j = (i & 1) ^ 1; j < g_field[i].length; j += 2){
			g_field[i][j].id   = check_type.PAWN;
			g_field[i][j].type = g_cpu;
		}

		//шашки пользователя
		for(let j = i & 1; j < g_field[n - i].length; j += 2){
			g_field[n - i][j].id   = check_type.PAWN;
			g_field[n - i][j].type = g_user;
		}
	}

	//вывод шашек на холст
	for(let i = 0; i < g_field.length; ++i){
		for(let j = 0; j < g_field[i].length; ++j)
			checker_draw(i, j);
	}
}


//старт игры
function game_start(x, y){
	if(g_title_menu){
		setVisible(objAt("bar"));
		g_title_menu = false;
		x = y = 0;
	}

	if(!is_dialog_show())
		game_init();

	if(attack_first(x, y)){
		game_init();

		if(g_cpu_first)
			run_cpu();
		else
			setStatus("Ваш ход первый", "#FFFFAA");
	}
}


//щелчок кнопок мыши
function game_mouse_down(e){
	if(g_title_menu || is_dialog_show()){
		game_start(e.offsetX, e.offsetY);
		return;
	}

	if(g_cpu_first)
		return;

	if(user_attack(e.offsetX, e.offsetY)){
		if(!(g_sel.select | g_sel.next)){
			g_cpu_first = true;
			run_cpu();
		}
	}
}
