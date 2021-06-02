from SETTING import *
import pygame
import json

def json_update_start():
    with open("libs.json", "r") as dih:
        data = json.load(dih)
    return data
data = json_update_start()

def restart():
    for y in range(3):
        for x in range(3):
            rect = pygame.Rect(x*(block_size+2), y*(block_size+2), block_size, block_size)
            pygame.draw.rect(win, (255, 255, 255), rect)
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


def undo_json():
    with open("libs.json", "w") as file:
        json.dump(end_load, file, indent=4)