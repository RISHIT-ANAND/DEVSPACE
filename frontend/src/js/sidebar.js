(function(){
  'use strict';


// SIDEBAR LAYOUT & TOGGLE
// Connect button(s) to drawer(s)
var sidebarToggle = document.querySelectorAll('[data-toggle="sidebar"]')
sidebarToggle = Array.prototype.slice.call(sidebarToggle)

sidebarToggle.forEach(function (toggle) {
  toggle.addEventListener('click', function (e) {
    var selector = e.currentTarget.getAttribute('data-target') || e.currentTarget.getAttribute('href') || '#default-drawer'
    var drawer = document.querySelector(selector)
    if (drawer) {
      drawer.mdkDrawer.toggle()
    }
  })
})

let drawers = document.querySelectorAll('.mdk-drawer')
drawers = Array.prototype.slice.call(drawers)
drawers.forEach((drawer) => {
  drawer.addEventListener('mdk-drawer-change', (e) => {
    if (!e.target.mdkDrawer) {
      return
    }
    document.querySelector('body').classList[e.target.mdkDrawer.opened ? 'add' : 'remove']('has-drawer-opened')
    let button = document.querySelector('[data-target="#' + e.target.id + '"]')
    if (button) {
      button.classList[e.target.mdkDrawer.opened ? 'add' : 'remove']('active')
    }
  })
})
// END

// PERFECT SCROLLBAR
let scrollItems = document.querySelectorAll('[data-perfect-scrollbar]');

scrollItems.forEach((item) => {
  const $element = item;
  const element = item;
  const ps = new PerfectScrollbar(element, {
    wheelPropagation: void 0 !== $element.getAttribute('data-perfect-scrollbar-wheel-propagation')
        ? $element.getAttribute('data-perfect-scrollbar-wheel-propagation')
        : false,
      suppressScrollY: void 0 !== $element.getAttribute('data-perfect-scrollbar-suppress-scroll-y')
        ? $element.getAttribute('data-perfect-scrollbar-suppress-scroll-y')
        : false,
      swipeEasing: false
    });
    Object.defineProperty(element, 'PerfectScrollbar', {
      configurable: true,
      writable: false,
      value: ps
    });
    }); 
  // END

})()