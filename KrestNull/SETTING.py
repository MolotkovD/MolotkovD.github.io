import pygame

end_load = {"rules": {"1": True,
                      "2": True,
                      "3": True,
                      "4": True,
                      "5": True,
                      "6": True,
                      "7": True,
                      "8": True,
                      "9": True},
            "score": {"1": None,
                      "2": None,
                      "3": None,
                      "4": None,
                      "5": None,
                      "6": None,
                      "7": None,
                      "8": None,
                      "9": None}}

W, H = 3, 3
W_W, H_W = ((W * 201)+205), H * 201
pygame.init()
ImgGame = pygame.image.load("./img/tic-tac-toe.png")
win = pygame.display.set_mode((W_W, H_W))
pygame.display.set_caption("Text")
pygame.display.set_icon(ImgGame)
block_size = 200
APP_RANNING = True
FPS = 60
cross = pygame.image.load("./img/Cross_opdate.png")
circle = pygame.image.load("./img/Circle_update.png")
fon = pygame.font.Font("./fonts/fontr.ttf", 30)
queue_player = "cross"