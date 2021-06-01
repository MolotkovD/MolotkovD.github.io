import pygame
import sys

pygame.init()

size = (510, 510)
W = H = 165
margin = 5
win = pygame.display.set_mode(size)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit(0)

    for call in range(3):
        for row in range(3):
            x = call * W + (call + 1) * margin
            y = row * H + (row + 1) * margin
            pygame.draw.rect(win, (255, 0, 0), (x, y, W, H))
    pygame.display.flip()