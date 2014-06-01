tape = [0]*5000
pointer = 0
symbols = ['>', '<', '+', '-', '.',',','[',']']
program_index = 0
program = "+++++++++++++++++++++++++++++++++++++++++++++>++++++++++++++++++++++++++++++++++++++++++++++.<."
done = False

while not done:
    i = program[program_index]
    if i not in symbols:
        continue
    if i == '[':
        if tape[pointer] == 0:
            while program[program_index] != ']':
                program_index += 1
            program_index += 1
    if i == ']':
        if tape[pointer] != 0:
            while program[program_index] != '[':
                program_index -= 1
    if i == '>':
        pointer += 1
    if i == '<':
        pointer -= 1
    if i == '+':
         tape[pointer]+= 1
    if i == '-':
        tape[pointer]-= 1
    if i == '.':
        print(chr(tape[pointer]), end='')
    program_index += 1
    if program_index >= len(program):
        done = True
