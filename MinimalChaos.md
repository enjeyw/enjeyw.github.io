# Minimal Chaos

Recently I've been thinking a lot about emergent complexity and chaos. It's fansinating how seemingly very complex behaviour can arrive from a system with much simpler rules.

Courtesy of the book of the same name, one of the most famous

The thing about chaos is that it's very nature makes it somewhat difficult to intuit - you can't easily look at a chaotic system build a mental model of how it'll evolve. 

What exactly causes Chaotic behaviour? Like, why do some systems fall into very well defined periodic behaviour while others go flying away in an  unpredicable manner?

To better understand this, I've been looking into the simplest possible chaotic systems, to give me a better chance of peeking inside them to see what happens. There's also a certain poetry in seeing the chaos emerge from the most innocuous of rule sets.

Before I dive in, it's probably worth building a workable definition of Chaos. While there's no universally accepted definition, Wikipedia suggests the following three properties

1. it must be sensitive to initial conditions
2. it must be topologically transitive
3. it must have dense periodic orbits

The first requirement is the easiest to understand, and arguably the most important. It's capturing the pop-culture idea of the butterfly effect - that a tiny change in a system will set off a chain of events eventually compound into a huge difference further down the track.

This on its own is often given as the sole definition of chaos, but it's actually not enough, which is where the other two requirements come in. They get a little-mathy, and I think it's usefuly enough to simply show a system that is _not_ chaotic, but meets the first requirement:

Imagine I had a ball on an infinitely flat surface, and I give it a nudge, perhaps in a due North direction. After a very long time, the ball will be 1000s of kilometers away in the northerly direction.

Now imagine instead of nudging that ball in a perfectly due North direction, I instead nudged it ever so slightly off due North, say 0.0000001 degrees. After 1000s of kilometers the ball will end in a completely different location. So here we have sensitivity to initial conditions, but the behavior is pretty clearly not chaotic. 


Anyways, here's a really simple script for generating chaotic behavior. Paste it and have fun:
```
import matplotlib.pyplot as plt
import matplotlib as mpl

mpl.use('macosx')

def iterate_mapping_function(mapping_function, initial_value, n):
    value_history = []
    value = initial_value
    value_history.append(value)
    for i in range(n):
        value = mapping_function(value)
        value_history.append(value)

    return value_history

def plot_function(mapping_function, x_min, x_max, n, color='blue'):
    x_values = []
    y_values = []

    x = x_min
    delta = (x_max - x_min) / n
    for i in range(n):
        x_values.append(x)
        y_values.append(mapping_function(x))
        x += delta

    plt.plot(x_values, y_values, color=color, linewidth=1)

def plot_spider_web(value_history, colormap='viridis', linestyle='--'):
    x_values = []
    y_values = []

    colormap = plt.get_cmap(colormap, len(value_history))

    # alpha_linspace = [i / len(value_history) for i in range(len(value_history))]
    alpha_linspace = [1 for i in range(len(value_history))]

    plt.plot([value_history[0], value_history[0]], [0, value_history[1]],
             color=colormap(0), linewidth=1, linestyle=linestyle, alpha=alpha_linspace[0])
    plt.plot([value_history[0], value_history[1]], [value_history[1], value_history[1]],
             color=colormap(0), linewidth=1, linestyle=linestyle, alpha=alpha_linspace[0])


    for i in range(1, len(value_history) - 1):
        x_values.append(value_history[i])
        y_values.append(value_history[i + 1])

        x_values.append(value_history[i + 1])
        y_values.append(value_history[i + 1])

        plt.plot([value_history[i], value_history[i]], [value_history[i], value_history[i+1]],
                 color=colormap(i), linewidth=1, linestyle=linestyle, alpha=alpha_linspace[i])
        plt.plot([value_history[i], value_history[i+1]], [value_history[i+1], value_history[i+1]],
                 color=colormap(i), linewidth=1, linestyle=linestyle, alpha=alpha_linspace[i])

def logistic_map(x, r):
    return r * x * (1 - x)

def double_linear_map(x):
    # a_slope = 1.2
    # b_slope = -1.5
    # b_intercept = 2.5

    # Chaotic
    # a_slope = 5
    # b_slope = -1.25
    # b_intercept = 1.25
    # crossover_point = b_intercept / (a_slope - b_slope)

    # # Chaotic
    # a_slope = 5
    # b_slope = -1.1
    # b_intercept = -b_slope
    # crossover_point = 0.2

    m = 1.9

    # Chaotic
    a_slope = m
    b_slope = -m
    b_intercept = -b_slope
    crossover_point = 0.5


    if x < crossover_point:
        return a_slope * x
    else:
        return b_slope * x + b_intercept

def triple_linear_map(x):
    # Chaos if |1/b_slope| < |c_slope|

    a_slope = 4
    a_slope = 1.4

    b_slope = 0.33333
    b_intercept = 0.733333
    # c_slope = -5
    # c_intercept = 5
    c_slope = -2.5
    c_intercept = 1 - 0.8 * c_slope

    if x < 0.61:
        return a_slope * x
    elif x < 0.8:
        return b_slope * x + b_intercept
    else:
        return c_slope * x + c_intercept


if __name__ == "__main__":
    r = 3.3
    n = 50

    x0a = 0.34
    x0a = 0.18

    delta = 0.0001

    x0b = x0a - delta

    # for n in range(1, 20):
    #     final_values = []
    #     # for i in range(100):
    #     #     x = x0a + i * delta
    #     #     value_history = iterate_mapping_function(lambda x: do(x, r), x, n)
    #     #     final_values.append(value_history[-1])
    #     #
    #     # plt.plot(final_values, color='blue')

    final_values = []
    for i in range(100):
        x = x0a + i * delta
        value_history = iterate_mapping_function(lambda x: double_linear_map(x), x, n)
        final_values.append(value_history[-1])

    plt.plot(final_values, color='red')

    plt.show()

    # Set plot size
    # plt.figure(figsize=(40, 40))

    input = 0.6
    print((logistic_map(input + delta, r) - logistic_map(input, r))/delta)

    value_history_a = iterate_mapping_function(lambda x: double_linear_map(x), x0a, n)
    value_history_b = iterate_mapping_function(lambda x: double_linear_map(x), x0b, n)

    # value_history_a = iterate_mapping_function(lambda x: logistic_map(x, r), x0a, n)
    # value_history_b = iterate_mapping_function(lambda x: logistic_map(x, r), x0b, n)

    # plot_function(lambda x: logistic_map(x, r), 0, 1, 1000, color='blue')
    plot_function(lambda x: double_linear_map(x), 0, 1, 1000, color='red')
    plot_function(lambda x: x, 0, 1, 1000, color='grey')
    # plot_function(lambda x: -x + 2, 0, 2, 1000, color='grey')

    # Plot spider web
    plot_spider_web(value_history_a, colormap='viridis', linestyle='-')
    plot_spider_web(value_history_b, colormap='viridis', linestyle='--')


    #
    # plt.plot(value_history_a, label=f"x0 = {x0a}")
    # plt.plot(value_history_b, label=f"x0 = {x0b}")
    plt.show()

```


<img width="1500" alt="Screenshot 2024-12-08 at 10 24 23 PM" src="https://github.com/user-attachments/assets/4e55579d-1978-4183-8cb0-cb024bff22db">
