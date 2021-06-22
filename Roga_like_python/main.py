import tcod as t

screen_width = 40
screen_height = 20

# Peripherals
key = t.Key()
mouse = t.Mouse()


# Player
class Player:
    x = 10
    y = 5

    def move(self, x, y):
        if not obstacle(x, y):
            self.x = x
            self.y = y


MAP = [
    "           ##################### ",
    "############                  ###",
    "#                       T      ##",
    "#    T                          #",
    "#             T                 #",
    "#                               #",
    "#        T           T          #",
    "##             T                #",
    " ##                        ######",
    "  ##########################     "
]


def obstacle(x, y):
    if y > len(MAP) or y < 0:
        return True
    if x > len(MAP[0]) or x < 0:
        return True
    el = MAP[y][x]
    if el == ' ' or el == '\t' or el == '.':
        return False
    else:
        return True


def set_map(x, y, c):
    if y > len(MAP) or y < 0:
        return
    if x > len(MAP[0]) or x < 0:
        return
    MAP[y] = MAP[y][:x] + c + MAP[y][x + 1:]


def map_draw():
    for y in range(len(MAP)):
        for x in range(len(MAP[0])):
            cchar(x, y, MAP[y][x])


# Game - My Game
def game():
    player = Player()

    # Console
    t.console_init_root(screen_width, screen_height, "My Game")

    while not t.console_is_window_closed():
        t.console_set_default_foreground(0, t.white)
        t.sys_check_for_event(t.EVENT_KEY_PRESS, key, mouse)

        # Draw player
        map_draw()
        cchar(player.x, player.y, '@')

        t.console_flush()
        cclear()

        if key.vk == t.KEY_ESCAPE:
            return
        if key.vk == t.KEY_UP:
            player.move(player.x, player.y - 1)
        elif key.vk == t.KEY_DOWN:
            player.move(player.x, player.y + 1)
        if key.vk == t.KEY_LEFT:
            player.move(player.x - 1, player.y)
        elif key.vk == t.KEY_RIGHT:
            player.move(player.x + 1, player.y)
        if key.vk == t.KEY_SPACE:
            set_map(player.x, player.y, '.')
        if key.vk == t.KEY_CONTROL:
            set_map(player.x, player.y, 'o')
        if key.vk == t.KEY_1:
            set_map(player.x, player.y, ' ')
            set_map(player.x - 1, player.y, ' ')
            set_map(player.x + 1, player.y, ' ')
            set_map(player.x, player.y - 1, ' ')
            set_map(player.x, player.y + 1, ' ')


def cchar(x, y, c):
    t.console_put_char(0, x, y, ord(c))


def cprint(x, y, txt):
    t.console_print(0, x, y, txt)


def cclear():
    t.console_clear(0)


if __name__ == '__main__':
    game()