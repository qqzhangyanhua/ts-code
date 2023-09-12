const SleepDecoratorFactory = 
    (times: number):MethodDecorator => 
    (...args: any[]) => {
        const [ , ,descriptor] = args
        const method = descriptor.value
        descriptor.value = () => {
            setTimeout(() => {
                method()
            }, times)
        }
    }
 
class User {
    @SleepDecoratorFactory(500)
    public show() {
        console.log("It's my show time")
    }
}
new User().show()