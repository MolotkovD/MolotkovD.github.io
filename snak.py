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
#параметры для игрока
speed = 1
x = 100
y = 100
wd = 30
hd = 30
isJ = False
jampCount = 0
#параметры игры 
w = 500
h = 500
FPS = 60


white = (255, 255, 255)
red = (255, 0, 0)
black = (0, 0, 0)

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

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and x > 5:
        x-=speed
    if keys[pygame.K_RIGHT] and x < 500 - hd - 5:
        x+=speed
    if not(isJ):
        if keys[pygame.K_UP] and y > 5:
            y-=speed
        if keys[pygame.K_DOWN] and y < 500 - wd - 5:
            y+=speed
        if keys[pygame.K_SPACE]:
            isJ = True
    else:
        if jampCount >= -10:
            if jampCount < 0:
                y += (jampCount ** 2) / 3
            else:
                y -= (jampCount ** 2) / 3
            jampCount -= 1
        else:
            isJ = False
            jampCount = 10
        
    screen.fill(black)
    pygame.draw.rect(screen, (0, 0, 255), (x, y, wd, hd))
    pygame.display.update()

pygame.quit()