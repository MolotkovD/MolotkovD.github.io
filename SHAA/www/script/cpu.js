/* 
    автор(с): Кудуштеев Алексей
    простые Русские шашки, без всяких минимакс и т.п. алгоритмов, просто "тупо" в лоб наивное решение...
    игра создана при помощи JavaScript ES6 HTML5, браузер FireFox Quantum
*/
const g_objs = [[g_user,g_user], [g_user,g_cpu], [g_cpu,g_user]];


//компьютерный ход шашкой/дамкой
function cpu_attack(){
	g_path.reset();
	g_curve.reset();
	g_steps.reset();

	if(cpu_find_crash())
		return true;
	else if(is_attack_crash())
		return true;

	let ret = cpu_attack_sub();
	g_path.reset();
	g_curve.reset();
	g_steps.reset();
	return ret;
}


//продолжение хода
function cpu_attack_sub(){
	const n = FIELD_NUM - 1;
	let   r, c, r1, c1, r2, c2;

	//проход в дамки
	for(let j = 1; j < FIELD_NUM; j += 2){
		r = n - 1;
		c = j;
		if((g_field[r][c].type == g_cpu) && (g_field[r][c].id == check_type.PAWN)){
			for(let p = 0; p < 2; ++p){
				r1 = r + g_dirs[p][1];
				c1 = c + g_dirs[p][0];
				if(g_invalid(r1, c1))
					continue;
				else if((g_field[r1][c1].id == check_type.EMPTY) && (r1 == n)){
					g_field[r][c].id = check_type.KING;
					checker_new_place(r, c, r1, c1);
					return true;
				}
			}
		}
	}

	//займём угол левый или правый, только для шашек
	for(let i = FIELD_NUM - 2; i > 0; --i){
		if((g_field[i][1].id == check_type.PAWN) && (g_field[i][1].type == g_cpu)){
			if(is_look_empty(i + 1, 0)){
				if((i + 1) == n)
					g_field[i][1].id = check_type.KING;
				checker_new_place(i, 1, i + 1, 0);
				return true;
			}
		} else if((g_field[i][n - 1].id == check_type.PAWN) && (g_field[i][n - 1].type == g_cpu)){
			if(is_look_empty(i + 1, n)){
				if((i + 1) == n)
					g_field[i][n - 1].id = check_type.KING;
				checker_new_place(i, n - 1, i + 1, n);
				return true;
			}
		}
	}

	//между шашками/дамками
	for(let i = FIELD_NUM - 3; i >= 0; --i){
		for(let j = 0; j < FIELD_NUM; ++j){
			if((g_field[i][j].id == check_type.PAWN) && (g_field[i][j].type == g_cpu)){
				for(let p = 0; p < 2; ++p){
					r = i + g_dirs[p][1];
					c = j + g_dirs[p][0];
					if(g_invalid(r, c))
						continue;
					else if((g_field[r][c].id == check_type.EMPTY) && is_look_empty(r + g_dirs[p][1], c + g_dirs[p][0])){
						get_coord(g_dirs[p][1], g_dirs[p][0]);

						r1 = r + g_vec[0][0];
						c1 = c + g_vec[0][1];
						r2 = r + g_vec[1][0];
						c2 = c + g_vec[1][1];
						for(let p = 0; p < g_objs.length; ++p){
							if(is_object(r1, c1, g_objs[p][0]) && is_object(r2, c2, g_objs[p][1])){
								checker_new_place(i, j, r, c);
								return true;
							}
						}
					}
				}
			}
		}
	}

	g_path.reset();
	g_steps.reset();

	if(pawn_move(false))
		return true;
	else if(king_move(false))
		return true;

	let ret = pawn_move(true);
	if(!ret)
		ret = king_move(true);
	return ret;
}


//ход шашки
function pawn_move(all){
	let c, r, k, v;
	for(let i = FIELD_NUM - 2; i >= 0; --i){
		for(let j = 0; j < FIELD_NUM; ++j){
			if(g_field[i][j].id == check_type.NONE)
				continue;
			else if((g_field[i][j].id == check_type.PAWN) && (g_field[i][j].type == g_cpu)){

				//просмотр вниз
				v = ((Math.random() * 4) < 2) ? 1 : 0;
				for(let p = 0; p < 2; ++p){
					k = p ^ v;
					r = i + g_dirs[k][1];
					c = j + g_dirs[k][0];

					if(g_invalid(r, c))
						continue;
					else if(g_field[r][c].id == check_type.EMPTY){
	
						if(r == (FIELD_NUM - 1)){ //дамка
							g_field[i][j].id = check_type.KING;
							checker_new_place(i, j, r, c);
							return true;
						} else if(is_cpu_not_attack(r, c)){
							checker_new_place(i, j, r, c);
							return true;
						} else if(all){
							checker_new_place(i, j, r, c);
							return true;
						}
					}
				}
			}
		}
	}
	return false;
}


