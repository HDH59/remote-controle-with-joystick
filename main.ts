let Ypos = 0
let Xpos = 0
let Button2 = 0
let Yas = 0
let Xas = 0
radio.setGroup(1)
radio.setTransmitPower(7)
OLED12864_I2C.init(60)
let Xoffset = 0
let Yoffset = 0
for (let index = 0; index < 10; index++) {
    Xoffset = Xoffset + pins.analogReadPin(AnalogPin.P0)
    Yoffset = Yoffset + pins.analogReadPin(AnalogPin.P1)
}
Xoffset = Xoffset - Xoffset % 10
Xoffset = Xoffset / 10
Yoffset = Yoffset - Yoffset % 10
Yoffset = Yoffset / 10
OLED12864_I2C.showNumber(
8,
0,
Xoffset,
1
)
OLED12864_I2C.showNumber(
8,
1,
Yoffset,
1
)
while (input.buttonIsPressed(Button.A) == false) {
	
}
basic.forever(function () {
    Xas = pins.analogReadPin(AnalogPin.P0)
    Yas = pins.analogReadPin(AnalogPin.P1)
    Button2 = pins.digitalReadPin(DigitalPin.P2)
    Yas = Yas - Yoffset
    Xas = Xas - Xoffset
    Xpos = (Xas + Xoffset) / 200
    Xpos = 5 - Xpos
    if (Xpos < 0) {
        Xpos = 0
    } else if (Xpos > 4) {
        Xpos = 4
    }
    led.unplot(0, 0)
    led.unplot(0, 1)
    led.unplot(0, 2)
    led.unplot(0, 3)
    led.unplot(0, 4)
    led.plot(0, Xpos)
    Ypos = (Yas + Yoffset) / 200
    Ypos = 0 + Ypos
    if (Ypos < 0) {
        Ypos = 0
    } else if (Ypos > 4) {
        Ypos = 4
    }
    led.unplot(1, 0)
    led.unplot(2, 0)
    led.unplot(3, 0)
    led.unplot(4, 0)
    led.plot(Ypos, 0)
    OLED12864_I2C.showString(
    8,
    0,
    "    ",
    1
    )
    OLED12864_I2C.showString(
    8,
    1,
    "    ",
    1
    )
    OLED12864_I2C.showNumber(
    8,
    0,
    Xas,
    1
    )
    OLED12864_I2C.showNumber(
    8,
    1,
    Yas,
    1
    )
    radio.sendValue("X", Xas)
    radio.sendValue("Y", Yas)
    radio.sendValue("B", Button2)
})
