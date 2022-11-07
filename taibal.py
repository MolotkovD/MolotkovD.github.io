i = 1000

l = len(str(i ** 2)) + 2
w = len(str(i)) + 2

header = " " * w + " " + "".join([str(j).rjust(l) for j in range(1, i + 1)])
dashes = " " * w + ":" + "-" * l * i
body = "\n".join(
    [str(j).rjust(w) + ":" + "".join([str(j * k).rjust(l) for k in range(1, i + 1)]) for j in range(1, i + 1)])

# print("\n".join([header, dashes, body]))
with open("file.txt", 'w') as file:
    file.write("\n".join([header, dashes, body]))
