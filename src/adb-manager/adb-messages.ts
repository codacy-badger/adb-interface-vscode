/* istanbul ignore file */
export default {
  DEVICES_IN_TCP_MODE: (port = 5555) => `Devices in TCP mode port: ${port}`,
  NO_DEVICES_FOUND: () => 'No devices found or conected',
  ADB_DEVICE_NOT_FOUND: () => 'ADB Device not found in this machine',
  ADB_INTERFACE_EXCEPTION_DEFAULT: () => 'Some exception ocurred',
  ADB_INTERFACE_ERROR_DEFAULT: () => 'Some error ocurred.'
}