//ход дамки
function king_move(all){
	let r, c;
	for(let i = 0; i < FIELD_NUM; ++i){
		for(let j = 0; j < FIELD_NUM; ++j){
			if(g_field[i][j].id == check_type.NONE)
				continue;
			else if((g_field[i][j].id == check_type.KING) && (g_field[i][j].type == g_cpu)){

				for(let p = 0; p < g_dirs.length; ++p){
					r = i + g_dirs[p][0];
					c = j + g_dirs[p][1];
					if(g_invalid(r, c))
						continue;
					else if(all){

						if(g_field[r][c].id == check_type.EMPTY){
							checker_new_place(i, j, r, c);
							return true;
						} else
							continue;

					} else if(!is_next_kill(r, c, g_dirs[p][0], g_dirs[p][1]))
						continue;

					get_coord(g_dirs[p][0], g_dirs[p][1]);
					do {
						if(g_field[r][c].id == check_type.EMPTY){
							if(is_next_kill(r, c, g_vec[0][0], g_vec[0][1]) && is_next_kill(r, c, g_vec[1][0], g_vec[1][1])){
								checker_new_place(i, j, r, c);
								return true;
							}
						} else
							break;

						r += g_dirs[p][0];
						c += g_dirs[p][1];
					} while(!g_invalid(r, c));	
				}
			}
		}
	}
	return false;
}


//проверка на сруб
function is_next_kill(row, col, dir_row, dir_col){
	let r = row + dir_row, c = col + dir_col;

	if(!g_invalid(r, c) && (g_field[r][c].type == g_user))
		return false;

	for(;; r += dir_row, c += dir_col){
		if(g_invalid(r, c))
			break;
		else if(g_field[r][c].id == check_type.EMPTY)
			continue;
		else if((g_field[r][c].id == check_type.KING) && (g_field[r][c].type == g_user))
			return false;
		else
			break;
	}
	return true;
}


//уйти из под удара или прикрыть от сруба - это ход
function is_attack_crash(){
	let id, r, c, m, n = FIELD_NUM - 1;
	for(let i = 1; i < n; ++i){
		for(let j = 1; j < n; ++j){
			id = g_field[i][j].id;
			if((id == check_type.NONE) || (id == check_type.EMPTY))
				continue;
			else if((g_field[i][j].type == g_cpu) && !is_cpu_not_attack(i, j)){

				m = (id == check_type.PAWN) ? 2 : 4;
				for(let p = 0; p < m; ++p){
					r = i + g_dirs[p][1];
					c = j + g_dirs[p][0];
					if(is_look_empty(r, c) && is_cpu_not_attack(r, c)){
						if(r == n)
							g_field[i][j].id = check_type.KING;
						checker_new_place(i, j, r, c);
						return true;
					}
				}
			}
		}
	}

	//прикрыть от сруба
	for(let i = 2; i < n; ++i){
		for(let j = 1; j < n; ++j){
			if(g_field[i][j].id == check_type.NONE)
				continue;
			else if(g_field[i][j].type == g_cpu){
				if(is_object(i + 1,j + 1, g_user) && is_look_empty(i - 1,j - 1)){
					r = i - 1;
					c = j - 1;
					if(is_object(r - 1, c - 1, g_cpu)){
						checker_new_place(r - 1, c - 1, r, c);
						return true;
					} else if(is_object(r - 1, c + 1, g_cpu)){
						checker_new_place(r - 1, c + 1, r, c);
						return true;
					}					
				} else if(is_object(i + 1, j - 1, g_user) && is_look_empty(i - 1, j + 1)){
					r = i - 1;
					c = j + 1;
					if(is_object(r - 1, c + 1, g_cpu)){
						checker_new_place(r - 1, c + 1, r, c);
						return true;
					} else if(is_object(r - 1, c - 1, g_cpu)){
						checker_new_place(r - 1, c - 1, r, c);
						return true;
					}	
				}
			}
		}
	}
	return false;
}


const is_object = (r, c, obj) => {
	if(g_invalid(r, c))
		return false;
	return (g_field[r][c].type == obj);
}


//просмотр в разные направления от сруба шашек/дамок
function is_cpu_not_attack(row, col){
	let r, c, r1, c1;
	for(let i = 0; i < g_dirs.length; ++i){
		r = row + g_dirs[i][0];
		c = col + g_dirs[i][1];
		if(g_invalid(r, c))
			continue;
		else if(g_field[r][c].type == g_user)
			return false;
		else if(g_field[r][c].id == check_type.EMPTY){
			r1 = r;
			c1 = c;
			do {
				r1 += g_dirs[i][0];
				c1 += g_dirs[i][1];
				if(g_invalid(r1, c1))
					break;
				else if(g_field[r][c].type == g_cpu)
					break;
				else if(g_field[r][c].type == g_user){
					if(g_field[r][c].id == check_type.KING)
						return false;
				}
			} while(true);
		}
	}
	return true;
}


