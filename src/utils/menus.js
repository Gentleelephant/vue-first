import {getRequest} from "@/utils/api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/sys/config/menu").then(data => {
        // 需要把返回来的数据转成对象
        if (data) {
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);
        }
    })
};


export const formatRoutes = (routes) => {
    let fmtRoutes = [];
    routes.forEach(router => {
        // 批量变量定义
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            // 递归调用
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            component(resolve) {
                // 相当于在导入项目
                if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                } else if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                }

            }

        };
        fmtRoutes.push(fmRouter);
    });
    return fmtRoutes;
};