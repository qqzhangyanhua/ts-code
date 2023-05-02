//是一个对象，包含了一个render函数
const MyComponent = {
  render() {
    return {
      tag: "div",
      props: {
        onclick: () => alert("hello"),
      },
      children: "hello",
    };
  },
};
const vnode = {
  tag: MyComponent,
};
export function renderer(vnode, container) {
  if (typeof vnode.tag === "object") {
    //说明是描述节点
    mountComponent(vnode, container);
  } else if (typeof vnode.tag === "string") {
    //说明是元素的文本子节点
    mountElement(vnode, container);
  }
}

function mountElement(vnode, container) {
  const el = document.createElement(vnode.tag);
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      // 如果 key 以 on 开头，说明它是事件
      el.addEventListener(
        key.substr(2).toLowerCase(), // 事件名称 onClick ---> click
        vnode.props[key] // 事件处理函数
      );
    }
  }
  // 处理 children
  if (typeof vnode.children === "string") {
    // 如果 children 是字符串，说明它是元素的文本子节点
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    // 递归地调用 renderer 函数渲染子节点，使用当前元素 el 作为挂载点
    vnode.children.forEach((child) => renderer(child, el));
  }

  container.appendChild(el);
  // 将元素添加到挂载点下
}
function mountComponent(vnode, container) {
  const subtree = vnode.tag.render();
  //递归地调用
  renderer(subtree, container);
}

// renderer(vnode, document.body);
