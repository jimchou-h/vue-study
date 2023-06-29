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
