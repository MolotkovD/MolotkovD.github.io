import pygame
import json
from SETTING import *
import DEFS_Game
with open("libs.json", "r") as dih:
    data = json.load(dih)

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


DEFS_Game.restart()
DEFS_Game.draw()


clock = pygame.time.Clock()

while APP_RANNING == True:
    wining()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            APP_RANNING = False
        if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
            DEFS_Game.restart()
            data = {"rules": {"1": True, "2": True, "3": True, "4": True, "5": True, "6": True, "7": True, "8": True, "9": True}, "score": {"1": None, "2": None, "3": None, "4": None, "5": None, "6": None, "7": None, "8": None, "9": None}}
        if event.type == pygame.MOUSEBUTTONUP:
            pos_x, pos_y = pygame.mouse.get_pos()
            if (pos_x >= 0 and pos_y >= 0) and (pos_x < 200 and pos_y < 200): # 1
                data["score"]["1"] = queue_player

                with open("libs.json", "w") as dih:
                    json.dump(data, dih, indent=4)
                if data["rules"]["1"] == True:
                    DEFS_Game.draw()
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
                    DEFS_Game.draw()
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
                    DEFS_Game.draw()
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
                    DEFS_Game.draw()
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
                    DEFS_Game.draw()
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
                    DEFS_Game.draw()
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
                    DEFS_Game.draw()
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
                    DEFS_Game.draw()
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
                    DEFS_Game.draw()
                    data["rules"]["9"] = False
                if queue_player == "circle":
                    queue_player = "cross"
                else:
                    queue_player = "circle"


with open("libs.json", "w") as file:
    json.dump(end_load, file, indent=4)
pygame.quit()