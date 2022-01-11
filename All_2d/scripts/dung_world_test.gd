extends Node2D

var number_room = 5
var map_h: int  = 10
var map_w: int  = 10
var room
const tile_size: int = 32
const room_size: int = 16

var used_cells: Array = []
var preliminary_cells: Array = []
var finished_cells: Array = []

var all_roots_obj = [preload("res://levels/1.tscn"), preload("res://levels/2.tscn")]
var start_room_obj = preload("res://levels/spawn.tscn").instance()
var finich_room_obj = preload("res://levels/door.tscn").instance()



func _ready(): 
	randomize()
	generety_dung()

func generety_dung():
	start_room()
	for level in range(number_room):
		detection_of_nearby_free_cells()
		random_append_used_cells()
	passed_room_on()

func start_room():
	room = Vector2((randi() % (map_w)),(randi() % (map_h)))
	used_cells.append(room)
	print("start_room criet!")

func detection_of_nearby_free_cells():
	for xy in used_cells:
		if xy.x > 0: if not used_cells.has(Vector2(xy.x - 1, xy.y)): preliminary_cells.append(Vector2(xy.x - 1, xy.y))
		if xy.x <= map_w: if not used_cells.has(Vector2(xy.x + 1, xy.y)): preliminary_cells.append(Vector2(xy.x + 1, xy.y))
		if xy.y > 0 : if not used_cells.has(Vector2(xy.x, xy.y - 1)): preliminary_cells.append(Vector2(xy.x, xy.y - 1))
		if xy.y <= map_h: if not used_cells.has(Vector2(xy.x, xy.y + 1)): preliminary_cells.append(Vector2(xy.x, xy.y + 1))

func random_append_used_cells():
	var id = randi() % (preliminary_cells.size())
	used_cells.append(preliminary_cells.pop_at(id))

func passed_room_on():
	start_room_obj.global_position = Vector2(used_cells[0].x * (tile_size * room_size), used_cells[0].y * (tile_size * room_size) )
	print(used_cells.pop_at(0), " start_room complit")
	finich_room_obj.global_position = Vector2(used_cells[used_cells.size()-1].x * (tile_size * room_size), used_cells[used_cells.size()-1].y * (tile_size * room_size))
	print(used_cells.pop_at(used_cells.size()-1), " end_room complit")
	add_child(start_room_obj)
	add_child(finich_room_obj)
	
	for roomi in used_cells:
		var room_for_adding = all_roots_obj[randi() % all_roots_obj.size()].instance()
		room_for_adding.global_position = Vector2(roomi.x * (tile_size * room_size), roomi.y * (tile_size * room_size))
		add_child(room_for_adding)
