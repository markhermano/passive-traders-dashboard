import { onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export const resizeHandler = () => {
  const { body } = document
  const store = useStore()
  const breakPoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  }

  onBeforeMount(() => {
    window.addEventListener('resize', resizer)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizer)
  })

  onMounted(() => {
    resizer()
  })

  const resizer = () => {
    store.dispatch('layout/setDevice', screenSize())
  }

  let screenSize = () => {
    let screen = { size: 'xs', order: 0 }
    let rect = body.getBoundingClientRect()
    Object.entries(breakPoints).forEach((entry, index) => {
      let [key, value] = entry
      screen.size = rect.width >= value ? key : screen.size
      screen.order =  rect.width >= value ? (index + 1) : screen.order
    })
    return screen
  }

  return {
    body,
    breakPoints,
    resizer,
    screenSize
  }
}
