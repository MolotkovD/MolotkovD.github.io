extends KinematicBody2D


var Speed = 200


func _physics_process(delta):
	move()
	
func move():
	var Vector_move = Vector2()
	if Input.is_action_pressed("ui_down"): 
		Vector_move.y += 1
	if Input.is_action_pressed("ui_up"): 
		Vector_move.y -= 1
	if Input.is_action_pressed("ui_left"): 
		Vector_move.x -= 1
	if Input.is_action_pressed("ui_right"): 
		Vector_move.x += 1
	
	move_and_slide(Vector_move.normalized() * Speed)
