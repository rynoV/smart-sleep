import { settingsStorage } from 'settings'

export function getSetting(key) {
    const setting = settingsStorage.getItem(key)
    if (setting == null) {
        return null
    } else {
        return JSON.parse(setting).name
    }
}