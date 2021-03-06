import { ADBChannel, ADBInterfaceException } from '../adb-manager'
import { ConsoleInterfaceMock } from '../console-interface/console-interface-mock'
import adbCommands from '../adb-manager/adb-commands'

// Mocked ConsoleInterface
let cimock = new ConsoleInterfaceMock()
let adbInterfaceInstance = new ADBChannel(cimock)

it('will connect to device seamless', async () => {
  const connectDeviceIp = '192.168.1.100'
  const connectExistingDeviceMock = (input: string) => {
    if (input == `adb -s ${connectDeviceIp} shell getprop ro.product.model`) {
      return Buffer.from('PEAR_PHONE')
    } else if (input === adbCommands.CONNECT_IP_AND_PORT(connectDeviceIp)) {
      return Buffer.from(`connected to ${connectDeviceIp}`)
    } else {
      return Buffer.from(`fail`)
    }
  }
  cimock.setCallbackMock(connectExistingDeviceMock)
  const result = await adbInterfaceInstance.ConnectToDevice(connectDeviceIp)

  expect(result.message).toStrictEqual(`Connected to: PEAR_PHONE`)
})

test('allready connected to another device', async () => {
  try {
    const allreadyConnectedIP = '192.168.1.102'
    const allreadyConnectedPhoneName = 'DEVICE_NAME'
    const allreadyConnectedCallback = (input: string) => {
      if (input == `adb -s 192.168.1.102 shell getprop ro.product.model`) {
        return Buffer.from(allreadyConnectedPhoneName)
      } else if (input === `adb connect 192.168.1.102:5555`) {
        return Buffer.from(`already connected to 192.168.1.102`)
      } else {
        return Buffer.from(`fail`)
      }
    }

    cimock.setCallbackMock(allreadyConnectedCallback)
    await adbInterfaceInstance.ConnectToDevice(allreadyConnectedIP)
  } catch (e) {
    expect(e).toBeInstanceOf(ADBInterfaceException)
  }
})
