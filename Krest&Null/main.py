import pygame


W, H = 3, 3
W_W, H_W = ((W * 201)+205), H * 201
pygame.init()
win = pygame.display.set_mode((W_W, H_W))
block_size = 200
running_app = True
FPS = 60
cross = pygame.image.load("./img/cross.png")
circle = pygame.image.load("./img/circle.png")
future_img = cross
queue_player = True


def draw():
    for y in range(H):
        for x in range(W):

            rect = pygame.Rect(x*(block_size+2), y*(block_size+2), block_size, block_size)
            pygame.draw.rect(win, (255, 255, 255), rect)
            pygame.display.update()

def queue(x, y):
    if queue_player == True:
        win.blit(cross, (x, y))
        pygame.display.update()
    if queue_player == False:
        win.blit(circle, (x, y))
        pygame.display.update()

draw()

clock = pygame.time.Clock()

while running_app == True:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running_app = False
        if event.type == pygame.MOUSEBUTTONUP:
            pos_x, pos_y = pygame.mouse.get_pos()
            if (pos_x >= 0 and pos_y >= 0) and (pos_x < 200 and pos_y < 200):
                draw()
                queue(0, 0)

            if (pos_x >= 202 and pos_y >= 0) and (pos_x < 400 and pos_y < 200):
                draw()
                queue(202, 0)
            if (pos_x >= 404 and pos_y >= 0) and (pos_x < 600 and pos_y < 200):
                draw()
                queue(404 , 0)
            if (pos_x >= 0 and pos_y >= 200) and (pos_x < 200 and pos_y < 400):
                draw()
                queue(0, 200)
            if (pos_x >= 202 and pos_y >= 200) and (pos_x < 400 and pos_y < 400):
                draw()
                queue(202, 200)
            if (pos_x >= 404 and pos_y >= 200) and (pos_x < 600 and pos_y < 400):
                draw()
                queue(404, 200)
            if (pos_x >= 0 and pos_y >= 400) and (pos_x < 200 and pos_y < 600):
                draw()
                queue(0, 400)
            if (pos_x >= 202 and pos_y >= 400) and (pos_x < 400 and pos_y < 600):
                draw()
                queue(202, 400)
            if (pos_x >= 404 and pos_y >= 400) and (pos_x < 600 and pos_y < 600):
                draw()
                queue(404, 400)



pygame.quit()