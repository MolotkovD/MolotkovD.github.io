import pygame

W, H = 3, 3
W_W, H_W = ((W * 201)+205), H * 201
pygame.init()
win = pygame.display.set_mode((W_W, H_W))
block_size = 200
running_app = True
FPS = 60

def draw():
    for y in range(H):
        for x in range(W):

            rect = pygame.Rect(x*(block_size+2), y*(block_size+2), block_size, block_size)
            pygame.draw.rect(win, (255, 255, 255), rect)
            pygame.display.update()
            print(x*(block_size+2),  y*(block_size+2))

draw()

clock = pygame.time.Clock()

while running_app == True:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running_app = False
        if event.type == pygame.MOUSEBUTTONUP:
            pos_x, pos_y = pygame.mouse.get_pos()
            if (pos_x >= 0 and pos_y >= 0) and (pos_x < 200 and pos_y < 200):
                print(1)
            if (pos_x >= 202 and pos_y >= 0) and (pos_x < 400 and pos_y < 200):
                print(2)
            if (pos_x >= 404 and pos_y >= 0) and (pos_x < 600 and pos_y < 200):
                print(3)
            if (pos_x >= 0 and pos_y >= 200) and (pos_x < 200 and pos_y < 400):
                print(4)
            if (pos_x >= 202 and pos_y >= 200) and (pos_x < 400 and pos_y < 400):
                print(5)
            if (pos_x >= 404 and pos_y >= 200) and (pos_x < 600 and pos_y < 400):
                print(6)
            if (pos_x >= 0 and pos_y >= 400) and (pos_x < 200 and pos_y < 600):
                print(7)
            if (pos_x >= 202 and pos_y >= 400) and (pos_x < 400 and pos_y < 600):
                print(8)
            if (pos_x >= 404 and pos_y >= 400) and (pos_x < 600 and pos_y < 600):
                print(9)

    win.fill((0, 0, 0))

pygame.quit()