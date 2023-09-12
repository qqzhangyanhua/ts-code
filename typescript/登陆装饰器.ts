const user = {
  name: "Bleak",
  isLogin: false,
};

const AccessDecorator: MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const method = descriptor.value;
  descriptor.value = () => {
    if (user.isLogin === true) {
      return method();
    } else {
      console.log("未登录------");

      //   location.href = "login.html";
    }
  };
};

class Article {
  show() {
    console.log("显示文章");
  }
  @AccessDecorator
  store() {
    console.log("保存文章");
  }
}

new Article().store(); // 跳转到登录页面
