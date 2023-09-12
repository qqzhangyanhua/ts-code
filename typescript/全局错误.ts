const ErrorDecorator: MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const method = descriptor.value;
  descriptor.value = () => {
    try {
      method();
    } catch (error: any) {
      console.log(`%cbleak发现错误了`, "color:green;font-size:30px;");
      console.log(`%c${error.message}`, "color:red; font-size:16px");
    }
  };
};

class Users {
  @ErrorDecorator
  find() {
    throw new Error("您查找的用户不存在");
  }

  @ErrorDecorator
  create() {
    throw new Error("创建用户失败");
  }
}

new Users().create();
new Users().find();
