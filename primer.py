import pygame
import sys
import os

def resource_path(relative_path):
    try:
    # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

w = 200
h = 200
FPS = 60
x =  0
y = 0
wd = 50
hd = 50
b = (0, 0, 0)
pygame.init()

screen = pygame.display.set_mode((w, h))
pygame.display.set_caption("Это пробный тест")
clock = pygame.time.Clock()

running = True
while running == True:
    clock.tick(FPS)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False


    screen.fill(b)
    pygame.draw.rect(screen, (100, 0, 100), (x, y, wd, hd))
    pygame.display.update()

pygame.quit()