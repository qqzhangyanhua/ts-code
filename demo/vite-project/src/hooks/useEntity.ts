// 实际应用中的权限最好应该是在store中异步获取,这里做demo的话就简单写死了
const userInfos = {
    name: '张三',
    isLogin: true,
    permission: ['add', 'edit'],
};

function checkPermission(target: Function, _context: any) {
    /**
     * 这里只是简单处理用户的登录情况,实际在开发过程中需要根据业务逻辑来判断
     */
    if (!userInfos.isLogin) {
        return alert('用户未登录');
    }
    target.prototype.getAddPermission = (): boolean => {
        return userInfos.permission.includes('add');
    };

    target.prototype.getDeletePermission = (): boolean => {
        return userInfos.permission.includes('delete');
    };

    target.prototype.getEditPermission = (): boolean => {
        return userInfos.permission.includes('edit');
    };
}

@checkPermission
export class UserEntity {
    getAddPermission!: () => boolean;
    getDeletePermission!: () => boolean;
    getEditPermission!: () => boolean;
    constructor() {}
}

console.log('UserEntity==',UserEntity);


