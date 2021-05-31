/* 
    автор(с): Кудуштеев Алексей
    простые Русские шашки, без всяких минимакс и т.п. алгоритмов, просто "тупо" в лоб наивное решение...
    игра создана при помощи JavaScript ES6 HTML5, браузер FireFox Quantum
*/


//просмотр в четыре стороны для проверки шашки на сруб
function is_user_pawn_crash(row, col){
	if(g_field[row][col].id == check_type.PAWN){
		let r, c;
		for(let i = 0; i < g_dirs.length; ++i){
			r = row + g_dirs[i][0];
			c = col + g_dirs[i][1];
			if(g_invalid(r, c))
				continue;
			else if((g_field[r][c].type == g_cpu) && is_look_empty(r + g_dirs[i][0], c + g_dirs[i][1]))
				return true;
		}
	} else if(g_field[row][col].id == check_type.KING)
		return is_user_king_crash(row, col);
	return false;
}


//просмотр в четыре стороны для проверки шашки на сруб
function is_user_king_crash(row, col){
	let r, c;
	for(let i = 0; i < g_dirs.length; ++i){
		r = row;
		c = col;
		do {
			r += g_dirs[i][0];
			c += g_dirs[i][1];
			if(g_invalid(r, c) || g_steps.is_find(r, c))
				break;
			else if(g_field[r][c].type == g_user)
				break;
			else if(g_field[r][c].type == g_cpu){
				if(is_look_empty(r + g_dirs[i][0], c + g_dirs[i][1]))
					return true;
				break;
			}
		} while(true);
	}
	return false;
}


//проверка есть ли компьютерные-шашки под сруб?
function is_cpu_crash(){
	let id;
	for(let i = 0; i < FIELD_NUM; ++i){
		for(let j = 0; j < FIELD_NUM; ++j){
			id = g_field[i][j].id;
			if((id == check_type.NONE) || (id == check_type.EMPTY))
				continue;
			else if(g_field[i][j].type == g_user){

				if(id == check_type.PAWN){
					if(is_user_pawn_crash(i, j))
						return true;
				} else if(id == check_type.KING){
					if(is_user_king_crash(i, j))
						return true;			
				}
			}
		}
	}
	return false;
}


//ход пешки
function user_move_pawn(from_row, from_col, to_row, to_col){
	let row = from_row - to_row;
	let col = from_col - to_col;
	if((col == 0) || (row == 0) || (Math.abs(row) != Math.abs(col)))
		return false;

	switch(row){ //один ход только вперёд
	case 1:
		if(is_cpu_crash()){
			setStatus("Вы должны срубить шашку", "#FF5522");
			return false;
		}
		checker_swap(from_row, from_col, to_row, to_col);
		checker_draw_place(from_row, from_col, to_row, to_col);
		g_sel.select = g_sel.next = false;
		break;
	case  2: //сруб вперёд или назад
	case -2:
		let r = to_row + row / 2;
		let c = to_col + col / 2;

		//если нет шашки-компьютера под сруб, то хода нет!
		if(g_field[r][c].type != g_cpu)
			return false;

		checker_erase(r, c);
		checker_new_place(from_row, from_col, to_row, to_col);
		g_steps.add(r, c);

		//здесь надо проверить на следующий сруб вражеской-шашки
		if(is_user_pawn_crash(to_row, to_col)){
			g_sel.row  = to_row;
			g_sel.col  = to_col;
			g_sel.next = true;
			checker_select(to_row, to_col);
		} else
			g_sel.select = g_sel.next = false;
		break;
	default:
		return false; //ошибка
	}
	return true;
}


//ход дамки
function user_move_king(from_row, from_col, to_row, to_col){
	let dy = to_row - from_row;
	let dx = to_col - from_col;
	let mx = Math.abs(dx);
	let my = Math.abs(dy);

	if((dx == 0) || (dy == 0) || (mx != my))
		return false;
	dx /= mx;
	dy /= my;

	let row = from_row;
	let col = from_col;
	let   r = -1, c = -1;
	do {
		row += dy;
		col += dx;
		if((row == to_row) && (col == to_col))
			break;
		else if(g_invalid(row, col))
			return false;
		else if(g_field[row][col].type == g_user){
			setStatus("Неправильное действие", "#FF0000");
			return false;
		} else if(g_field[row][col].type == g_cpu){
			if(r != -1)
				return false;
			r = row;
			c = col;
		}
	} while(true);

	if(r != -1){
		checker_erase(r, c);
		checker_new_place(from_row, from_col, to_row, to_col);	
		g_steps.add(r, c);

		//проверить есть ли ещё под сруб
		if(is_user_king_crash(to_row, to_col)){
			g_sel.next = true;
			checker_select(to_row, to_col);
		} else
			g_sel.select = g_sel.next = false;

	} else {
		//здесь проверить если шашки под сруб
		if(is_cpu_crash()){
			setStatus("Вы должны срубить шашку", "#FF5522");
			return false;
		}
		checker_new_place(from_row, from_col, to_row, to_col);
		g_sel.select = g_sel.next = false;
	}
	return true;
}



function user_attack(x, y){
	let col = Math.max(0, Math.min(Math.floor(x / g_size), FIELD_NUM - 1));
	let row = Math.max(0, Math.min(Math.floor(y / g_size), FIELD_NUM - 1));
	let ret = false;

	if(g_field[row][col].id == check_type.NONE)
		return false;
	else if(g_field[row][col].id == check_type.EMPTY){

		if(g_sel.select){ //ход или срубить

			switch(g_field[g_sel.row][g_sel.col].id){
			case check_type.PAWN:
				ret = user_move_pawn(g_sel.row, g_sel.col, row, col);
				break;
			case check_type.KING: //дамка
				ret = user_move_king(g_sel.row, g_sel.col, row, col);
				break;
			}
		}

	} else if(g_field[row][col].type == g_user){

		if(g_sel.next){
			setStatus("Ещё есть шашка под сруб", "#FF5522");
			return false;
		}

		if(g_sel.select)
			checker_draw(g_sel.row, g_sel.col);
		checker_draw(row, col);
		checker_select(row, col);
		g_steps.reset();
		ret = true;
	}
	return ret;
}
