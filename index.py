import RPi.GPIO as gpio
import time


def init():
    gpio.setmode(gpio.BCM)
    gpio.setup(12, gpio.OUT)
    gpio.setup(6, gpio.OUT)
    gpio.setup(13, gpio.OUT)
    gpio.setup(19, gpio.OUT)

def forward(tf):
    gpio.output(12, True)
    gpio.output(6, False)
    gpio.output(13, True)
    gpio.output(19, False)
    time.sleep(tf)

def reverse(tf):
    gpio.output(12, False)
    gpio.output(6, True)
    gpio.output(13, False)
    gpio.output(19, True)
    time.sleep(tf)


init()
forward(2)
reverse(2)

gpio.cleanup()
		