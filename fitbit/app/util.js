import { abs, mean } from 'scientific'

export function roundToNearestSecond(date) {
    date.setSeconds(date.getSeconds() + Math.round(date.getMilliseconds() / 1000), 0)
    return date
}

export function absMean(f32Array) {
    return mean(abs(f32Array))
}