//поиск пути для шашки, под сруб пользовательских шашек/дамок
function cpu_crash_pawn_sub(row, col, arr){
	let c, r, c1, r1;
	for(let i = 0; i < g_dirs.length; ++i){
		r = row + g_dirs[i][0];
		c = col + g_dirs[i][1];

		if(g_invalid(r, c) || arr.is_find(r, c))
			continue;
		else if(g_field[r][c].type == g_user){

			r1 = r + g_dirs[i][0];
			c1 = c + g_dirs[i][1];
			if(is_look_empty(r1, c1)){
				arr.add_unique(r, c);
				arr.add_unique(r1, c1);
				cpu_crash_pawn_sub(r1, c1, arr);
				break;
			}
		}
	}
}


//сруб
function cpu_crash_pawn(row, col, arr){
	cpu_crash_pawn_sub(row, col, arr);

	if(!arr.isEmpty()){
		let find = false;
		for(let i = 0; i < arr.getCount(); ++i){
			if(arr.getRow(i) == (FIELD_NUM - 1)){//значит были в дамках
				find = true;
				break;
			}
		}

		if(find){
			g_field[row][col].id = check_type.KING;
			cpu_crash_king(arr.backRow(), arr.backCol(), arr);
		}
	}
}


//просмотр для сруба
function is_king_look_crash(row, col, r, c, arr){
	while(true){
		if(g_invalid(row, col))
			return false;
		else if(g_field[row][col].id == check_type.EMPTY){
			if(arr != null)
				arr.add_unique(row, col);
		} else if(g_field[row][col].type == g_cpu)
			return false;
		else if(g_field[row][col].type == g_user){

			if(is_look_empty(row + r, col + c)){
				if(arr != null){
					arr.add_unique(row, col);
					arr.add_unique(row + r, col + c);
				}
				return true;
			}
			break;
		}
		row += r;
		col += c;
	}
	return false;
}


//поиск пути для дамки, под сруб пользовательские шашки/дамки(после сруба)
function cpu_crash_king_sub(row, col, arr, dir_row, dir_col){
	//сначало проверим смежные стороны как ходы обычной шашки, а не дамки
	let r, c, r1, c1;
	for(let i = 0; i < g_dirs.length; ++i){
		r = row + g_dirs[i][0];
		c = col + g_dirs[i][1];
		if(g_invalid(r, c) || arr.is_find(r, c))
			continue;
		else if(g_field[r][c].type == g_cpu)
			continue;
		else if(g_field[r][c].type == g_user){
			r1 = r + g_dirs[i][0];
			c1 = c + g_dirs[i][1];
			if(is_look_empty(r1, c1)){
				arr.add_unique(r, c);
				arr.add_unique(r1, c1);
				cpu_crash_king_sub(r1, c1, arr, g_dirs[i][0], g_dirs[i][1]);
				return;
			}
		}
	}

	//теперь проверим ходы дамки
	get_coord(dir_row, dir_col);
	g_steps.reset();
	r = row;
	c = col;
	while(true){
		if(g_field[r][c].id == check_type.EMPTY){//на пустой клетке - здесь проверить фланги
			g_steps.add_unique(r, c);
			for(let i = 0; i < g_vec.length; ++i){
				g_curve.reset();
				r1 = r;
				c1 = c;
				do {
					r1 += g_vec[i][0];
					c1 += g_vec[i][1];
					if(g_invalid(r1, c1) || arr.is_find(r1, c1))
						break;
					else if(g_field[r1][c1].id == check_type.EMPTY)
						g_curve.add_unique(r1, c1);
					else if(g_field[r1][c1].type == g_cpu)
						break;
					else if(g_field[r1][c1].type == g_user){
						let r2 = r1 + g_vec[i][0];
						let c2 = c1 + g_vec[i][1];
						if(is_look_empty(r2, c2)){
							g_curve.add_unique(r1, c1);
							g_curve.add_unique(r2, c2);
							arr.append(g_steps);
							arr.append(g_curve);
							cpu_crash_king_sub(r2, c2, arr, g_vec[i][0], g_vec[i][1]);
							return;
						}
						break;
					}
				} while(true);
			}

		} else if(g_field[r][c].type == g_cpu)
			break;
		else if(g_field[r][c].type == g_user){
			r1 = r + dir_row;
			c1 = c + dir_col;
			if(is_look_empty(r1, c1)){
				g_steps.add_unique(r, c);
				g_steps.add_unique(r1, c1);
				arr.append(g_steps);
				cpu_crash_king_sub(r1, c1, arr, dir_row, dir_col);
				return;
			}
			break;
		}

		r += dir_row;
		c += dir_col;
		if(g_invalid(r, c) || arr.is_find(r, c))
			break;
	}
}


