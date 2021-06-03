import pygame
import win32api
import win32con
import win32gui

pygame.init()
screen = pygame.display.set_mode((1946, 1944)) # For borderless, use pygame.NOFRAME
done = False
fuchsia = (255, 0, 128)  # Transparency color
dark_red = (139, 0, 0)
png_img = pygame.image.load("niko.png")

# Set window transparency color
hwnd = pygame.display.get_wm_info()["window"]
win32gui.SetWindowLong(hwnd, win32con.GWL_EXSTYLE, win32gui.GetWindowLong(hwnd, win32con.GWL_EXSTYLE) | win32con.WS_EX_LAYERED)
win32gui.SetLayeredWindowAttributes(hwnd, win32api.RGB(*fuchsia), 0, win32con.LWA_COLORKEY)
hwnd_2 = win32gui.GetForegroundWindow()

win32gui.SetWindowPos(hwnd, win32con.HWND_TOPMOST, 600, 300, 0, 0, win32con.SWP_NOSIZE)
while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True

    screen.fill(fuchsia)  # Transparent background
    screen.blit(png_img, (0,0))
    pygame.display.update()



# import pygame
# import win32gui
# import win32con

# def main():
#     pygame.init()
#     screen = pygame.display.set_mode((400, 200))

    # hwnd = win32gui.GetForegroundWindow()

    # win32gui.SetWindowPos(hwnd, win32con.HWND_TOPMOST, 600, 300, 0, 0, win32con.SWP_NOSIZE)

    
#     while True:
#         for event in pygame.event.get():
#             if event.type == pygame.QUIT:
#                 return
#         screen.fill('grey')
#         pygame.display.flip()

# if __name__ == '__main__':
#     main()