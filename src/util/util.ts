export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return function debounced(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  options: {
    leading?: boolean
    trailing?: boolean
  } = {}
) => {
  let timeout: NodeJS.Timeout | null
  let previous = 0

  const { leading = true, trailing = true } = options

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (!previous && !leading) {
      previous = now
    }
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        previous = leading ? Date.now() : 0
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }
}

// export function showNotification(
//   title: string,
//   body: string,
//   icon = 'http://img18.house365.com/newcms/2017/03/16/148964317858ca26aacf7b5.jpg'
// ): void {
//   if ('Notification' in window) {
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         const notification = new Notification(title)
//         notification.onshow = () => {
//           console.log('触发')
//         }
//         notification.onclick = () => {
//           // 处理点击通知的操作
//           // 例如打开网站的某个页面或执行其他操作
//         }
//       }
//     })
//   }
// }
