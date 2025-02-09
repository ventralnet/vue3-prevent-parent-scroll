const map = new Map<HTMLElement, EventListenerOrEventListenerObject>()

const directive = {
  beforeMount(el: HTMLElement) {
    const handler = (event: WheelEvent) => {
      if (el.scrollTop === 0  && event.deltaY < 0 ||
          Math.abs(el.scrollTop - (el.scrollHeight - el.clientHeight)) <= 1 &&
          event.deltaY > 0)
      {
        event.preventDefault()
      }
    }
    map.set(el, handler)
    el.addEventListener('wheel', handler)
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('wheel', map.get(el))
    map.delete(el)
  }
};

const plugin = {
  install(app, options) {
    app.directive('preventParentScroll', directive);
  },
};

export default plugin;