function is_not_attack(row, col){
	if(g_invalid(row, col))
		return true;
	return (g_field[row][col].id == check_type.EMPTY) || (g_field[row][col].type == g_cpu);
}


//поиск пути для дамки, под сруб пользовательских шашек/дамок
function cpu_crash_king(row, col, arr){
	let c, r, c1, r1;
	for(let i = 0; i < g_dirs.length; ++i){
		r = row + g_dirs[i][0];
		c = col + g_dirs[i][1];
		if(g_invalid(r, c) || arr.is_find(r, c))
			continue;
		else if(g_field[r][c].type == g_cpu)
			continue;
		else if(is_king_look_crash(r, c, g_dirs[i][0], g_dirs[i][1], null)){
			is_king_look_crash(r, c, g_dirs[i][0], g_dirs[i][1], arr);
			cpu_crash_king_sub(arr.backRow(), arr.backCol(), arr, g_dirs[i][0], g_dirs[i][1]);
			break;
		}
	}

	//заключительная проверка последней дамки на сруб
	if(!arr.isEmpty()){
		for(let i = 0; i < g_dirs.length; ++i){
			r = arr.backRow() + g_dirs[i][0];
			c = arr.backCol() + g_dirs[i][1];
			if(g_invalid(r, c) || arr.is_find(r, c))
				continue;
			else if(g_field[r][c].type == g_cpu)
				continue;
			else if(is_king_look_crash(r, c, g_dirs[i][0], g_dirs[i][1], null)){
				is_king_look_crash(r, c, g_dirs[i][0], g_dirs[i][1], arr);
				break;
			}
		}

		//здесь продолжить ход, чтобы уйти от сруба или в угол
		if(arr.getCount() >= 2){
			r = arr.backRow() - arr.getRow(arr.getCount() - 2);
			c = arr.backCol() - arr.getCol(arr.getCount() - 2);

			g_steps.reset();
			r1 = arr.backRow();
			c1 = arr.backCol();
			get_coord(r, c);
			do {
				r1 += r;
				c1 += c;
				if(g_invalid(r1, c1) || arr.is_find(r1, c1))
					break;
				else if(g_field[r1][c1].id == check_type.EMPTY){
					g_steps.add_unique(r1, c1);
					if(g_invalid(r1 + r, c1 + c)){
						arr.append(g_steps);
						break;
					}

					if(is_not_attack(r1 + g_vec[0][0], c1 + g_vec[0][1]) && 
					   is_not_attack(r1 + g_vec[1][0], c1 + g_vec[1][1]) &&
					   is_not_attack(r1 + r, c1 + c)){
						arr.append(g_steps);
						break;
					}
				} else
					break;
			} while(true);
			g_steps.reset();
		}
	}
}


//поиск шашки или дамки для сруба пользовательской шашки/дамки
function cpu_find_crash(){
	g_path.reset();
	g_steps.reset();
	g_curve.reset();
	g_sel.select = g_sel.next = false;

	let id, num, cnt = 0, row = -1, col = -1;
	for(let i = 0; i < g_field.length; ++i){
		for(let j = 0; j < g_field[i].length; ++j){

			id = g_field[i][j].id;
			if((id == check_type.NONE) || (id == check_type.EMPTY))
				continue;
			else if(g_field[i][j].type == g_cpu){
				g_carr.reset();
				if(id == check_type.PAWN)//шашка
					cpu_crash_pawn(i, j, g_carr);
				else if(id == check_type.KING) //дамка
					cpu_crash_king(i, j, g_carr);

				num = cpu_count_kill(g_carr);
				if(num > cnt){
					g_path.copy(g_carr);
					cnt = num;
					row = i;
					col = j;
				}
			}
		}
	}
	g_steps.reset();
	g_curve.reset();

	//отметить путь
	if(! g_path.isEmpty()){
		g_hdc.fillStyle = g_lcolor;
		for(let i = 0; i < g_path.getCount(); ++i)
			g_hdc.fillRect(g_path.getCol(i) * g_size, g_path.getRow(i) * g_size, g_size, g_size);

		checker_swap(row, col, g_path.backRow(), g_path.backCol());
		checker_erase(row, col);
		checker_draw(g_path.backRow(), g_path.backCol());
		g_path.pop();

		//запуск таймера на перерисовку
		g_timer = setTimeout(() => {
			for(let i = 0; i < g_path.getCount(); ++i)
				checker_erase(g_path.getRow(i), g_path.getCol(i));
			go_user_next();
		}, TIMER_SHOW);
		return true;
	}
	return false;
}
