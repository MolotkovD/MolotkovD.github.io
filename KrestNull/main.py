import pygame
import json

with open("libs.json", "r") as dih:
    data = json.load(dih)



W, H = 3, 3
W_W, H_W = ((W * 201)+205), H * 201
pygame.init()
win = pygame.display.set_mode((W_W, H_W))
block_size = 200
running_app = True
FPS = 60
cross = pygame.image.load("./img/cross.png")
circle = pygame.image.load("./img/circle.png")
fon = pygame.font.Font("./fonts/fontr.ttf", 30)

queue_player = "cross"


def wining():
    win_game = False
    status = None
    if data["score"]["1"] == data["score"]["2"] == data["score"]["3"] and data["rules"]["1"] == data["rules"]["2"] == data["rules"]["3"] == False:
        win_game = True
        status = data["score"]["1"]
    if data["score"]["4"] == data["score"]["5"] == data["score"]["6"] and data["rules"]["4"] == data["rules"]["5"] == data["rules"]["6"] == False:
        win_game = True
        status = data["score"]["4"]
    if data["score"]["7"] == data["score"]["8"] == data["score"]["9"] and data["rules"]["7"] == data["rules"]["8"] == data["rules"]["9"] == False:
        win_game = True
        status = data["score"]["7"]
    if data["score"]["1"] == data["score"]["4"] == data["score"]["7"] and data["rules"]["1"] == data["rules"]["4"] == data["rules"]["7"] == False:
        win_game = True
        status = data["score"]["1"]
    if data["score"]["2"] == data["score"]["5"] == data["score"]["8"] and data["rules"]["2"] == data["rules"]["5"] == data["rules"]["8"] == False:
        win_game = True
        status = data["score"]["2"]
    if data["score"]["3"] == data["score"]["6"] == data["score"]["9"] and data["rules"]["3"] == data["rules"]["6"] == data["rules"]["9"] == False:
        win_game = True
        status = data["score"]["3"]
    if data["score"]["3"] == data["score"]["5"] == data["score"]["7"] and data["rules"]["3"] == data["rules"]["5"] == data["rules"]["7"] == False:
        win_game = True
        status = data["score"]["3"]
    if data["score"]["1"] == data["score"]["5"] == data["score"]["9"] and data["rules"]["1"] == data["rules"]["5"] == data["rules"]["9"] == False:
        win_game = True
        status = data["score"]["1"]
    ret = pygame.Rect(615, 100, 200, 100)
    pygame.draw.rect(win, (0, 0, 0), ret)
    score = fon.render(f"Win = {status}", True, (255, 255, 255))
    win.blit(score, (615, 100))
    pygame.display.update()
def queue(x, y, fig):


    if fig == "cross":
        win.blit(cross, (x, y))
        pygame.display.update()
    elif fig == "circle":
        win.blit(circle, (x, y))
        pygame.display.update()



def draw():


    with open("libs.json", "r") as op:
        data_render = json.load(op)

    if data_render["score"]["1"] == "cross" and data_render["rules"]["1"] == True:
        queue(0, 0, "cross")
    elif data_render["score"]["1"] == "circle" and data_render["rules"]["1"] == True:
        queue(0, 0, "circle")
    else:
        pass
    if data_render["score"]["2"] == "cross" and data_render["rules"]["2"] == True:
        queue(202, 0, "cross")
    elif data_render["score"]["2"] == "circle" and data_render["rules"]["2"] == True:
        queue(202, 0, "circle")
    else:
        pass

    if data_render["score"]["3"] == "cross" and data_render["rules"]["3"] == True:
        queue(404, 0, "cross")
    elif data_render["score"]["3"] == "circle" and data_render["rules"]["3"] == True:
        queue(404, 0, "circle")
    else:
        pass
    if data_render["score"]["4"] == "cross" and data_render["rules"]["4"] == True:
        queue(0, 200, "cross")
    elif data_render["score"]["4"] == "circle" and data_render["rules"]["4"] == True:
        queue(0, 200, "circle")
    else:
        pass
    if data_render["score"]["5"] == "cross" and data_render["rules"]["5"] == True:
        queue(202, 200, "cross")
    elif data_render["score"]["5"] == "circle" and data_render["rules"]["5"] == True:
        queue(202, 200, "circle")
    else:
        pass
    if data_render["score"]["6"] == "cross" and data_render["rules"]["6"] == True:
        queue(404, 200, "cross")
    elif data_render["score"]["6"] == "circle" and data_render["rules"]["6"] == True:
        queue(404, 200, "circle")
    else:
        pass
    if data_render["score"]["7"] == "cross" and data_render["rules"]["7"] == True:
        queue(0, 400, "cross")
    elif data_render["score"]["7"] == "circle" and data_render["rules"]["7"] == True:
        queue(0, 400, "circle")
    else:
        pass
    if data_render["score"]["8"] == "cross" and data_render["rules"]["8"] == True:
        queue(202, 400, "cross")
    elif data_render["score"]["8"] == "circle" and data_render["rules"]["8"] == True:
        queue(202, 400, "circle")
    else:
        pass
    if data_render["score"]["9"] == "cross" and data_render["rules"]["9"] == True:
        queue(404, 400, "cross")
    elif data_render["score"]["9"] == "circle" and data_render["rules"]["9"] == True:
        queue(404, 400, "circle")
    else:
        pass




