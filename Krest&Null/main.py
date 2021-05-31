import pygame

W, H = 3, 3
W_W, H_W = W * 201, H * 201
pygame.init()
win = pygame.display.set_mode((W_W, H_W))
block_size = 200
running_app = True
FPS = 60

def draw():
    for y in range(H):
        for x in range(W):

            rect = pygame.Rect(x*(block_size+1), y*(block_size+1), block_size, block_size)
            pygame.draw.rect(win, (255, 255, 255), rect)
            pygame.display.update()

draw()

clock = pygame.time.Clock()

while running_app == True:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running_app = False
    win.fill((0, 0, 0))

pygame.quit()