for y in range(3):
    for x in range(3):
        rect = pygame.Rect(x*(block_size+2), y*(block_size+2), block_size, block_size)
        pygame.draw.rect(win, (255, 255, 255), rect)
        pygame.display.update()

draw()

clock = pygame.time.Clock()

while running_app == True:
    wining()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running_app = False
        if event.type == pygame.MOUSEBUTTONUP:
            pos_x, pos_y = pygame.mouse.get_pos()
            if (pos_x >= 0 and pos_y >= 0) and (pos_x < 200 and pos_y < 200): # 1
                data["score"]["1"] = queue_player

                with open("libs.json", "w") as dih:
                    json.dump(data, dih, indent=4)
                if data["rules"]["1"] == True:
                    draw()
                    data["rules"]["1"] = False

                if queue_player == "circle":
                    queue_player = "cross"
                else:
                    queue_player = "circle"

            if (pos_x >= 202 and pos_y >= 0) and (pos_x < 400 and pos_y < 200): # 2
                data["score"]["2"] = queue_player
                with open("libs.json", "w") as dih:
                    json.dump(data, dih, indent=4)

                if data["rules"]["2"] == True:
                    draw()
                    data["rules"]["2"] = False

                if queue_player == "circle":
                    queue_player = "cross"
                else:
                    queue_player = "circle"
            if (pos_x >= 404 and pos_y >= 0) and (pos_x < 600 and pos_y < 200): # 3
                data["score"]["3"] = queue_player
                with open("libs.json", "w") as dih:
                    json.dump(data, dih, indent=4)
                if data["rules"]["3"] == True:
                    draw()
                    data["rules"]["3"] = False

                if queue_player == "circle":
                    queue_player = "cross"
                else:
                    queue_player = "circle"
            if (pos_x >= 0 and pos_y >= 200) and (pos_x < 200 and pos_y < 400): # 4
                data["score"]["4"] = queue_player
                with open("libs.json", "w") as dih:
                    json.dump(data, dih, indent=4)
                if data["rules"]["4"] == True:
                    draw()
                    data["rules"]["4"] = False
                if queue_player == "circle":
                    queue_player = "cross"
                else:
                    queue_player = "circle"
            if (pos_x >= 202 and pos_y >= 200) and (pos_x < 400 and pos_y < 400): # 5
                data["score"]["5"] = queue_player
                with open("libs.json", "w") as dih:
                    json.dump(data, dih, indent=4)
                if data["rules"]["5"] == True:
                    draw()
                    data["rules"]["5"] = False
                if queue_player == "circle":
                    queue_player = "cross"
                else:
                    queue_player = "circle"
            if (pos_x >= 404 and pos_y >= 200) and (pos_x < 600 and pos_y < 400): # 6
                data["score"]["6"] = queue_player
                with open("libs.json", "w") as dih:
                    json.dump(data, dih, indent=4)
                if data["rules"]["6"] == True:
                    draw()
                    data["rules"]["6"] = False
                if queue_player == "circle":
                    queue_player = "cross"
                else:
                    queue_player = "circle"
            if (pos_x >= 0 and pos_y >= 400) and (pos_x < 200 and pos_y < 600): # 7
                data["score"]["7"] = queue_player
                with open("libs.json", "w") as dih:
                    json.dump(data, dih, indent=4)
                if data["rules"]["7"] == True:
                    draw()
                    data["rules"]["7"] = False
                if queue_player == "circle":
                    queue_player = "cross"
                else:
                    queue_player = "circle"
            if (pos_x >= 202 and pos_y >= 400) and (pos_x < 400 and pos_y < 600): # 8
                data["score"]["8"] = queue_player
                with open("libs.json", "w") as dih:
                    json.dump(data, dih, indent=4)
                if data["rules"]["8"] == True:
                    draw()
                    data["rules"]["8"] = False
                if queue_player == "circle":
                    queue_player = "cross"
                else:
                    queue_player = "circle"
            if (pos_x >= 404 and pos_y >= 400) and (pos_x < 600 and pos_y < 600): # 9
                data["score"]["9"] = queue_player
                with open("libs.json", "w") as dih:
                    json.dump(data, dih, indent=4)
                if data["rules"]["9"] == True:
                    draw()
                    data["rules"]["9"] = False
                if queue_player == "circle":
                    queue_player = "cross"
                else:
                    queue_player = "circle"

end_load = {
    "rules": {
		"1": True,
		"2": True,
		"3": True,
		"4": True,
		"5": True,
		"6": True,
		"7": True,
		"8": True,
		"9": True
	},
    "score": {
        "1": None,
        "2": None,
        "3": None,
        "4": None,
        "5": None,
        "6": None,
        "7": None,
        "8": None,
        "9": None
    }
}

with open("libs.json", "w") as file:
    json.dump(end_load, file, indent=4)
pygame.quit()